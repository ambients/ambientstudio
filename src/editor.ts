import Vue from "vue";
import rinss, { rss } from "rinss";
import { quadrant, abs, PerspectiveTransform, rad2Deg, Point } from 'ambients-math';
import theme from "./theme";
import { pullOne, pushOne, randomColor, clear } from "ambients-utils";
import color from 'color';
import * as Hammer from 'hammerjs';
import { Eventss } from 'eventss';
import processSvg from "./processSvg";
import { localToLocal, globalVertices, globalVertex, globalCenter, globalRotation } from "./editorMath";

interface IEditorNodeData {
    tagName: string;
    el?: HTMLElement;
    vue? : any;
    children?: Array<IEditorNodeData>;
    transformOriginOld?: string;
    x?: number;
    y?: number;
    width: string | number;
    height: string | number;
    left: string | number;
    top: string | number;
    transformOrigin: string;
    rotate: number,
    background: string;
    position: string;
}

class EditorNodeData implements IEditorNodeData {
    public tagName: string;
    public el: HTMLElement;
    public vue: any;
    public children: Array<IEditorNodeData> = [];
    public width: string | number;
    public height: string | number;
    public left: string | number;
    public top: string | number;
    public rotate: number;
    public transformOrigin: string;
    public transformOriginOld: string;
    public background: string;
    public position: string;

    public get x(): number {
        return parseFloat(this.left as string);
    }
    public set x(val: number) {
        this.left = val;
    }

    public get y(): number {
        return parseFloat(this.top as string);
    }
    public set y(val: number) {
        this.top = val;
    }

    constructor(o: IEditorNodeData) {
        this.tagName = o.tagName;
        this.el = o.el;
        this.vue = o.vue;
        if (o.children != undefined) this.children = o.children;
        this.width = o.width;
        this.height = o.height;
        this.left = o.left;
        this.top = o.top;
        this.transformOrigin = o.transformOrigin;
        this.rotate = o.rotate;
        this.background = o.background;
        this.position = o.position;
    }

    public static default(): IEditorNodeData {
        return new EditorNodeData({
            tagName: '',
            width: 0,
            height: 0,
            left: 0,
            top: 0,
            transformOrigin: 'center',
            rotate: 0,
            background: '',
            position: ''
        });
    }

    public static getStyle(child: IEditorNodeData) {
        const { tagName, el, vue, children, transformOriginOld, x, y, ...style } = child;
        return style;
    }
}

let canvasContainer:HTMLElement, canvas:HTMLElement, canvasParent:HTMLElement;

const selectionPointer = {
    startX: 0,
    startY: 0,
    x: 0,
    y: 0,
    deltaX: 0,
    deltaY: 0,
    quadrant: 0,
    down: false,
    tool: ''
};

const transformOverlay = {
    el: undefined,
    vue: undefined,
    startDeltaRotate: 0,
    deltaRotate: 0,
    startRotate: 0,
    rotate: 0,
    startX: 0,
    startY: 0,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    startAnchorX: 0,
    startAnchorY: 0,
    anchorX: 0,
    anchorY: 0,
    transformOrigin: 'center'
}

const nodesSelected:Array<EditorNodeData> = [];
const nodeInFocus = { value: EditorNodeData.default() };
const nodeFocusHierarchy: Array<EditorNodeData> = [];

window.addEventListener('keydown', e => {
    if (e.key === 'a' && e.ctrlKey) {
        e.preventDefault();
        clear(nodesSelected);
        for (const node of nodeInFocus.value.children) pushOne(nodesSelected, node);
    }
});

Vue.component('Hammer', {
    template: `
        <div
         @panstart="$emit('panstart', $event)"
         @pan="$emit('pan', $event)"
         @panend="$emit('panend', $event)"
         @tap="$emit('tap', $event)"
         @dblclick="$emit('doubletap', $event)">
            <slot/>
        </div>
    `,
    mounted() {
        const mc = new Hammer.Manager(this.$el, {
            domEvents: true,
            recognizers: [
                [Hammer.Pan, { direction: Hammer.DIRECTION_ALL, threshold: 0 }],
                [Hammer.Tap, { event: 'tap', interval: 0, threshold: 10 }]
            ]
        });
        this.$on('destroyHammer', () => mc.destroy());
    },
    beforeDestroy() {
        this.$emit('destroyHammer');
    }
});

const selectionColor = color(theme.primary).alpha(0.3).darken(0.1).string();
const canvasParentSize = 5000;

const css = rinss.create({
    canvasContainer: {
        background: theme.background,
        position: 'relative',
        overflow: 'scroll'
    },
    canvasParent: {
        width: canvasParentSize,
        height: canvasParentSize,
        overflow: 'hidden'
    },
    selectionDrawableBox: {
        background: selectionColor,
        border: '1px solid ' + theme.primary,
        fillParent: true
    },
    selectionOverlay: {
        fillParent: true,
        background: selectionColor,
        border: '1px solid' + theme.primary,
        pointerEvents: 'none'
    },
    transformHandle: {
        width: 30,
        height: 30,
        position: 'absolute',
        translateX: '-50%',
        translateY: '-50%',
        cursor: `url('data:image/svg+xml;utf8,${processSvg(require("./icons/rotate.svg"), true)}') 25 25, auto`,
        pointerEvents: 'auto'
    },
    transformHandleInner: {
        width: 8,
        height: 8,
        background: 'white',
        border: '1px solid ' + theme.primary,
        centerX: true,
        centerY: true
    },
    transformOverlay: {
        position: 'absolute',
        border: '1px solid ' + theme.primary,
        pointerEvents: 'none',
        zIndex: 100
    },
    transformAnchor: {
        width: 10,
        height: 10,
        borderRadius: '100%',
        border: '1px solid ' + theme.primary,
        background: 'white',
        position: 'absolute',
        translateX: '-50%',
        translateY: '-50%',
        zIndex: 101
    },
    nodePointerListener: {
        fillParent: true,
        pointerEvents: 'auto'
    }
});

Vue.component('DrawableBox', {
    template: `
        <div :style="computedStyle"><slot/></div>
    `,
    props: {
        colorPicked: String
    },
    data() {
        return {
            selectionPointer,
            nodesSelected
        };
    },
    computed: {
        computedStyle(): string {
            const width = abs(this.selectionPointer.deltaX), height = abs(this.selectionPointer.deltaY);
            
            let x, y;
            switch (this.selectionPointer.quadrant) {
                case 1:
                    x = this.selectionPointer.startX;
                    y = this.selectionPointer.startY - height;
                    break;
                case 2:
                    x = this.selectionPointer.startX - width;
                    y = this.selectionPointer.startY - height;
                    break;
                case 3:
                    x = this.selectionPointer.startX - width;
                    y = this.selectionPointer.startY;
                    break;
                case 4:
                    x = this.selectionPointer.startX;
                    y = this.selectionPointer.startY;
                    break
            }
            return rss({
                width: width,
                height: height,
                absLeft: x,
                absTop: y
            });
        },
    },
    mounted() {
        clear(this.nodesSelected);
    },
    beforeDestroy() {
        this.$emit('push', new EditorNodeData({
            tagName: 'div',
            width: this.$el.style.width,
            height: this.$el.style.height,
            left: this.$el.style.left,
            top: this.$el.style.top,
            transformOrigin: 'center',
            rotate: 0,
            background: this.colorPicked,
            position: this.$el.style.position
        }));
    }
});

function reposition(data: { el: HTMLElement, vue: Vue, x: number, y: number }): void {
    const centerOld = globalVertex(data.el);
    data.vue.$nextTick(() => data.vue.$nextTick(() => {
        const centerNew = globalVertex(data.el);
        const deltaX = centerNew.x - centerOld.x, deltaY = centerNew.y - centerOld.y;
        data.x -= deltaX, data.y -= deltaY;
    }));
}

function applyAnchors(): void {
    for (const node of nodesSelected) {
        const pt = localToLocal(
            nodeInFocus.value.el, node.el,
            transformOverlay.anchorX, transformOverlay.anchorY
        );
        reposition(node);
        if (nodesSelected.length > 1) node.transformOriginOld = node.transformOrigin;
        node.transformOrigin = `${pt.x}px ${pt.y}px`;
    }
    const pt = localToLocal(
        nodeInFocus.value.el, transformOverlay.el,
        transformOverlay.anchorX, transformOverlay.anchorY
    );
    reposition(transformOverlay);
    transformOverlay.transformOrigin = `${pt.x + 1}px ${pt.y + 1}px`;
}

function resetTransformOrigins():void {
    for (const node of nodesSelected) {
        if (node.transformOriginOld == undefined) continue;
        reposition(node);
        node.transformOrigin = node.transformOriginOld;
        node.transformOriginOld = undefined;
    }
}

const pTrans = new PerspectiveTransform();

Vue.component('TransformHandle', {
    template: `
        <Hammer class="${css.transformHandle}" :style="computedStyle"
         @panstart="rPanStart" @pan="rPan" @panend="rPanEnd">
            <div class="${ css.transformHandleInner }"/>
        </Hammer>
    `,
    props: {
        index: Number
    },
    computed: {
        computedStyle():string {
            if (this.index === 0) return rss({ left: 0, top: 0 });
            else if (this.index === 1) return rss({ left: '50%', top: 0 });
            else if (this.index === 2) return rss({ left: '100%', top: 0 });
            else if (this.index === 3) return rss({ left: 0, top: '50%' });
            else if (this.index === 4) return rss({ left: '100%', top: '50%' });
            else if (this.index === 5) return rss({ left: 0, top: '100%' });
            else if (this.index === 6) return rss({ left: '50%', top: '100%' });
            else return rss({ left: '100%', top: '100%' });
        }
    },
    data() {
        return {
            transformOverlay,
            nodesSelected,
            nodeInFocus
        };
    },
    methods: {
        rPanStart({ gesture: { center: { x, y } } }) {
            const centerX = this.transformOverlay.x + (this.transformOverlay.width / 2);
            const centerY = this.transformOverlay.y + (this.transformOverlay.height / 2);
            const pt = pTrans.solve(x, y);
            const angle = Math.atan2(centerY - pt.y, centerX - pt.x) * rad2Deg;
            this.transformOverlay.startDeltaRotate = angle;
            this.transformOverlay.startRotate = this.transformOverlay.rotate;

            for (const node of this.nodesSelected) {
                node.vue.startRotate = node.rotate;
                node.vue.startX = node.x;
                node.vue.startY = node.y;
            }
            applyAnchors();
        },
        rPan({ gesture: { center: { x, y } } }) {
            const centerX = this.transformOverlay.x + (this.transformOverlay.width / 2);
            const centerY = this.transformOverlay.y + (this.transformOverlay.height / 2);
            const pt = pTrans.solve(x, y);
            const angle = Math.atan2(centerY - pt.y, centerX - pt.x) * rad2Deg;
            this.transformOverlay.deltaRotate = angle - this.transformOverlay.startDeltaRotate;
            this.transformOverlay.rotate = this.transformOverlay.startRotate + this.transformOverlay.deltaRotate;
            
            for (const node of this.nodesSelected)
                node.rotate = node.vue.startRotate + this.transformOverlay.deltaRotate;
        },
        rPanEnd() {
            this.$nextTick(()=>resetTransformOrigins());
        }
    }
});

Vue.component('transform-overlay', {
    template: `
        <div class="${ css.transformOverlay }" :style="computedStyle">
            <TransformHandle :index="0" v-if="tool === 'transform'"/>
            <TransformHandle :index="1" v-if="tool === 'transform'"/>
            <TransformHandle :index="2" v-if="tool === 'transform'"/>
            <TransformHandle :index="3" v-if="tool === 'transform'"/>
            <TransformHandle :index="4" v-if="tool === 'transform'"/>
            <TransformHandle :index="5" v-if="tool === 'transform'"/>
            <TransformHandle :index="6" v-if="tool === 'transform'"/>
            <TransformHandle :index="7" v-if="tool === 'transform'"/>
        </div>
    `,
    props: {
        tool: String
    },
    data() {
        return {
            nodesSelected,
            transformOverlay,
            nodeInFocus
        };
    },
    computed: {
        computedStyle():string {
            return rss({
                left: this.transformOverlay.x,
                top: this.transformOverlay.y,
                width: this.transformOverlay.width,
                height: this.transformOverlay.height,
                rotate: this.transformOverlay.rotate,
                transformOrigin: this.transformOverlay.transformOrigin
            });
        }
    },
    watch: {
        nodesSelected: {
            immediate: true,
            handler(nodes: Array<EditorNodeData>) {
                let xMin = Infinity, xMax = -Infinity, yMin = Infinity, yMax = -Infinity;
                for (const node of nodes) {
                    const bounds = node.el.getBoundingClientRect();
                    if (bounds.left < xMin) xMin = bounds.left;
                    if (bounds.right > xMax) xMax = bounds.right;
                    if (bounds.top < yMin) yMin = bounds.top;
                    if (bounds.bottom > yMax) yMax = bounds.bottom;
                }
                const pt0 = pTrans.solve(xMin, yMin);
                const pt2 = pTrans.solve(xMax, yMax);
                this.transformOverlay.x = pt0.x;
                this.transformOverlay.y = pt0.y;
                this.transformOverlay.width = pt2.x - pt0.x;
                this.transformOverlay.height = pt2.y - pt0.y;
                this.transformOverlay.rotate = 0;
                this.transformOverlay.anchorX = this.transformOverlay.x + (this.transformOverlay.width / 2);
                this.transformOverlay.anchorY = this.transformOverlay.y + (this.transformOverlay.height / 2);
                this.transformOverlay.startAnchorX = this.transformOverlay.anchorX;
                this.transformOverlay.startAnchorY = this.transformOverlay.anchorY;

                this.$nextTick(()=>{
                    if (nodes.length != 1) return;
                    
                    const xy = getComputedStyle(nodes[0].el).transformOrigin.split(' ').map(parseFloat);
                    const anchorXY = localToLocal(
                        nodes[0].el, this.nodeInFocus.value.el, xy[0], xy[1]
                    );
                    this.transformOverlay.anchorX = anchorXY.x, this.transformOverlay.anchorY = anchorXY.y;
                    this.transformOverlay.startAnchorX = this.transformOverlay.anchorX;
                    this.transformOverlay.startAnchorY = this.transformOverlay.anchorY;

                    const pt = localToLocal(
                        this.nodeInFocus.value.el, this.transformOverlay.el,
                        this.transformOverlay.anchorX, this.transformOverlay.anchorY
                    );
                    reposition(transformOverlay);
                    this.transformOverlay.transformOrigin = `${pt.x + 1}px ${pt.y + 1}px`;
                });
            }
        }
    },
    mounted() {
        this.transformOverlay.el = this.$el;
        this.transformOverlay.vue = this;
    }
});

function viz(el: HTMLElement, left: number, top: number):void {
    rinss.inline(el.appendChild(document.createElement('div')), {
        translateX: '-50%',
        translateY: '-50%',
        width: 5,
        height: 5,
        background: randomColor(),
        absLeft: left,
        absTop: top,
        zIndex: 9999
    });
}

Vue.component('TransformAnchor', {
    template: `
        <Hammer class="${ css.transformAnchor }" :style="computedStyle"
         @panstart="panStart" @pan="pan" @panend="panEnd"/>
    `,
    computed: {
        computedStyle():string {
            return rinss.compile({
                left: transformOverlay.anchorX,
                top: transformOverlay.anchorY
            });
        }
    },
    data() {
        return {
            transformOverlay,
            nodeInFocus
        }
    },
    methods: {
        panStart() {
            this.transformOverlay.startAnchorX = this.transformOverlay.anchorX;
            this.transformOverlay.startAnchorY = this.transformOverlay.anchorY;
        },
        pan(e) {
            const ptStart = pTrans.solve(0, 0);
            const ptDelta = pTrans.solve(e.gesture.deltaX, e.gesture.deltaY);
            const dx = ptDelta.x - ptStart.x, dy = ptDelta.y - ptStart.y;
            this.transformOverlay.anchorX = this.transformOverlay.startAnchorX + dx;
            this.transformOverlay.anchorY = this.transformOverlay.startAnchorY + dy;
        },
        panEnd() {
            applyAnchors();
            requestAnimationFrame(()=>resetTransformOrigins());
        }
    }
});

Vue.component('EditorBoxInner', {
    template: `
        <component :is="tagName" :style="computedStyle"/>
    `,
    props: {
        tagName: String,
        background: String
    },
    computed: {
        computedStyle():string {
            return rss({
                fillParent: true,
                background: this.background
            });
        }
    }
});

Vue.component('NodePointerListener', {
    template: `
        <Hammer class="${ css.nodePointerListener }"
         @panstart="panStart" @pan="pan" @panend="panEnd" @tap="tap" @doubletap="doubleTap"/>
    `,
    methods: {
        panStart(e) {
            e.stopPropagation();
            this.$emit('panstart', e);
        },
        pan(e) {
            e.stopPropagation();
            this.$emit('pan', e);
        },
        panEnd(e) {
            e.stopPropagation();
            this.$emit('panend', e);
        },
        tap(e) {
            e.stopPropagation();
            this.$emit('tap', e);
        },
        doubleTap(e) {
            e.stopPropagation();
            this.$emit('doubletap', e);
        }
    }
});

const editorEventss = new Eventss().emitState('windowSize').from(window, 'resize', 'windowSize');
editorEventss.once('mounted', ()=>editorEventss.from(canvasContainer, 'scroll', 'windowSize'));
editorEventss.debounce('windowSize', 100);

Vue.component('BackgroundPointerListener', {
    template: `
        <Hammer :style="computedStyle"
         @panstart="panStart" @pan="pan" @panend="panEnd" @tap="tap" @doubletap="doubleTap"/>
    `,
    data() {
        return {
            left: 0,
            top: 0,
            width: 0,
            height: 0,
            eventss: new Eventss()
        };  
    },
    mounted() {
        this.eventss.emitState('windowSize').from(window, 'resize', 'windowSize').debounce('windowSize', 100);

        editorEventss.once('mounted', ()=>{
            this.eventss.from(canvasContainer, 'scroll', 'windowSize');

            this.eventss.off('windowSize').on('windowSize', () => {
                this.width = canvasContainer.clientWidth;
                this.height = canvasContainer.clientHeight;

                this.$nextTick(()=>{
                    const centerContainer = globalCenter(canvasContainer);
                    const centerSelf = globalCenter(this.$el);
                    const xDiff = centerContainer.x - centerSelf.x;
                    const yDiff = centerContainer.y - centerSelf.y;
                    this.left += xDiff - 10, this.top += yDiff - 10;
                });
            });
        });
    },
    beforeDestroy() {
        this.eventss.reset();
    },
    computed: {
        computedStyle():string {
            return rss({
                width: this.width,
                height: this.height,
                absLeft: this.left,
                absTop: this.top,
                pointerEvents: 'auto'
            });
        }
    },
    methods: {
        panStart(e) {
            e.stopPropagation();
            this.$emit('panstart', e);
        },
        pan(e) {
            e.stopPropagation();
            this.$emit('pan', e);
        },
        panEnd(e) {
            e.stopPropagation();
            this.$emit('panend', e);
        },
        tap(e) {
            e.stopPropagation();
            this.$emit('tap', e);
        },
        doubleTap(e) {
            e.stopPropagation();
            this.$emit('doubletap', e);
        }
    }
});

Vue.component('editor-node', {
    template: `
        <div :style="outerStyle">
            <BackgroundPointerListener v-if="focused" style="background:rgba(255, 255, 255, 0.5)"
             @pan="panPointer"
             @panstart="panPointerStart"
             @panend="panPointerEnd"
             @tap="tapPointer"
             @doubletap="doubleTapPointer"/>

            <component :is="nodeData.tagName" :style="innerStyle"/>

            <NodePointerListener v-if="parentNodeFocused && selectable"
             @tap="tap" @doubletap="doubleTap" @panstart="panStart" @pan="pan"/>

            <editor-node
             v-for="(child, index) of nodeData.children"
             :key="index"
             :node="child"
             :parentNodeFocused="focused"
             :tool="tool"
             :colorPicked="colorPicked"/>

            <div class="${ css.selectionOverlay }" v-if="selected"/>

            <transform-overlay v-if="focused && nodesSelected.length > 0" :tool="tool"/>
            <TransformAnchor v-if="focused && nodesSelected.length > 0 && tool === 'transform'"/>

            <DrawableBox
             :colorPicked="colorPicked"
             @push="nodeData.children.push($event)"
             v-if="focused && tool === 'rectangle' && selectionPointer.down">
                <EditorBoxInner tagName="div" :background="colorPicked"/>
            </DrawableBox>

            <DrawableBox v-if="focused && (tool === 'cursor' || tool === 'transform') && selectionPointer.down">
                <div class="${ css.selectionDrawableBox }"/>
            </DrawableBox>
        </div>
    `,
    props: {
        node: Object,
        parentNodeFocused: Boolean,
        tool: String,
        colorPicked: String
    },
    data() {
        return {
            selectionPointer,
            nodesSelected,
            nodeInFocus,
            nodeFocusHierarchy,
            transformOverlay,
            nodeData: this.node,
            startX: 0,
            startY: 0,
            startRotate: 0
        }
    },
    computed: {
        innerStyle():string {
            return rss(EditorNodeData.getStyle({
                ...this.nodeData,
                position: 'relative',
                top: undefined,
                left: undefined,
                transformOrigin: undefined,
                rotate: undefined,
                pointerEvents: 'none'
            }));
        },
        outerStyle():string {
            return rss({
                position: this.nodeData.position,
                top: this.nodeData.top,
                left: this.nodeData.left,
                transformOrigin: this.nodeData.transformOrigin,
                rotate: this.nodeData.rotate,
                zIndex: this.inFocusHierarchy ? 1 : '',
                pointerEvents: 'none'
            });
        },
        selected():boolean {
            return this.parentNodeFocused && this.nodesSelected.indexOf(this.nodeData) > -1;
        },
        selectable():boolean {
            if (!this.parentNodeFocused || this.selectionPointer.down) return false;
            return this.selectionPointer.tool === 'cursor' || this.selectionPointer.tool === 'transform';
        },
        focused(): boolean {
            return this.nodeData === this.nodeInFocus.value;
        },
        inFocusHierarchy():boolean {
            return this.nodeFocusHierarchy.indexOf(this.nodeData) > -1;
        }
    },
    mounted() {
        this.nodeData.el = this.$el;
        this.nodeData.vue = this;
        this.select();
    },
    methods: {
        panStart(e) {
            if (!this.selectable) return;

            if (!e.gesture.srcEvent.shiftKey) {
                if (!this.selected) this.select();
            }
            else pushOne(this.nodesSelected, this.nodeData);

            this.$nextTick(()=>{
                this.transformOverlay.startX = this.transformOverlay.x;
                this.transformOverlay.startY = this.transformOverlay.y;

                this.transformOverlay.startAnchorX = this.transformOverlay.anchorX;
                this.transformOverlay.startAnchorY = this.transformOverlay.anchorY;

                for (const node of nodesSelected) {
                    node.vue.startX = node.x;
                    node.vue.startY = node.y;
                }
            });
        },
        pan(e) {
            if (!this.selectable) return;

            this.$nextTick(()=>{
                const ptStart = pTrans.solve(0, 0);
                const ptDelta = pTrans.solve(e.gesture.deltaX, e.gesture.deltaY);
                const dx = ptDelta.x - ptStart.x, dy = ptDelta.y - ptStart.y;

                this.transformOverlay.x = this.transformOverlay.startX + dx;
                this.transformOverlay.y = this.transformOverlay.startY + dy;
                
                this.transformOverlay.anchorX = this.transformOverlay.startAnchorX + dx;
                this.transformOverlay.anchorY = this.transformOverlay.startAnchorY + dy;

                for (const node of nodesSelected) {
                    node.x = node.vue.startX + dx;
                    node.y = node.vue.startY + dy;
                }
            });
        },
        tap(e) {
            if (!this.selectable) return;
            this.select(e.gesture.srcEvent.shiftKey);
        },
        doubleTap(e) {
            if (!this.selectable) return;
            if (e.shiftKey) return;
            this.nodeFocusHierarchy.push(this.nodeData);
            clear(this.nodesSelected);
        },
        select(multiple = false) {
            if (!multiple) clear(this.nodesSelected);
            if (!this.selected) pushOne(this.nodesSelected, this.nodeData);
            else pullOne(this.nodesSelected, this.nodeData);
        },
        panPointer({ gesture: { center: { x, y } } }) {
            const pt = pTrans.solve(x, y);
            this.selectionPointer.deltaX = pt.x - this.selectionPointer.startX;
            this.selectionPointer.deltaY = pt.y - this.selectionPointer.startY;
            this.selectionPointer.quadrant = quadrant(
                this.selectionPointer.deltaX, this.selectionPointer.deltaY, 0, 0
            );
        },
        panPointerStart({ gesture: { center: { x, y } } }) {
            this.selectionPointer.down = true;
            const pt = pTrans.solve(x, y);
            this.selectionPointer.startX = pt.x;
            this.selectionPointer.startY = pt.y;
        },
        panPointerEnd() {
            this.selectionPointer.down = false;
        },
        tapPointer() {
            if (this.tool === 'cursor' || this.tool === 'transform')
                clear(this.nodesSelected);
        },
        doubleTapPointer() {
            if (this.tool !== 'cursor' && this.tool !== 'transform') return;
            clear(this.nodesSelected);
            this.nodeFocusHierarchy.pop();
        }
    }
});

let hierarchyLength = 0;
const translateHierarchy:Array<Point> = [];
let firstHierarchyPush = true;

Vue.component('editor', {
    template:`
        <div class="${ css.canvasContainer }">
            <div ref="canvasParent" class="${ css.canvasParent }">
                <div ref="canvas">
                    <BackgroundPointerListener v-if="focused"
                     @pan="pan" @panstart="panStart" @panend="panEnd" @tap="tap"/>

                    <editor-node
                     v-for="(child, index) of children"
                     :key="index"
                     :node="child"
                     :parentNodeFocused="focused"
                     :tool="tool"
                     :colorPicked="colorPicked"/>

                    <transform-overlay v-if="focused && nodesSelected.length > 0" :tool="tool"/>
                    <TransformAnchor v-if="focused && nodesSelected.length > 0 && tool === 'transform'"/>

                    <DrawableBox
                     :colorPicked="colorPicked"
                     @push="children.push($event)"
                     v-if="focused && tool === 'rectangle' && selectionPointer.down">
                        <EditorBoxInner tagName="div" :background="colorPicked"/>
                    </DrawableBox>

                    <DrawableBox
                     v-if="focused && (tool === 'cursor' || tool === 'transform') && selectionPointer.down">
                        <div class="${ css.selectionDrawableBox }"/>
                    </DrawableBox>
                </div>
            </div>
        </div>
    `,
    computed: {
        focused():boolean {
            return this.$refs.canvas === this.nodeInFocus.value.el;
        }
    },
    props: {
        colorPicked: String,
        tool: String
    },
    data() {
        return{
            sceneGraph: undefined,
            children: undefined,
            selectionPointer,
            nodesSelected,
            nodeInFocus,
            nodeFocusHierarchy
        }
    },
    mounted() {
        canvas = rinss.inline(this.$refs.canvas as any, {
            width: 800,
            height: 600,
            background: 'white',
            centerX: true,
            centerY: true
        });
        
        this.sceneGraph = new EditorNodeData({
            tagName: canvas.tagName.toLowerCase(),
            el: canvas,
            vue: this,
            width: canvas.style.width,
            height: canvas.style.height,
            left: canvas.style.left,
            top: canvas.style.top,
            transformOrigin: 'center',
            rotate: 0,
            background: canvas.style.background,
            position: canvas.style.position
        });
        this.nodeFocusHierarchy.push(this.sceneGraph);
        this.children = this.nodeInFocus.value.children;

        canvasContainer = this.$el;
        this.$nextTick(()=>{
            const half = canvasParentSize / 2;
            canvasContainer.scrollLeft =
                half - (canvas.clientWidth / 2) - ((canvasContainer.clientWidth - canvas.clientWidth) / 2);
            canvasContainer.scrollTop =
                half - (canvas.clientHeight / 2) - ((canvasContainer.clientHeight - canvas.clientHeight) / 2);
        });

        canvasParent = this.$refs.canvasParent as any;
        editorEventss.emitState('mounted');
    },
    watch: {
        tool(tool) {
            selectionPointer.tool = tool;
        },
        nodeFocusHierarchy(arr: Array<EditorNodeData>) {
            if (firstHierarchyPush) firstHierarchyPush = false;
            else {
                const scrollLeft = canvasContainer.scrollLeft;
                const scrollTop = canvasContainer.scrollTop;
                this.$nextTick(() => {
                    canvasContainer.scrollLeft = scrollLeft;
                    canvasContainer.scrollTop = scrollTop;
                });
            }

            const push = arr.length > hierarchyLength;
            hierarchyLength = arr.length;

            const node = arr[arr.length - 1];

            const xOld = rinss.number(canvasParent, 'translateX') || 0;
            const yOld = rinss.number(canvasParent, 'translateY') || 0;
            
            const ptOld = globalCenter(node.el);
            rinss.inline(canvas, {
                rotate: globalRotation(canvas) - globalRotation(node.el)
            });
            const ptNew = globalCenter(node.el);

            let translate:Point;
            if (push) {
                translate = new Point(xOld - (ptNew.x - ptOld.x), yOld - (ptNew.y - ptOld.y));
                translateHierarchy.push(translate);
            }
            else {
                translateHierarchy.pop();
                translate = translateHierarchy[translateHierarchy.length - 1];
            }
            rinss.inline(canvasParent, {
                translateX: translate.x, translateY: translate.y
            });
            
            this.$nextTick(()=>{
                pTrans.setDestination(
                    0, 0, node.el.clientWidth, 0, node.el.clientWidth, node.el.clientHeight, 0, node.el.clientHeight
                );
                editorEventss.off('windowSize').on('windowSize', () => {
                    const v = globalVertices(node.el);
                    pTrans.setSource(v[0].x, v[0].y, v[1].x, v[1].y, v[2].x, v[2].y, v[3].x, v[3].y);
                });
            });
            this.nodeInFocus.value = node;
        }
    },
    methods: {
        pan({ gesture: { center: { x, y } } }) {
            const pt = pTrans.solve(x, y);
            this.selectionPointer.deltaX = pt.x - this.selectionPointer.startX;
            this.selectionPointer.deltaY = pt.y - this.selectionPointer.startY;
            this.selectionPointer.quadrant = quadrant(
                this.selectionPointer.deltaX, this.selectionPointer.deltaY, 0, 0
            );
        },
        panStart({ gesture: { center: { x, y } } }) {
            this.selectionPointer.down = true;
            const pt = pTrans.solve(x, y);
            this.selectionPointer.startX = pt.x;
            this.selectionPointer.startY = pt.y;
        },
        panEnd() {
            this.selectionPointer.down = false;
        },
        tap() {
            if (this.tool === 'cursor' || this.tool === 'transform')
                clear(this.nodesSelected);
        }
    }
});
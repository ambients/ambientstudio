import Vue, { VueConstructor } from "vue";
import rinss, { rss } from "rinss";
import { quadrant, abs, PerspectiveTransform, Point } from 'ambients-math';
import theme from "./theme";
import { Obj, pullOne, pushOne, identify } from "ambients-utils";
import color from 'color';
import * as Hammer from 'hammerjs';
import { debounce } from 'lodash';

class EditorNode implements IEditorNode {
    public tagName: string;
    public el: HTMLElement;
    public children: Array<IEditorNode> = [];
    public width: string | number;
    public height: string | number;
    public left: string | number;
    public top: string | number;
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

    constructor(o: IEditorNode) {
        this.tagName = o.tagName;
        this.el = o.el;
        if (o.children != undefined) this.children = o.children;
        this.width = o.width;
        this.height = o.height;
        this.left = o.left;
        this.top = o.top;
        this.background = o.background;
        this.position = o.position;
    }

    public static default(): IEditorNode {
        return new EditorNode({
            tagName: '',
            width: 0,
            height: 0,
            left: 0,
            top: 0,
            background: '',
            position: ''
        });
    }

    public static getStyle(child: IEditorNode) {
        const { el, children, tagName, ...style } = child;
        return style;
    }
}

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
    startX: 0,
    startY: 0,
    x: 0,
    y: 0,
    width: 0,
    height: 0
}

const selectedNodes = [];
const nodeInFocus = { value: EditorNode.default() };
const nodeFocusHierarchy = [];

const HammerJS = Vue.extend({
    mounted() {
        const mc = new Hammer.Manager(this.$el, {
            domEvents: true,
            recognizers: [
                [Hammer.Pan, { direction: Hammer.DIRECTION_ALL, threshold: 0 }]
            ]
        });
        mc.add(new Hammer.Tap({ event: 'doubletap', taps: 2 }));
        mc.add(new Hammer.Tap({ event: 'tap', interval: 50 }));
        mc.get('doubletap').recognizeWith('tap');
        mc.get('tap').requireFailure('doubletap');

        this.$on('destroyHammer', () => mc.destroy());
    },
    beforeDestroy() {
        this.$emit('destroyHammer');
    }
});

interface IEditorNode {
    tagName: string;
    el?: HTMLElement;
    children?: Array<IEditorNode>;
    width: string | number;
    height: string | number;
    left: string | number;
    top: string | number;
    background: string;
    position: string;
    x?: number;
    y?: number;
}

const selectionColor = color(theme.primary).alpha(0.3).darken(0.1).string();

const css = rinss.create({
    canvasContainer: {
        width: '100%',
        height: '100%',
        background: theme.background,
        position: 'relative',
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
        width: 8,
        height: 8,
        background: 'white',
        border: '1px solid ' + theme.primary,
        position: 'absolute',
        translateX: '-50%',
        translateY: '-50%'
    },
    transformOverlay: {
        position: 'absolute',
        border: '1px solid ' + theme.primary,
        pointerEvents: 'none',
        zIndex: 100
    },
    focusMask: {
        width: '100vw',
        height: '100vh',
        fixTop: 0,
        fixLeft: 0,
        background: 'rgba(255, 255, 255, 0.5)',
        pointerEvents: 'none'
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
            selectedNodes
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
        this.selectedNodes.splice(0, this.selectedNodes.length);
    },
    beforeDestroy() {
        this.$emit('push', new EditorNode({
            tagName: 'div',
            width: this.$el.style.width,
            height: this.$el.style.height,
            left: this.$el.style.left,
            top: this.$el.style.top,
            background: this.colorPicked,
            position: this.$el.style.position
        }));
    }
});

Vue.component('transform-overlay', {
    template: `
        <div class="${ css.transformOverlay }" :style="computedStyle">
            <div class="${css.transformHandle}" style="${rss({ left: 0, top: 0 })}"/>
            <div class="${css.transformHandle}" style="${rss({ left: '50%', top: 0 })}"/>
            <div class="${css.transformHandle}" style="${rss({ left: '100%', top: 0 })}"/>
            
            <div class="${css.transformHandle}" style="${rss({ left: 0, top: '50%' })}"/>
            <div class="${css.transformHandle}" style="${rss({ left: '100%', top: '50%' })}"/>

            <div class="${css.transformHandle}" style="${rss({ left: 0, top: '100%' })}"/>
            <div class="${css.transformHandle}" style="${rss({ left: '50%', top: '100%' })}"/>
            <div class="${css.transformHandle}" style="${rss({ left: '100%', top: '100%' })}"/>
        </div>
    `,
    data() {
        return {
            selectedNodes,
            transformOverlay
        };
    },
    computed: {
        computedStyle():string {
            return rss({
                left: this.transformOverlay.x,
                top: this.transformOverlay.y,
                width: this.transformOverlay.width,
                height: this.transformOverlay.height
            });
        }
    },
    watch: {
        selectedNodes: {
            immediate: true,
            handler(nodes) {
                let xMin = Infinity, xMax = -Infinity, yMin = Infinity, yMax = -Infinity;
                for (const node of this.selectedNodes) {
                    const bounds = (node.$el as HTMLElement).getBoundingClientRect();
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
            }
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

Vue.component('editor-node', {
    mixins: [HammerJS],
    template: `
        <div :style="outerStyle" @tap="tap" @doubletap="doubleTap" @panstart="panStart" @pan="pan">
            <div class="${ css.focusMask }" v-if="inFocusHierarchy"/>
            <component :is="nodeData.tagName" :style="innerStyle" ref="el"/>
            <div class="${ css.selectionOverlay }" v-if="selected"/>

            <editor-node
             v-for="(child, index) of nodeData.children"
             :key="index"
             :node="child"
             :parentNodeFocused="focused"
             :tool="tool"
             :colorPicked="colorPicked"/>

            <transform-overlay v-if="focused && selectedNodes.length > 0"/>

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
            selectedNodes,
            nodeInFocus,
            nodeFocusHierarchy,
            transformOverlay,
            nodeData: this.node,
            startX: 0,
            startY: 0
        }
    },
    computed: {
        innerStyle():string {
            return rss(EditorNode.getStyle({
                ...this.nodeData,
                position: 'relative',
                top: undefined,
                left: undefined
            }));
        },
        outerStyle():string {
            return rss({
                position: this.nodeData.position,
                top: parseFloat(this.nodeData.top),
                left: parseFloat(this.nodeData.left),
                zIndex: this.inFocusHierarchy ? 1 : ''
            });
        },
        selected():boolean {
            return this.parentNodeFocused && this.selectedNodes.indexOf(this) > -1;
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
        this.nodeData.el = this.$refs.el;
        this.select();
    },
    methods: {
        panStartDebounceLeading: debounce(function(this:any, e) {
            if (!e.gesture.srcEvent.shiftKey) {
                if (!this.selected) this.select();
            }
            else pushOne(this.selectedNodes, this);

        }, 0, { leading: true, trailing: false }),

        panStartDebounceTrailing: debounce(function(this:any) {
            for (const node of selectedNodes) {
                node.startX = node.nodeData.x;
                node.startY = node.nodeData.y;
            }
            this.transformOverlay.startX = this.transformOverlay.x;
            this.transformOverlay.startY = this.transformOverlay.y;

        }, 0, { leading: false, trailing: true }),

        panStart(e) {
            if (!this.selectable) return;
            e.stopPropagation();
            this.panStartDebounceLeading(e);
            this.panStartDebounceTrailing();
        },
        panDebounce: debounce(function (this: any, { gesture: { deltaX, deltaY } }) {
            const ptStart = pTrans.solve(0, 0);
            const ptDelta = pTrans.solve(deltaX, deltaY);
            const dx = ptDelta.x - ptStart.x, dy = ptDelta.y - ptStart.y;

            for (const node of this.selectedNodes) {
                node.nodeData.x = node.startX + dx;
                node.nodeData.y = node.startY + dy;
            }
            this.transformOverlay.x = this.transformOverlay.startX + dx;
            this.transformOverlay.y = this.transformOverlay.startY + dy;
        }),
        pan(e) {
            if (!this.selectable) return;
            e.stopPropagation();
            this.panDebounce(e);
        },
        tap(e) {
            if (!this.selectable) return;
            e.stopPropagation();
            this.select(e);
        },
        doubleTapDebounce: debounce(function (this: any, { gesture: { srcEvent: { shiftKey } } }) {
            if (shiftKey) return;
            this.nodeInFocus.value = this.nodeData;
            this.nodeFocusHierarchy.push(this.nodeData);
            this.selectedNodes.splice(0, this.selectedNodes.length);
        }),
        doubleTap(e) {
            if (!this.selectable) return;
            e.stopPropagation();
            this.doubleTapDebounce(e);
        },
        select: debounce(function(this:any, e?) {
            if (e == undefined || !e.gesture.srcEvent.shiftKey)
                this.selectedNodes.splice(0, this.selectedNodes.length);

            if (!this.selected) this.selectedNodes.push(this);
            else pullOne(this.selectedNodes, this);
        })
    }
});

const pTrans = new PerspectiveTransform();

function vertices(el: HTMLElement): Array<Point> {
    const b = el.getBoundingClientRect();
    return [
        new Point(b.left, b.top), new Point(b.right, b.top),
        new Point(b.right, b.bottom), new Point(b.left, b.bottom)
    ];
}

Vue.component('editor', {
    mixins: [HammerJS],
    template:`
        <div class="${ css.canvasContainer }" @pan="pan" @panstart="panStart" @panend="panEnd" @tap="tap">
            <div ref="canvas" style="${ rss({
                width: 800,
                height: 600,
                background: 'white',
                centerX: true,
                centerY: true
            }) }">
                <editor-node
                 v-for="(child, index) of children"
                 :key="index"
                 :node="child"
                 :parentNodeFocused="focused"
                 :tool="tool"
                 :colorPicked="colorPicked"/>

                <transform-overlay v-if="focused && selectedNodes.length > 0"/>

                <DrawableBox
                 :colorPicked="colorPicked"
                 @push="children.push($event)"
                 v-if="focused && tool === 'rectangle' && selectionPointer.down">
                    <EditorBoxInner tagName="div" :background="colorPicked"/>
                </DrawableBox>

                <DrawableBox v-if="focused && (tool === 'cursor' || tool === 'transform') && selectionPointer.down">
                    <div class="${ css.selectionDrawableBox }"/>
                </DrawableBox>
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
            selectedNodes,
            nodeInFocus,
            nodeFocusHierarchy
        }
    },
    mounted() {
        const el:HTMLElement = this.$refs.canvas as any;
        this.sceneGraph = new EditorNode({
            tagName: el.tagName.toLowerCase(),
            el: el,
            width: el.style.width,
            height: el.style.height,
            left: el.style.left,
            top: el.style.top,
            background: el.style.background,
            position: el.style.position
        });
        this.nodeInFocus.value = this.sceneGraph;
        this.nodeFocusHierarchy.push(this.sceneGraph);
        this.children = this.nodeInFocus.value.children;
    },
    watch: {
        tool(tool) {
            selectionPointer.tool = tool;
        },
        'nodeInFocus.value'(p:IEditorNode) {
            const v = vertices(p.el);
            pTrans.setSource(v[0].x, v[0].y, v[1].x, v[1].y, v[2].x, v[2].y, v[3].x, v[3].y);
            pTrans.setDestination(
                0, 0, p.el.clientWidth, 0, p.el.clientWidth, p.el.clientHeight, 0, p.el.clientHeight
            );
        }
    },
    methods: {
        pan({ gesture: { center: { x, y } } }) {
            const pt = pTrans.solve(x, y);
            this.selectionPointer.deltaX = pt.x - this.selectionPointer.startX;
            this.selectionPointer.deltaY = pt.y - this.selectionPointer.startY;
            this.selectionPointer.quadrant = quadrant(this.selectionPointer.deltaX, this.selectionPointer.deltaY, 0, 0);
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
                this.selectedNodes.splice(0, this.selectedNodes.length);
        }
    }
}); 

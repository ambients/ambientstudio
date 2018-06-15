import Vue, { VueConstructor } from "vue";
import rinss, { rss } from "rinss";
import { quadrant, abs, PerspectiveTransform, Point } from 'ambients-math';
import theme from "./theme";
import { Obj, pullOne, pushOne } from "ambients-utils";
import color from 'color';
import * as Hammer from 'hammerjs';
import { debounce } from 'lodash';

const pointer = {
    startX: 0,
    startY: 0,
    x: 0,
    y: 0,
    deltaX: 0,
    deltaY: 0,
    quadrant: 0,
    down: false
};

const selectedNodes = [];

const boundingBox = {
    startLeft: 0,
    startTop: 0,
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    rotate: 0
}

const HammerJS = Vue.extend({
    mounted() {
        const hammerManager = new Hammer.Manager(this.$el, {
            domEvents: true,
            recognizers: [
                [Hammer.Pan, { direction: Hammer.DIRECTION_ALL, threshold: 0 }],
                [Hammer.Tap]
            ]
        });
        this.$on('destroyHammer', () => hammerManager.destroy());
    },
    beforeDestroy() {
        this.$emit('destroyHammer');
    }
});

class EditorNode {
    public tagName: string;
    public el?: HTMLElement;
    public children?: Array<EditorNode> = [];
    public width: string | number;
    public height: string | number;
    public left: string | number;
    public top: string | number;
    public background: string;
    public position: string;

    constructor(o: EditorNode) {
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

    public static default():EditorNode {
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

    public static getStyle(child: EditorNode) {
        const { el, children, tagName, ...style } = child;
        return style;
    }
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
    selectionBox: {
        background: selectionColor,
        border: '1px solid ' + theme.primary
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
    selectionOverlay: {
        fillParent: true,
        background: selectionColor,
        border: '1px solid' + theme.primary,
        pointerEvents: 'auto'
    },
    transformOverlay: {
        position: 'absolute',
        border: '1px solid ' + theme.primary,
        pointerEvents: 'none'
    }
});

Vue.component('editor-box', {
    template: `
        <div :style="computedStyle"></div>
    `,
    props: {
        color: String
    },
    data() {
        return {
            pointer,
            selectedNodes
        };
    },
    computed: {
        computedStyle(): string {
            const width = abs(this.pointer.deltaX), height = abs(this.pointer.deltaY);
            
            let x, y;
            switch (this.pointer.quadrant) {
                case 1:
                    x = this.pointer.startX;
                    y = this.pointer.startY - height;
                    break;
                case 2:
                    x = this.pointer.startX - width;
                    y = this.pointer.startY - height;
                    break;
                case 3:
                    x = this.pointer.startX - width;
                    y = this.pointer.startY;
                    break;
                case 4:
                    x = this.pointer.startX;
                    y = this.pointer.startY;
                    break
            }
            return rss({
                background: this.color,
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
        this.$emit('input', new EditorNode({
            tagName: 'div',
            width: this.$el.style.width,
            height: this.$el.style.height,
            left: this.$el.style.left,
            top: this.$el.style.top,
            background: this.$el.style.background,
            position: this.$el.style.position
        }));
    }
});

Vue.component('transform-overlay', {
    template: `
        <div class="${ css.transformOverlay }" :style="computedStyle" v-if="selectedNodes.length > 0">
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
            boundingBox,
            selectedNodes
        };
    },
    computed: {
        computedStyle():string {
            return rss({
                left: this.boundingBox.left,
                top: this.boundingBox.top,
                width: this.boundingBox.width,
                height: this.boundingBox.height
            });
        }
    }
});

Vue.component('editor-node', {
    mixins: [HammerJS],
    template: `
        <div :style="outerStyle" @tap="select" @panstart="panStart" @pan="pan">
            <component :is="render.tagName" :style="innerStyle"/>
            <div class="${ css.selectionOverlay }" v-if="selected"/>
        </div>
    `,
    props: {
        render: Object
    },
    data() {
        return {
            selectedNodes,
            boundingBox,
            startX: 0,
            startY: 0
        }
    },
    computed: {
        innerStyle():string {
            const o = { ...this.render };
            o.position = 'relative';
            o.top = o.left = o.right = o.bottom = undefined;
            return rss(EditorNode.getStyle(o));
        },
        outerStyle():string {
            return rss({
                position: this.render.position,
                top: this.render.top,
                left: this.render.left,
                right: this.render.right,
                bottom: this.render.bottom
            });
        },
        selected():boolean {
            return this.selectedNodes.indexOf(this) > -1;
        }
    },
    mounted() {
        this.select();
    },
    methods: {
        panStartDebounce: debounce(function(this:any) {
            this.boundingBox.startLeft = this.boundingBox.left;
            this.boundingBox.startTop = this.boundingBox.top;
        }, 0),
        panStart(e) {
            e.stopPropagation();

            //todo: this needs to be leading-debounced
            if (!e.gesture.srcEvent.shiftKey && this.selectedNodes.length < 2) this.select();
            else pushOne(this.selectedNodes, this);

            this.panStartDebounce(e);
        },
        pan: debounce(function (this: any, { gesture: { deltaX, deltaY } }) {
            this.boundingBox.left = this.boundingBox.startLeft + deltaX;
            this.boundingBox.top = this.boundingBox.startTop + deltaY;
        }, 0),
        select: debounce(function(this:any, e?) {
            if (e == undefined || !e.gesture.srcEvent.shiftKey)
                this.selectedNodes.splice(0, this.selectedNodes.length);

            if (!this.selected) this.selectedNodes.push(this);
            else pullOne(this.selectedNodes, this);
        }, 0)
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
        <div
         class="${ css.canvasContainer }"
         @pan="pan"
         @panstart="panStart"
         @panend="panEnd">
            <div ref="canvas" style="${ rss({
                width: 800,
                height: 600,
                background: 'white',
                centerX: true,
                centerY: true
            }) }">
                <editor-node
                 v-for="(child, index) of parent.children"
                 :render="child"
                 :key="index"/>

                <transform-overlay/>

                <editor-box
                 :color="colorPicked"
                 @input="parent.children.push($event)"
                 v-if="tool === 'rectangle' && pointer.down"/>

                <editor-box
                 class="${ css.selectionBox }"
                 v-if="(tool === 'cursor' || tool === 'transform') && pointer.down"/>
            </div>
        </div>
    `,
    props: {
        colorPicked: String,
        tool: String
    },
    data(){
        return{
            sceneGraph: undefined,
            parent: EditorNode.default(),
            selectedNodes,
            pointer,
            boundingBox
        }
    },
    mounted() {
        const el:HTMLElement = this.$refs.canvas as any;
        this.parent = new EditorNode({
            tagName: el.tagName.toLowerCase(),
            el: el,
            width: el.style.width,
            height: el.style.height,
            left: el.style.left,
            top: el.style.top,
            background: el.style.background,
            position: el.style.position
        });
        this.sceneGraph = this.parent;
    },
    watch: {
        parent(p:EditorNode) {
            pTrans.setDestination(
                0, 0, p.el.clientWidth, 0, p.el.clientWidth, p.el.clientHeight, 0, p.el.clientHeight
            );
        },
        selectedNodes(nodes) {
            if (nodes.length === 0) return;

            let xMin = Infinity, xMax = -Infinity, yMin = Infinity, yMax = -Infinity;
            for (const node of nodes) {
                const bounds = (node.$el as HTMLElement).getBoundingClientRect();
                if (bounds.left < xMin) xMin = bounds.left;
                if (bounds.right > xMax) xMax = bounds.right;
                if (bounds.top < yMin) yMin = bounds.top;
                if (bounds.bottom > yMax) yMax = bounds.bottom;
            }
            const pt0 = pTrans.solve(xMin, yMin), pt2 = pTrans.solve(xMax, yMax);
            this.boundingBox.left = pt0.x, this.boundingBox.top = pt0.y;
            this.boundingBox.width = pt2.x - pt0.x, this.boundingBox.height = pt2.y - pt0.y;
        }
    },
    methods: {
        pan({ gesture: { center } }){
            const pt = pTrans.solve(center.x, center.y);
            this.pointer.deltaX = pt.x - this.pointer.startX;
            this.pointer.deltaY = pt.y - this.pointer.startY;
            this.pointer.quadrant = quadrant(this.pointer.deltaX, this.pointer.deltaY, 0, 0);
        },
        panStart({ gesture: { center } }){
            this.pointer.down = true;

            const v = vertices(this.parent.el);
            pTrans.setSource(v[0].x, v[0].y, v[1].x, v[1].y, v[2].x, v[2].y, v[3].x, v[3].y);

            const pt = pTrans.solve(center.x, center.y);
            this.pointer.startX = pt.x;
            this.pointer.startY = pt.y;
        },
        panEnd(){
            this.pointer.down = false;
        }
    }
}); 

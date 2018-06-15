import Vue from "vue";
import rinss, { rss } from "rinss";
import { quadrant, abs, PerspectiveTransform, Point } from 'ambients-math';
import theme from "./theme";
import { Obj, pullOne } from "ambients-utils";
import Color from 'color';

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
}

function getStyle(child:EditorNode) {
    const { el, children, tagName, ...style } = child;
    return style;
}

const pTrans = new PerspectiveTransform();

function vertices(el: HTMLElement): Array<Point> {
    const b = el.getBoundingClientRect();
    return [
        new Point(b.left, b.top), new Point(b.right, b.top),
        new Point(b.right, b.bottom), new Point(b.left, b.bottom)
    ];
}

const css = rinss.create({
    canvasContainer: {
        width: '100%',
        height: '100%',
        background: theme.background,
        position: 'relative',
        overflow: 'hidden'
    },
    selectionBox: {
        background: theme.primary,
        opacity: 0.3,
        border: '1px solid blue'
    },
    selectionHandle: {
        width: 8,
        height: 8,
        background: 'white',
        border: '1px solid ' + theme.primary,
        position: 'absolute',
        translateX: '-50%',
        translateY: '-50%'
    },
    selectionMask: {
        fillParent: true,
        background: theme.primary
    }
});

const checkedNodes = [];

Vue.component('editor-box', {
    template: `
        <div :style="computedStyle"></div>
    `,
    props: {
        pointer: Object,
        color: String
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
        checkedNodes.splice(0, checkedNodes.length);
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

Vue.component('selection-mask', {
    template: `
        <div class="${ css.selectionMask }">
            <div class="${css.selectionHandle}" style="${rss({ left: 0, top: 0 })}"/>
            <div class="${css.selectionHandle}" style="${rss({ left: '50%', top: 0 })}"/>
            <div class="${css.selectionHandle}" style="${rss({ left: '100%', top: 0 })}"/>
            
            <div class="${css.selectionHandle}" style="${rss({ left: 0, top: '50%' })}"/>
            <div class="${css.selectionHandle}" style="${rss({ left: '100%', top: '50%' })}"/>

            <div class="${css.selectionHandle}" style="${rss({ left: 0, top: '100%' })}"/>
            <div class="${css.selectionHandle}" style="${rss({ left: '50%', top: '100%' })}"/>
            <div class="${css.selectionHandle}" style="${rss({ left: '100%', top: '100%' })}"/>
        </div>
    `
});

Vue.component('node-wrapper', {
    template: `
        <div :style="computedStyle">
            <div v-html="computedHTML"/>
            <selection-mask v-if="checked"/>
        </div>
    `,
    props: {
        render: Object
    },
    data() {
        return {
            checkedNodes
        }
    },
    computed: {
        computedStyle():string {
            return rss({
                left: this.render.left,
                top: this.render.top,
                right: this.render.right,
                bottom: this.render.bottom,
                position: this.render.position
            });
        },
        computedHTML():string {
            const o = { ...this.render };
            o.position = 'relative';
            o.left = o.top = o.right = o.bottom = undefined;
            return `<${o.tagName} style="${ rss(getStyle(o)) }"></${o.tagName}>`
        },
        checked():boolean {
            return this.checkedNodes.indexOf(this) > -1;
        }
    },
    mounted() {
        this.checkedNodes.push(this);
    }
});

Vue.component('editor', {
    template:`
        <v-touch
         class="${ css.canvasContainer }"
         :pan-options="{ direction: 'all', threshold: 0 }"
         @pan="onPan"
         @panstart="panStart"
         @panend="panEnd">
            <div ref="canvas" style="${ rss({
                width: 800,
                height: 600,
                background: 'white',
                centerX: true,
                centerY: true
            }) }">
                <node-wrapper
                 v-for="(child, index) of parent.children"
                 :render="child"
                 :key="index"/>

                <editor-box
                 :pointer="pointer"
                 :color="colorPicked"
                 @input="parent.children.push($event)"
                 v-if="tool === 'rectangle' && pointer.down"/>

                <editor-box
                 class="${ css.selectionBox }"
                 :pointer="pointer"
                 v-if="(tool === 'cursor' || tool === 'transform') && pointer.down"/>
            </div>
        </v-touch>
    `,
    props: {
        colorPicked: String,
        tool: String
    },
    data(){
        return{
            sceneGraph: undefined,
            parent: EditorNode.default(),
            pointer: {
                startX: 0,
                startY: 0,
                x: 0,
                y: 0,
                deltaX: 0,
                deltaY: 0,
                quadrant: 0,
                down: false
            }
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
        parent(p:{ el:HTMLElement, children:Array<Obj<any>> }) {
            pTrans.setDestination(
                0, 0, p.el.clientWidth, 0, p.el.clientWidth, p.el.clientHeight, 0, p.el.clientHeight
            );
        }
    },
    methods : {
        onPan(e){
            const pt = pTrans.solve(e.center.x, e.center.y);
            this.pointer.deltaX = pt.x - this.pointer.startX;
            this.pointer.deltaY = pt.y - this.pointer.startY;
            this.pointer.quadrant = quadrant(this.pointer.deltaX, this.pointer.deltaY, 0, 0);
        },
        panStart(e){
            this.pointer.down = true;

            const v = vertices(this.parent.el);
            pTrans.setSource(v[0].x, v[0].y, v[1].x, v[1].y, v[2].x, v[2].y, v[3].x, v[3].y);

            const pt = pTrans.solve(e.center.x, e.center.y);
            this.pointer.startX = pt.x;
            this.pointer.startY = pt.y;
        },
        panEnd(e){
            this.pointer.down = false;
        }
    }
}); 

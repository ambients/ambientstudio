import Vue from "vue";
import rinss, { rss } from "rinss";
import { quadrant, abs, PerspectiveTransform, Point } from 'ambients-math';
import theme from "./theme";

const css=rinss.create({
    canvasContainer: {
        width: '100%',
        height: '100%',
        background: theme.background,
        position: 'relative',
        overflow: 'hidden'
    },
    canvas: {
        width: 800,
        height: 600,
        background: 'white',
        centerX: true,
        centerY: true
    },
});

Vue.component('editor-box', {
    template: `
        <div v-if="pointer.down" :style="computedStyle"></div>
    `,
    props: {
        pointer: Object
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
                background: theme.primary,
                opacity: 0.3,
                border: '1px solid blue',
                width: width,
                height: height,
                absLeft: x,
                absTop: y
            });
        },
    },
});

const pTrans = new PerspectiveTransform();

function vertices(el:HTMLElement):Array<Point> {
    const b = el.getBoundingClientRect();
    return [
        new Point(b.left, b.top), new Point(b.right, b.top),
        new Point(b.right, b.bottom), new Point(b.left, b.bottom)
    ];
}

Vue.component('whiteboard', {
    template:`
        <v-touch
         class="${ css.canvasContainer }"
         :pan-options="{ direction: 'all', threshold: 0 }"
         @pan="onPan"
         @panstart="panStart"
         @panend="panEnd">
            <div ref="canvas" class="${css.canvas}">
                <editor-box :pointer="pointer"/>
            </div>
        </v-touch>
    `,
    data(){
        return{
            pointer: {
                parent: undefined,
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
        this.pointer.parent = this.$refs.canvas;
    },
    watch: {
        'pointer.parent'(p:HTMLElement) {
            pTrans.setDestination(0, 0, p.clientWidth, 0, p.clientWidth, p.clientHeight, 0, p.clientHeight);
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

            const v = vertices(this.pointer.parent);
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

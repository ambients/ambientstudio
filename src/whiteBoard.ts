import Vue from "vue";
import rinss, { rss } from "rinss";
import { quadrant } from 'ambients-math';
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

Vue.component('white-board', {
    template:`
        <v-touch
         ref="canvasContainer"
         class="${ css.canvasContainer }"
         :pan-options="{ direction: 'all', threshold: 0 }"
         @pan="onPan"
         @panstart="panStart"
         @panend="panEnd">
            <div ref="canvas" class="${css.canvas}">
                <div v-if="showSelectionBox" :style="computedStyle"></div>
            </div>
        </v-touch>
    `,
    data(){
        return{
            startX: 0,
            startY: 0,
            x: 0,
            y: 0,
            deltaX: 0,
            deltaY: 0,
            showSelectionBox: false,
            selectionBoxX: 0,
            selectionBoxXStart: 0,
            selectionBoxY: 0,
            selectionBoxYStart: 0,
            selectionBoxWidth: 0,
            selectionBoxHeight: 0,
        }
    },
    computed :{
        computedStyle():string{
            return rss({
                width: this.selectionBoxWidth,
                height: this.selectionBoxHeight,
                background: 'blue',
                opacity: 0.5,
                absLeft: this.selectionBoxX,
                absTop: this.selectionBoxY
            });
        },
    },
    methods : {
        onPan(e){
            this.deltaX = e.center.x - this.startX;
            this.deltaY = e.center.y - this.startY;

            this.selectionBoxWidth = Math.abs(this.deltaX);
            this.selectionBoxHeight = Math.abs(this.deltaY);

            const q = quadrant(this.deltaX, this.deltaY, 0, 0);

            if (q === 1) {
                this.selectionBoxX = this.selectionBoxXStart;
                this.selectionBoxY = this.selectionBoxYStart - this.selectionBoxHeight;
            }
            else if (q === 2) {
                this.selectionBoxX = this.selectionBoxXStart - this.selectionBoxWidth;
                this.selectionBoxY = this.selectionBoxYStart - this.selectionBoxHeight;
            }
            else if (q === 3) {
                this.selectionBoxX = this.selectionBoxXStart - this.selectionBoxWidth;
                this.selectionBoxY = this.selectionBoxYStart;
            }
            else if (q === 4) {
                this.selectionBoxX = this.selectionBoxXStart;
                this.selectionBoxY = this.selectionBoxYStart;
            }
        },
        panStart(e){
            this.showSelectionBox = true;
            
            this.startX = e.center.x;
            this.startY = e.center.y;

            const canvasBounds = (this.$refs.canvas as any).getBoundingClientRect();
            this.selectionBoxXStart = e.center.x - canvasBounds.x;
            this.selectionBoxYStart = e.center.y - canvasBounds.y;
        },
        panEnd(e){
            this.showSelectionBox=false;
        },
    }
}); 

import Vue from "vue";
import rinss, { rss } from "rinss";

const css=rinss.create({
    canvasContainer: {
        width: '100%',
        height: '100%',
        background: '#cccccc',
        position: 'relative',
        overflow: 'scroll'
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
        <v-touch ref="canvasContainer" class="${ css.canvasContainer }" @pan="onPan" @panstart="panStart" @panend="panEnd">
            <div ref="canvas" class="${css.canvas}">
                <div v-if="showSelectionBox" :style="computedStyle"></div>
            </div>
        </v-touch>
    `,
    data(){
        return{
            showSelectionBox: false,
            selectionBoxX:0,
            selectionBoxY:0,
            selectionBoxWidth:0,
            selectionBoxHeight:0,
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
            this.selectionBoxWidth=Math.abs(e.deltaX);
            this.selectionBoxHeight=Math.abs(e.deltaY);

            let quadrant=1;
            if (e.center.x < this.selectionBoxX && e.center.y < this.selectionBoxY) quadrant = 1;
            else if (e.center.x > this.selectionBoxX && e.center.y < this.selectionBoxY) quadrant = 2;
            else if (e.center.x < this.selectionBoxX && e.center.y > this.selectionBoxY) quadrant = 3;
            else if (e.center.x > this.selectionBoxX && e.center.y > this.selectionBoxY) quadrant = 4;

            console.log(quadrant);
        },
        panStart(e){
            this.showSelectionBox=true;

            const parentBounds = (this.$refs.canvasContainer as any).$el.getBoundingClientRect();
            const childBounds = (this.$refs.canvas as any).getBoundingClientRect();

            const xDiff = childBounds.x - parentBounds.x + 50;
            const yDiff = childBounds.y - parentBounds.y;

            this.selectionBoxX=e.center.x - xDiff;
            this.selectionBoxY=e.center.y - yDiff;
        },
        panEnd(e){
            this.showSelectionBox=false;
        },
    }
}); 

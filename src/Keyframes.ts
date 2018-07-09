import Vue from "vue";
import rinss, {rss} from "rinss";
import theme from './theme';
import './outline';

const css=rinss.create({
    keyframes:{
        background: theme.white,
        display:'grid',
        gridTemplateRows: '40px 1fr',
    },
    header:{
        borderBottom: '2px solid ' + theme.background
    },
    keyframesContainer: {
        display: 'grid',
        gridTemplateColumns: '100px 1fr'
    },
    timeline:{
        height: 20,
        width: '100%',
        floatTop:0,
        borderBottom: '1px solid '+ theme.background
    },
    timelineBar:{
        left: 100,
        width: 100,
        height: '100%',
        background: 'red',
    },
});

Vue.component('KeyframesContainer',{
    template:`
        <div class="${ css.keyframesContainer }">
            <div >
                <outline-row v-for="layer of layers" style="${rss({borderBottom:'1px solid ' + theme.background, height: 20})}">
                    Stuff
                </outline-row>
            </div>
            <div style="${rss({borderLeft:'1px solid ' + theme.background, })}">
                <div class="${ css.timeline }" v-for="layer of layers" >
                    <div class="${css.timelineBar}"></div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            layers: [
                { name: '1' },
                { name: '2' },
                { name: '3' },
                { name: '4' },
            ]
        };
    }
});

Vue.component('Keyframes',{
    template:`
        <div class="${css.keyframes}">
            <div class="${css.header}"></div>
            <KeyframesContainer/>
        </div>
    `
});
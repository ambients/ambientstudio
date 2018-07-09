import Vue from "vue";
import rinss, {rss} from "rinss";
import theme from './theme';
import processSvg from './processSvg';
import './outline';
import { randomColor } from "../node_modules/ambients-utils";

const magnifier = processSvg(require('./icons/magnifier.svg'));
const add = processSvg(require('./icons/plus.svg'));
const trash = processSvg(require('./icons/delete.svg'));

const css=rinss.create({
    keyframes:{
        background: theme.white,
        display:'grid',
        gridTemplateRows: '20px 1fr',
    },
    header:{
        borderBottom: '2px solid ' + theme.background,
        display:'grid',
        gridTemplateColumns: '200px 1fr'
    },
    keyframesContainer: {
        display: 'grid',
        gridTemplateColumns: '200px 1fr'
    },
    timeline:{
        height: 20,
        width: '100%',
        floatTop:0,
        borderBottom: '1px solid '+ theme.background
    },
    anim:{
        width: 100,
        height: '100%',
        background: 'red',
        borderRadius: 5
    },
    animHandle: {
        width: 8,
        height: 8,
        borderRadius: '100%',
        border: '1px solid blue',
        background: 'white',
        centerY: true,
        translateX: '-50%'
    },
    searchBar:{
        height:15,
        background: theme.background,
        borderRadius: 12,
        paddingLeft: 5,
        floatLeft:5
    },
    timelineRuler:{
        width: '100%',
        height: 20,
        whiteSpace: 'nowrap',
    },
    searchInput:{
        floatLeft:0,
        width: 100,
        height: '100%',
        background: 'none',
        placeholder:'search',
        border:'none',
    },
    rulerSegment:{
        width: 100,
        height: '100%',
        background: theme.background,
        floatLeft: 0
    },
});

Vue.component('KeyframesContainer',{
    template:`
        <div class="${ css.keyframesContainer }">
            <div >
                <outline-row
                 v-for="layer of layers"
                 style="${rss({borderBottom:'1px solid ' + theme.background, height: 20})}">
                    {{ layer.name }}
                </outline-row>
            </div>
            <div style="${rss({borderLeft:'1px solid ' + theme.background, })}">
                <div class="${ css.timeline }" v-for="layer of layers">
                    <div class="${css.anim}">
                        <div class="${ css.animHandle }"/>
                        <div class="${ css.animHandle }" style="left:100%"/>
                    </div>
                </div>
            </div>
        </div>
    `,
    props: {
        layers: Array
    }
});

Vue.component('RulerSegment', {
    template: `
        <div class="${css.rulerSegment}">
            <div style="${ rss({ floatLeft: 0, width: 0, fontSize: 10, marginTop: 5}) }">00:00</div>
            <div style="${rss({ height: '25%', floatLeft: '24%', borderLeft: '1px solid black' })}"/>
            <div style="${rss({ height: '50%', floatLeft: '24%', borderLeft: '1px solid black' })}"/>
            <div style="${rss({ height: '25%', floatLeft: '24%', borderLeft: '1px solid black' })}"/>
            <div style="${rss({ height: '100%', floatLeft: '24%', borderLeft: '1px solid black' })}"/>
        </div>
    `

});

Vue.component('TimelineRuler', {
    template: `
        <div class="${css.timelineRuler}">
            <RulerSegment/>
            <RulerSegment/>
            <RulerSegment/>
            <RulerSegment/>
            <RulerSegment/>
            <RulerSegment/>
        </div>
    `
});

Vue.component('Keyframes',{
    template:`
        <div class="${css.keyframes}">
            <div class="${css.header}">
                <div>
                    <div class="${css.searchBar}">
                        <icon style = "${rss({floatLeft:0})}" size="15px">
                            ${magnifier}
                        </icon>
                        <input class="${css.searchInput}"></input>
                    </div>
                    <icon style="${rss({floatRight: 5})}" size="15px" @click.native="add">
                        ${add}
                    </icon>
                    <icon style="${rss({floatRight: 5})}" size="15px">
                        ${trash}
                    </icon>
                </div>
                <TimelineRuler/>
            </div>
            <KeyframesContainer :layers="layers"/>
        </div>
    `,
    data() {
        return {
            layers: []
        };
    },
    methods: {
        add() {
            this.layers.push({ name: randomColor() });
        }
    }
});
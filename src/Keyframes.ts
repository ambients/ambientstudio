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
    timeline:{
        height: 20,
        width: '100%',
        floatTop:0,
        
    }
});

Vue.component('KeyframesContainer',{
    template:`
        <div>
            <div >
                <outline-row v-for="layer of layers" style="${rss({borderBottom:'1px solid ' + theme.background, })}"/>
            </div>
            <div style="${rss({borderLeft:'1px solid ' + theme.background, })}">
                <div class="${ css.timeline }" v-for="layer of layers" >
                    <div style="${rss({left:100, background:'red', width:100, height:'100%'})}"></div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            layers: [
                { name: 'hyunki' },
                { name: 'hyunki' },
                { name: 'hyunki' },
                { name: 'hyunki' },
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
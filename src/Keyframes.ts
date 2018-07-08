import Vue from "vue";
import rinss from "rinss";
import theme from './theme';
import './outline';

const css=rinss.create({
    keyframes:{
        background: theme.white,
        display:'grid',
        gridTemplateRows: '40px 1fr',
    },
    header:{
        borderBottom: '3px solid ' + theme.background
    },
    keys:{
        height: 40,
        width:'100%',
        border: '1px solid ' + theme.background,

    },
    square:{
        height: 30,
        width: 30,
        floatLeft:0,
    },
    elementName:{
        floatLeft:0,

    },
    keyframesContainer:{
        display:'grid',
        gridTemplateColumns:'100px 1fr',
    },
    timeline:{
        height: 40,
        width: '100%',
        borderBottom: '1px solid black',
        floatTop:0,
    }
});

Vue.component('KeyframesContainer',{
    template:`
        <div class="${ css.keyframesContainer }">
            <div>
                <outline-row v-for="layer of layers"/>
            </div>
            <div>
                <div class="${ css.timeline }" v-for="layer of layers"></div>
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
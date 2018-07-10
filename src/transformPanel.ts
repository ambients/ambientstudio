import Vue from "vue";
import rinss from "rinss";
import "./panels";
import theme from "./theme";
import './row';
import {rss} from "rinss";

const iconholder = require("./icons/placeholder.svg");
const css = rinss.create({
    separator: {
        width: '100%',
        height: 0,
        borderBottom: '1px solid ' + theme.background,
        floatTop: 0,
        marginBottom: 10,
        marginTop: 5
    },
    translate:{
        floatTop:0,
        width:'100%',
        display:'grid',
        gridTemplateColumns:'1fr 10px 1fr 10px 1fr',
    },
    scale:{
        floatTop:0,
        width:'100%',
        display:'grid',
        gridTemplateColumns:'1fr 10px 1fr',
    },
});

Vue.component('transform-panel',{
    template:`
    <panel title="Transform" expanded>
        <div class="${css.translate}">
            <material-input placeholder="Trans. X"/>
            <div/>
            <material-input placeholder="Trans. Y"/>
            <div/>
            <material-input placeholder="Trans. Z"/>
        </div>
        <div class="${css.scale}">
            <material-input placeholder="Scale X"/>
            <div/>
            <material-input placeholder="Scale Y"/>
        </div>

        <div class="${ css.separator }"></div>

        <div class="${css.translate}">
            <material-input placeholder="Rotate X"/>
            <div/>
            <material-input placeholder="Rotate Y"/>
            <div/>
            <material-input placeholder="Rotate Z"/>
        </div>
        <div class="${css.scale}">
            <material-input placeholder="Skew X"/>
            <div/>
            <material-input placeholder="Skew Y"/>
        </div>
    </panel>
    `
});
import Vue from "vue";
import { rinss } from "rinss";
import "./panels";
import {theme} from "./theme";

const iconholder = require("./icons/placeholder.svg");
const css = rinss.create({
    transformIcon:{
        width: 20,
        height: 20
    },
    transformRow:{
        display:'flex',
        width:'100%',
        floatTop:5,
    },
    transformInputs:{
        flex: '1 1 auto',
        display:'flex',
        width:'33%',
        background: theme.background,
        border:'none',
    },
    transformInput:{
        flex:'1 1 auto',
        width:'100%',
        background: 'none',
    },
});

Vue.component('transform-icon',{
    template:`
        <div class="${css.transformIcon}"><slot></slot></div>
    `
});

Vue.component('transform-panel',{
    template:`
    <panel title="transform" expanded>
        <div class="${css.transformRow}">
            <div class="${css.transformInputs}">
                <transform-icon>${ iconholder }</transform-icon>
                <input class="${css.transformInput}" placeholder="  transformX"></input>
            </div>
            <div class="${css.transformInputs}">
                <transform-icon>${ iconholder }</transform-icon>
                <input class="${css.transformInput}" placeholder="  transformX"></input>
            </div>
        </div>
    </panel>
    `
});
import Vue from "vue";
import rinss from "rinss";
import "./panels";
import theme from "./theme";

const iconholder = require("./icons/placeholder.svg");
const css = rinss.create({
    transformIcon:{
        width: 20,
        height: 20
    },
    transformRow:{
        display:'flex',
        width:'100%',
        floatTop:0,
        marginBottom:5
    },
    transformInputs:{
        flex: '1 1 auto',
        display:'flex',
        width:'33%',
        background: theme.background,
        ':not(:first-child)': {
            marginLeft: 5
        }
    },
    transformInput:{
        flex:'1 1 auto',
        width:'100%',
        background: 'none',
        border:'none',
    },
    separator: {
        width: '100%',
        height: 0,
        borderBottom: '1px solid ' + theme.background,
        floatTop: 0,
        marginBottom: 10,
        marginTop: 5
    },
});

Vue.component('transform-icon',{
    template:`
        <div class="${css.transformIcon}"><slot></slot></div>
    `
});

Vue.component('transform-panel',{
    template:`
    <panel title="Transform" expanded>
        <div class="${css.transformRow}">
            <div class="${css.transformInputs}">
                <transform-icon>${ iconholder }</transform-icon>
                <input class="${css.transformInput}" placeholder="  trans.X"></input>
            </div>
            <div class="${css.transformInputs}">
                <transform-icon>${ iconholder }</transform-icon>
                <input class="${css.transformInput}" placeholder="  trans.Y"></input>
            </div>
            <div class="${css.transformInputs}">
                <transform-icon>${ iconholder }</transform-icon>
                <input class="${css.transformInput}" placeholder="  trans.Z"></input>
            </div>
        </div>

        <div class="${css.transformRow}">
            <div class="${css.transformInputs}">
                <transform-icon>${ iconholder }</transform-icon>
                <input class="${css.transformInput}" placeholder="  scaleX"></input>
            </div>
            <div class="${css.transformInputs}">
                <transform-icon>${ iconholder }</transform-icon>
                <input class="${css.transformInput}" placeholder="  scaleY"></input>
            </div>
        </div>

        <div class="${ css.separator }"></div>


        <div class="${css.transformRow}">
            <div class="${css.transformInputs}">
                <transform-icon>${ iconholder }</transform-icon>
                <input class="${css.transformInput}" placeholder="  rotateX"></input>
            </div>
            <div class="${css.transformInputs}">
                <transform-icon>${ iconholder }</transform-icon>
                <input class="${css.transformInput}" placeholder="  rotateY"></input>
            </div>
            <div class="${css.transformInputs}">
                <transform-icon>${ iconholder }</transform-icon>
                <input class="${css.transformInput}" placeholder="  rotateZ"></input>
            </div>
        </div>

        <div class="${css.transformRow}">
            <div class="${css.transformInputs}">
                <transform-icon>${ iconholder }</transform-icon>
                <input class="${css.transformInput}" placeholder="  skewX"></input>
            </div>
            <div class="${css.transformInputs}">
                <transform-icon>${ iconholder }</transform-icon>
                <input class="${css.transformInput}" placeholder="  skewY"></input>
            </div>
        </div>
    </panel>
    `
});
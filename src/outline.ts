import Vue from "vue";
import rinss from "rinss";
import processSvg from "./processSvg";
import theme from "./theme";

const visibility= processSvg(require('./icons/visibility.svg'));
const lock= processSvg(require('./icons/lock.svg'));
const placeholder = processSvg(require('./icons/placeholder.svg'));

const css=rinss.create({
    outline:{
        background: theme.white,
        width: 200,
        height:'100%',
        paddingLeft:5,
        borderRight: '3px solid ' + theme.background
    },
    outlineRow:{
        floatTop:0,
        height:20,
        width:'100%',
        marginTop:10,
    },
    tabs:{
        width:20,
        height:20,
        floatLeft:0,
        margin:1
    },
    elementName:{
        floatLeft:0,
    },
    separator: {
        width: '100%',
        height: 0,
        borderBottom: '1px solid ' + theme.background,
        floatTop: 0,
        marginTop:10,
    },
});

Vue.component('outline-header',{
    template:`
        <div class="${css.outlineRow}">
            <div class="${css.tabs}">${visibility}</div>
            <div class="${css.tabs}">${lock}</div>
        </div>
    `
});

Vue.component('outline-row',{
    template:`
        <div class="${css.outlineRow}">
            <div class="${css.tabs}">${visibility}</div>
            <div class="${css.tabs}">${lock}</div>
            <div class="${css.tabs}">${placeholder}</div>
            <div class="${css.elementName}"><slot></slot></div>
        </div>
    `
});

Vue.component('outline',{
    template:`
        <div class="${css.outline}">
            <outline-header></outline-header>
            <div class="${ css.separator }"></div>
            <outline-row>whatever</outline-row>
            <outline-row>whatever</outline-row>
            <outline-row>whatever</outline-row>
        </div>
    `
});
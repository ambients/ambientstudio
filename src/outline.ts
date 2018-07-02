import Vue from "vue";
import {rss} from "rinss";
import rinss from "rinss";
import processSvg from "./processSvg";
import theme from "./theme";
import './row';
import Radio from "./radio";

const visibility= processSvg(require('./icons/visibility.svg'));
const visibilityFilled=processSvg(require('./icons/visibility-filled.svg'));
const lock= processSvg(require('./icons/lock.svg'));
const lockFilled=processSvg(require('./icons/lock-filled.svg'));
const placeholder = processSvg(require('./icons/placeholder.svg'));
const placeholderFilled = processSvg(require('./icons/placeholder-filled.svg'));

const css=rinss.create({
    outline:{
        background: theme.white,
        width: '100%',
        paddingLeft:5,
        borderRight: '3px solid ' + theme.background,
        userSelect:'none'
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

Vue.component('outline-row',{
    mixins: [Radio],
    template:`
        <row stretch style="${ rss({floatTop:0})}">
            <cell shrink><icon @click.native="check" name="visibility" :active="isChecked" style="cursor:pointer">
                ${visibility}
                ${visibilityFilled}
            </icon></cell>
            <cell shrink><icon @click.native="check" name="lock" :active="isChecked" style="cursor:pointer">
                ${lock}
                ${lockFilled}
            </icon></cell>
            <cell shrink><icon style="cursor:pointer;">
                ${placeholder}
                ${placeholderFilled}
            </icon></cell>
            <cell align="left"> <div class="${css.elementName}"><slot></slot></div></cell>
        </row>
    `
});

Vue.component('outline',{
    template:`
        <div class="${css.outline}">
            <outline-row style="${ rss({marginTop:10})}"></outline-row>
            <div class="${ css.separator }" style="${rss({marginBottom:10})}"></div>
            <outline-row>whatever</outline-row>
            <outline-row>whatever</outline-row>
            <outline-row>whatever</outline-row>
        </div>
    `
});
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
});

Vue.component('transform-panel',{
    template:`
    <panel title="Transform" expanded>
        <row stretch style="${rss({ floatTop:0})}">
            <cell><material-input placeholder="Trans. X"/></cell>
            <gap/>
            <cell><material-input placeholder="Trans. Y"/></cell>
            <gap/>
            <cell><material-input placeholder="Trans. Z"/></cell>
        </row>
        <row stretch style="${rss({ floatTop:0})}">
            <cell><material-input placeholder="Scale X"/></cell>
            <gap/>
            <cell><material-input placeholder="Scale Y"/></cell>
        </row>

        <div class="${ css.separator }"></div>

        <row stretch style="${rss({ floatTop:0})}">
            <cell><material-input placeholder="Rotate X"/></cell>
            <gap/>
            <cell><material-input placeholder="Rotate Y"/></cell>
            <gap/>
            <cell><material-input placeholder="Rotate Z"/></cell>
        </row>
        <row stretch style="${rss({ floatTop:0})}">
            <cell><material-input placeholder="Skew X"/></cell>
            <gap/>
            <cell><material-input placeholder="Skew Y"/></cell>
        </row>
    </panel>
    `
});
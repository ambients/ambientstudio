import Vue from "vue";
import { rinss } from "rinss";
import "./panels";
import "./materialInput";
import { theme } from './theme';
import { processSvg } from './processSvg';

const topSVG = processSvg(require("./icons/align-top.svg"));
const middleSVG = processSvg(require("./icons/align-middle.svg"));
const bottomSVG = processSvg(require("./icons/align-bottom.svg"));

const css = rinss.create({
    positionButtonsTable: {
        width: '100%',
        floatTop: 0
    },
    positionButton: {
        width: 20,
        height: 20,
        cursor: 'pointer'
    },
    inputs: {
        display: 'flex',
        floatTop: 0,
        width: '100%'
    },
    input: {
        flex: '1 1 auto',
        ':not(:first-child)': {
            marginLeft: 10
        }
    }
});

Vue.component('position-button', {
    template: `
        <div class="${ css.positionButton }" :style="getStyle()" @click="toggleSelected()">
            <slot></slot>
        </div>
    `,
    props: {
        rotated: Boolean,
        icon: String
    },
    data: function() { return {
        selected: false
    }},
    methods: {
        getStyle: function():string {
            return rinss.compile({
                rotate: this.rotated ? -90 : 0,
                color: this.selected ? theme.primary : theme.textPrimary
            });
        },
        toggleSelected: function():void {
            this.selected = !this.selected;
        }
    }
});

Vue.component('position-panel', {
    template: `
        <panel title="Position" expanded>
            <table class="${ css.positionButtonsTable }">
                <tr>
                    <td align="center"><position-button name="v0">${ topSVG }</position-button></td>
                    <td align="center"><position-button name="v1">${ middleSVG }</position-button></td>
                    <td align="center"><position-button name="v2">${ bottomSVG }</position-button></td>
                    <td align="center"><position-button rotated name="h0">${ topSVG }</position-button></td>
                    <td align="center"><position-button rotated name="h1">${ middleSVG }</position-button></td>
                    <td align="center"><position-button rotated name="h2">${ bottomSVG }</position-button></td>
                </tr>
            </table>
            <div class="${ css.inputs }">
                <material-input class="${ css.input }">Left</material-input>
                <material-input class="${ css.input }">Right</material-input>
            </div>
            <div class="${ css.inputs}">
                <material-input class="${ css.input}">Top</material-input>
                <material-input class="${ css.input }">Bottom</material-input>
            </div>
        </panel>
    `
});
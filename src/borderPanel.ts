import Vue from "vue";
import { rinss } from "rinss";
import "./panels";
import {theme} from "./theme";
import { processSvg } from './processSvg';

const borderTopRight = processSvg(require('./icons/border-top-right.svg'));
const borderTop = processSvg(require('./icons/border-top.svg'));

const css = rinss.create({
    borderIcon:{
        widith:20,
        height:20,
        cursor: 'pointer',
    },
    borderIconTable:{
        floatTop: 0,
        width: '100%',
        border:'1px solid black'
    },
});

Vue.component('border-icon',{
    template:`
        <div class="${css.borderIcon}"><slot></slot></div>
    `
});

Vue.component('border-panel',{
    template:`
    <panel title="Border" expanded>
        <div>
            <table class="${css.borderIconTable}">
                <tr>
                    <td align="center"><border-icon>${borderTopRight}</border-icon></td>
                    <td align="center"><border-icon>${borderTopRight}</border-icon></td>
                </tr>
                <tr>
                    <td align="center"><border-icon>${borderTopRight}</border-icon></td>
                    <td align="center"><border-icon>${borderTopRight}</border-icon></td>
                </tr>
            </table>
        </div>

    </panel>
    `
});
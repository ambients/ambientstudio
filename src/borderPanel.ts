import Vue from "vue";
import { rinss } from "rinss";
import "./panels";
import {theme} from "./theme";
import { processSvg } from './processSvg';

const borderTopRight = processSvg(require('./icons/border-top-right.svg'));
const borderTop = processSvg(require('./icons/border-top.svg'));
const colorPalette = require('./icons/font-color.svg');
const borderThickness = require('./icons/thickness.svg');
const borderLine = require('./icons/line.svg');

const css = rinss.create({
    borderIcon:{
        width:40,
        height:40,
        cursor: 'pointer',
        margin: 5,    
    },
    borderRow:{
        floatTop: 0,
        display:'flex',
        width: '100%'
    },
    borderOptions:{
        width:'100%',
        flex:'1 1 auto',
        marginLeft:20
    },
    borderStyle:{
        width:'100%',
        display: 'flex',
        floatTop:0,
    },
    borderInputStyle:{
        width:'100%',
        flex: '1 1 auto',
        display: 'flex',
        background: theme.background,
    },
    borderThickness:{
        flex:'1 1 auto',
        width:'100%',
        display:'flex'
    },
    inputIcons:{
        width:20,
        height:20,
        marginLeft:5
    },
    borderThicknessInput:{
        flex:'1 1 auto',
        width:'100%',
        border: 'none',
        background: 'none'
    },
    borderType:{
        width:'100%',
        floatTop:0,
        display:'flex',
    },
    borderTypeTable:{

    },
    separator: {
        width: '100%',
        height: 0,
        borderBottom: '1px solid ' + theme.background,
        floatTop: 0,
        marginBottom: 10
    }
});

Vue.component('border-icon',{
    template:`
        <div class="${css.borderIcon}"><slot></slot></div>
    `
});
Vue.component('input-icon',{
    template:`
        <div class="${css.inputIcons}"><slot></slot></div>
    `
});
Vue.component('border-card',{
    template:`
        <div class="${css.borderRow}">
            <border-icon><slot></slot></border-icon>
            <div class="${css.borderOptions}">
                <div class="${css.borderStyle}">
                    <div class="${css.borderInputStyle}">
                        <div class="${css.borderThickness}">
                            <input-icon>${borderThickness}</input-icon>
                            <input class="${css.borderThicknessInput}" placeholder=" border thickness"></input>
                        </div>
                    </div>
                    <input-icon>${colorPalette}</input-icon>
                </div>
                <div class="${css.borderType}">
                    <table class="${css.borderTypeTable}">
                        <tr>
                            <td align="center">none</td>
                            <td align="center"><input-icon>${borderLine}</input-icon></td>
                            <td align="center"><input-icon>${borderLine}</input-icon></td>
                            <td align="center"><input-icon>${borderLine}</input-icon></td>
                            <td align="center"><input-icon>${borderLine}</input-icon></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    `
});

Vue.component('border-panel',{
    template:`
    <panel title="Border" expanded>
        <border-card>${borderTopRight}</border-card>
        <border-card>${borderTopRight}</border-card>
        <border-card>${borderTopRight}</border-card>
        <border-card>${borderTopRight}</border-card>
        
        <div class="${ css.separator }"></div>

        <border-card>${borderTopRight}</border-card>
        <border-card>${borderTopRight}</border-card>
        <border-card>${borderTopRight}</border-card>
        <border-card>${borderTopRight}</border-card>
        
    </panel>
    `
});
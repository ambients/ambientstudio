import Vue from "vue";
import { rinss } from "rinss";
import "./panels";
import {theme} from "./theme";

const css = rinss.create({
    fontRow: {
        display: 'flex',
        floatTop: 5,
        width: '100%'
    },
    fontType:{
        width: '70%',
        flex: '1 1 auto',
        display: 'flex',
        background: theme.background,
    },
    fontMenuInput: {
        border: 'none',
        flex: '1 1 auto',
        fontsize: 10,
        background:'transparent',
        overflow:'hidden'
    },
    dropdown: {
        width: 10,
        height: 10,
        flex: '1 1 auto'
    },
    what: {
        flow: '1 1 auto',
        height: 20,
        width: '40%',
        marginLeft: 10,
        border:'none',
        background:  theme.background,
        fontsize:10
    },
    fontSize: {
        flex:'1 1 auto',
        display:'flex',
        background: theme.background
    },
    fontSpacing: {
        marginLeft: 10
    },
    fontInput: {
        background: 'transparent',
        border: 'none',
        width: '100%',
        flex: '1 1 auto',
        fontsize: 10
    },
    fontIcon: {
        width: 20,
        height:20,
        background: "transparent"
    },
    fontStyles:{
        flex: '1 1 auto',
        display: 'flex',
        background:  theme.background,
        marginLeft: 10
    },
    fontStyle:{
        flex: '1 1 auto',
        width: 20,
        height: 20,
        background: 'none'
    },
    separator: {
        width: '100%',
        height: 0,
        borderBottom: '1px solid ' + theme.background,
        floatTop: 5
    },
    alignment: {
        width:'50%'
    },
    alignTable: {
        width: '100%'
    }
});

Vue.component('typography-panel',{
    template: `
    <panel title="Typography" expanded>
        <div class="${css.fontRow}">
            <div class="${css.fontType}">
                <input class="${css.fontMenuInput}" placeholder="font" list="font-data"></input>
                <datalist id="font-data">
                    <option>Arial</option>
                    <option>Helvetica</option>
                </datalist>
            </div>
            <select class="${css.what}">
                <option>Bold</option>
                <option>Bolder</option>
                <option>Normal</option>
                <option>Lighter</option>
                <option>Light</option>
            </select>
        </div>
        <div class="${css.fontRow}">
            <div class="${css.fontSize}">
                <div class="${css.fontIcon}">
                    <img src="icons/font-size.svg"></img>
                </div>
                <input class="${css.fontInput}" placeholder="  font size"></input>
            </div>
            <div class="${css.fontSize} ${css.fontSpacing}">
                <div class="${css.fontIcon}">
                    <img src="icons/font-spacing.svg"></img>
                </div>
                <input class="${css.fontInput}" placeholder="  line hight"></input>
            </div>
        </div>
        <div class="${css.fontRow}">
            <div class="${css.fontType}">
                <div class="${css.dropdown}"><img src="icons/font-color.svg"></img></div>
                <input class="${css.fontMenuInput}" placeholder="  font color"></input>
            </div>
            <div class="${css.fontStyles}">
                <div class="${css.fontStyle}"><img src="icons/italic.svg"></img></div>
                <div class="${css.fontStyle}"><img src="icons/bold.svg"></img></div>
                <div class="${css.fontStyle}"><img src="icons/underline.svg"></img></div>
            </div>
        </div>
        <div class="${ css.separator }"></div>


        <table class="${css.alignTable}">
            <tr>
                <td align="center"><img class="${ css.fontIcon }" src="icons/font-align-left.svg"></img></td>
                <td align="center"><img class="${ css.fontIcon }" src="icons/font-align-center.svg"></img></td>
                <td align="center"><img class="${ css.fontIcon }" src="icons/font-align-right.svg"></img></td>
                <td align="center"><img class="${ css.fontIcon }" src="icons/font-align-justify.svg"></img></td>
            </tr>
        </table>
    </panel>
    `
});
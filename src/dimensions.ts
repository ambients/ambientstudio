import Vue from "vue";
import { rinss } from "rinss";
import "./panels";

const css = rinss.create({
    inputs: {
        width: '100%',
        floatTop: 10
    },
    input: {
        width: 40,
        height: 20,
        overflow: "hidden"
    },
    dimensions: {
        centerX: true,
        floatTop: 1,
        borderBottom: "1px solid rgb(228,228,228)"
    },
    dimension: {
        floatLeft: 0,
        width: 40,
        margin: 1,
        border: "1px solid black"
    },
    dimensionTable: {
        borderBottom: "1px solid rgb(228,228,228)",
        width: "100%"
    },
    paddingSection: {
        height: 70,
        floatTop: 10,
        centerX: true
    },
    paddingTable: {
        floatLeft: 0
    },
    paddingInput: {
        floatLeft: 10,
        centerY: true,
        width: 80
    },
    paddingGrid: {
        width: 20,
        height: 20,
        border: "1px solid black",
    }
});

Vue.component('dimensions-panel',{
    template: `
    <panel title="Dimensions" expanded>
        <table class="${ css.dimensionTable }">
            <tr>
                <td align="center">
                    <input class="${css.input}" placeholder="width" v-model="widthRendered"></input>
                </td>
                <td align="center">
                    <input class="${css.input}" placeholder="height" v-model="heightRendered"></input>
                </td>
             </tr>
             <tr>
                <td align="center">
                    <input class="${css.input}" placeholder="none"></input>
                </td>
                <td align="center">
                    <input class="${css.input}" placeholder="none"></input>
                </td>
            </tr>
            <tr>
                <td align="center">
                    <div class="${css.input}">{{widthRendered}}</div>
                </td>
                <td aligh="center">
                    <div class="${css.input}">{{heightRendered}}</div>
                </td>
            </tr>
        </table>
        <div class="${css.paddingSection}">
            <table class="${css.paddingTable}">
                <tr>
                    <td class="${css.paddingGrid}"></td><td class="${css.paddingGrid}"></td><td class="${css.paddingGrid}"></td>
                </tr>
                <tr>
                    <td class="${css.paddingGrid}"></td><td class="${css.paddingGrid}"></td><td class="${css.paddingGrid}"></td>
                </tr>
                <tr>
                    <td class="${css.paddingGrid}"></td><td class="${css.paddingGrid}"></td><td class="${css.paddingGrid}"></td>
                </tr>
            </table>
            <input class="${css.paddingInput}"></input>
        </div>   
    </panel>
    `,
    data: function() {
        return {
            widthRendered: '',
            heightRendered: ''
        }
    }
});
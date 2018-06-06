import Vue from "vue";
import { rinss } from "rinss";
import "./panels";
import "./materialInput";

const css = rinss.create({
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
    },
    alignmentButtons: {
        centerX: true,
        floatTop: 10,
    },
    horizontalButtons: {
        floatLeft: 0,
        borderRight: "1px solid rgb(228,228,228)",
    },
    verticalButtons: {
        floatLeft: 0,
        borderLeft: "1px solid rgb(228,228,228)",
    },
    alignmentButton: {
        border: "1px solid black",
        width: 15,
        height: 15,
        floatLeft: 0
    }
});

Vue.component('alignment-panel', {
    template: `
        <panel title="Alignment" expanded>
            <div class="${ css.inputs }">
                <material-input class="${ css.input }">Left</material-input>
                <material-input class="${ css.input }">Right</material-input>
            </div>
            <div class="${ css.inputs}">
                <material-input class="${ css.input}">Top</material-input>
                <material-input class="${ css.input }">Bottom</material-input>
            </div>
            <div class="${ css.alignmentButtons }">
                <div class="${ css.horizontalButtons }">
                    <div class="${ css.alignmentButton }"></div>
                    <div class="${ css.alignmentButton }"></div>
                    <div class="${ css.alignmentButton }"></div>
                </div>
                <div class="${ css.verticalButtons }">
                    <div class="${ css.alignmentButton }"></div>
                    <div class="${ css.alignmentButton }"></div>
                    <div class="${ css.alignmentButton }"></div>
                </div>
            </div>
        </panel>
    `
});
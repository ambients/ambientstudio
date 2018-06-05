import Vue from "vue";
import { rinss } from "rinss";
import "./panels";

const css = rinss.create({
    input: {
        floatLeft: 10,
        width: '40%',
    },
    inputs: {
        floatTop: 0
    },
    label: {
        fontSize: 13,
        important: true
    },
    wrap: {
        width: 80
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

Vue.component('wrap-input', {
    template: `
        <div class="${ css.wrap }">
            <md-field>
                <label class="${ css.label }"><slot></slot></label>
                <md-input></md-input>
            </md-field>
        </div>
    `
});

Vue.component('alignment-panel', {
    template: `
        <panel title="Alignment">
            <div class="${ css.inputs }">
                <wrap-input class="${ css.input }">left</wrap-input>
                <wrap-input class="${ css.input }">right</wrap-input>
            </div>
            <div class="${ css.inputs }">
                <wrap-input class="${ css.input }">top</wrap-input>
                <wrap-input class="${ css.input }">bottom</wrap-input>
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
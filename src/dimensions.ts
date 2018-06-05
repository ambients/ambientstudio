import Vue from "vue";
import { rinss } from "rinss";
import "./panels";

const css = rinss.create({
    inputs: {
        centerX: true,
        floatTop: 10
    },
    input: {
        floatLeft: 0,
        margin: 1,
        width: 40
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
    }
});

Vue.component('dimensions-panel',{
    template: `
    <panel title="Dimensions">
        <div class="${ css.inputs }">
            <input class="${css.input}" placeholder="width" v-model="widthRendered"></input>
            <input class="${css.input}" placeholder="height" v-model="heightRendered"></input>
        </div>
        <div class="${ css.dimensions }">
            <div class="${css.dimension}">{{ widthRendered }}</div>
            <div class="${css.dimension}">{{ heightRendered }}</div>
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
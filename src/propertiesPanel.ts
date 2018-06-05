import Vue from "vue";
import { rinss } from "rinss";
import "./panels";

const css = rinss.create({
    label: {
        fontSize: 13,
        important: true
    }
});

Vue.component('properties-panel', {
    template: `
        <panel title="Properties" expanded>
            <md-field>
                <label class="${ css.label }">Element id</label>
                <md-input></md-input>
            </md-field>
            <md-field>
                <label class="${ css.label }">Element class</label>
                <md-input></md-input>
            </md-field>
        </panel>
    `
});
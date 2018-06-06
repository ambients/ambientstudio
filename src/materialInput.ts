import Vue from "vue";
import { rinss } from "rinss";

const css = rinss.create({
    label: {
        fontSize: 13,
        important: true
    },
    wrapper: {
        width: 50
    },
});

Vue.component('material-input', {
    template: `
        <div class="${ css.wrapper }">
            <md-field>
                <label class="${ css.label }"><slot></slot></label>
                <md-input></md-input>
            </md-field>
        </div>
    `
});
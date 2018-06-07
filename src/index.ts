import "normalize.css";
import Vue from "vue";
import { rinss } from "rinss";

import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import 'vue-material/dist/theme/default.css';

import "./panels";
import "./propertiesPanel";
import "./positionPanel";
import "./dimensionsPanel";
import "./typographyPanel";
import "./toolbar";

Vue.use(VueMaterial);
rinss.config({ duration: 250 });

const container = document.createElement('div');
document.body.appendChild(container);
container.id = 'container';

rinss.inline(document.body, {
    overflow: 'hidden',
    fontFamily: '"Arial", "sans-serif"'
});

const css = rinss.create({
    stage: {
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0
    },
    test: {
        width: 100,
        height: 100,
        background: 'red',
        floatTop: 10
    }
});

new Vue({
    template: `
        <div class="${ css.stage }">
            <panels>
                <properties-panel></properties-panel>
                <position-panel></position-panel>
                <dimensions-panel></dimensions-panel>
                <typography-panel></typography-panel>
                <panel title="Backgrounds"></panel>
                <panel title="Effects"></panel>
            </panels>
            <toolbar></toolbar>
        </div>
    `
}).$mount('#container');
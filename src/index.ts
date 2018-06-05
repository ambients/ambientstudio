import "normalize.css";
import Vue from "vue";
import { rinss } from "rinss";

import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import 'vue-material/dist/theme/default.css';
Vue.use(VueMaterial);

import "./panels";
import "./propertiesPanel";
import "./alignmentPanel";
import "./toolbar";
import "./dimensions";

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
                <alignment-panel></alignment-panel>
                <dimensions-panel></dimensions-panel>
                <panel title="Typography"></panel>
                <panel title="Backgrounds"></panel>
                <panel title="Effects"></panel>
            </panels>
            <toolbar>
                <toolbar-section>
                    <toolbar-button name="cursor" selected></toolbar-button>
                    <toolbar-button name="transform"></toolbar-button>
                </toolbar-section>
                <toolbar-section>
                    <toolbar-button name="rectangle"></toolbar-button>
                    <toolbar-button name="circle"></toolbar-button>
                    <toolbar-button name="line"></toolbar-button>
                    <toolbar-button name="textarea"></toolbar-button>
                    <toolbar-button name="textfield"></toolbar-button>
                    <toolbar-button name="type"></toolbar-button>
                    <toolbar-button name="checkbox"></toolbar-button>
                </toolbar-section>
                <toolbar-section>
                    <toolbar-button name="dropper"></toolbar-button>
                    <toolbar-button name="magnet"></toolbar-button>
                    <toolbar-button name="paint"></toolbar-button>
                </toolbar-section>
            </toolbar>
        </div>
    `
}).$mount('#container');
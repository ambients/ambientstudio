import "normalize.css";
import Vue from "vue";
import { rinss } from "rinss";
import "./panels";
import "./toolbar";

const container = document.createElement('div');
document.body.appendChild(container);
container.id = 'container';

rinss.inline(document.body, {
    overflow: 'hidden',
    fontFamily: '"Arial", "Hiragino Sans GB", "STXihei", "华文细黑", "Microsoft Yahei", "微软雅黑", "sans-serif"'    
});

const css = rinss.create({
    stage: {
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0
    }
});

new Vue({
    template: `
        <div class="${ css.stage }">
            <panels>
                <panel>align</panel>
                <panel>grid</panel>
                <panel collapsed>size</panel>
                <panel collapsed>text</panel>
                <panel collapsed>appearance</panel>
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
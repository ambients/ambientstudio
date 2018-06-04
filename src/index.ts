import Vue from "vue";
import { rinss } from "rinss";
import "./panel";
import "./toolbar";

const container = document.createElement('div');
document.body.appendChild(container);
container.id = 'container';

const css = rinss.create({
    panels: {
        width: 250,
        height: '100vh',
        background: 'rgb(247, 247, 247)',
        absRight: 0,
        absTop: 0,
        overflowX: 'hidden',
        overflowY: "scroll"
    },
    stage: {
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0,
        position: 'fixed'
    }
});

new Vue({
    template: `
        <div class="${ css.stage }">
            <div class="${ css.panels }">
                <panel>align</panel>
                <panel>grid</panel>
                <panel>size</panel>
                <panel>text</panel>
                <panel>appearance</panel>
            </div>
            <toolbar>
                <toolbar-section>
                    <toolbar-button src="icons/cursor.svg"></toolbar-button>
                    <toolbar-button src="icons/transform.svg"></toolbar-button>
                </toolbar-section>
                <toolbar-section>
                    <toolbar-button src="icons/rectangle.svg"></toolbar-button>
                    <toolbar-button src="icons/circle.svg"></toolbar-button>
                    <toolbar-button src="icons/line.svg"></toolbar-button>
                    <toolbar-button src="icons/textarea.svg"></toolbar-button>
                    <toolbar-button src="icons/textfield.svg"></toolbar-button>
                    <toolbar-button src="icons/type.svg"></toolbar-button>
                    <toolbar-button src="icons/checkbox-checked.svg"></toolbar-button>
                </toolbar-section>
                <toolbar-section>
                    <toolbar-button src="icons/dropper.svg"></toolbar-button>
                    <toolbar-button src="icons/magnet.svg"></toolbar-button>
                    <toolbar-button src="icons/paint.svg"></toolbar-button>
                </toolbar-section>
            </toolbar>
        </div>
    `
}).$mount('#container');
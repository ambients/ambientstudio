import Vue from "vue";
import rinss, { rss } from "rinss";
import processSvg from "./processSvg";
import './icon';
import Radio from './radio';
import './colorPicker';
import theme from './theme';

const css = rinss.create({
    toolbar: {
        width: 50,
        height: '100%',
        background: theme.white,
        overflow: "hidden",
        userSelect: 'none',
        borderRight: '3px solid ' + theme.background
    },
    toolbarSection: {
        width: '100%',
        paddingTop: 10,
        paddingBottom: 10,
        floatTop: 0
    },
    toolbarButton: {
        width: '100%',
        height: 50,
        floatTop: 0,
        cursor: 'pointer'
    }
});

Vue.component('toolbar-button', {
    mixins: [Radio],
    template: `
        <div class="${ css.toolbarButton }" @click="check">
            <icon style="${ rss({ centerX: true, centerY: true }) }" :active="isChecked"><slot/></icon>
        </div>
    `,
    props: {
        name: {
            type: String,
            default: 'toolbar'
        }
    }
});

Vue.component('toolbar-section', {
    template: `
        <div class="${ css.toolbarSection }"><slot/></div>
    `
});

Vue.component('toolbar', {
    template: `
        <div class="${ css.toolbar }">
            <toolbar-section>
                <toolbar-button checked @check="$emit('tool', 'cursor')">
                    ${ processSvg(require("./icons/cursor.svg")) }
                    ${ processSvg(require("./icons/cursor-filled.svg")) }
                </toolbar-button>
                <toolbar-button @check="$emit('tool', 'transform')">
                    ${ processSvg(require("./icons/transform.svg")) }
                    ${ processSvg(require("./icons/transform-filled.svg")) }
                </toolbar-button>
            </toolbar-section>
            <toolbar-section>
                <toolbar-button @check="$emit('tool', 'rectangle')">
                    ${ processSvg(require("./icons/rectangle.svg")) }
                    ${ processSvg(require("./icons/rectangle-filled.svg")) }
                </toolbar-button>
                <toolbar-button @check="$emit('tool', 'circle')">
                    ${ processSvg(require("./icons/circle.svg")) }
                    ${ processSvg(require("./icons/circle-filled.svg")) }
                </toolbar-button>
                <toolbar-button @check="$emit('tool', 'line')">
                    ${ processSvg(require("./icons/line.svg")) }
                    ${ processSvg(require("./icons/line-filled.svg")) }
                </toolbar-button>
                <toolbar-button @check="$emit('tool', 'textarea')">
                    ${ processSvg(require("./icons/textarea.svg")) }
                    ${ processSvg(require("./icons/textarea-filled.svg")) }
                </toolbar-button>
                <toolbar-button @check="$emit('tool', 'textfield')">
                    ${ processSvg(require("./icons/textfield.svg")) }
                    ${ processSvg(require("./icons/textfield-filled.svg")) }
                </toolbar-button>
                <toolbar-button @check="$emit('tool', 'type')">
                    ${ processSvg(require("./icons/type.svg")) }
                    ${ processSvg(require("./icons/type-filled.svg")) }
                </toolbar-button>
                <toolbar-button @check="$emit('tool', 'checkbox')">
                    ${ processSvg(require("./icons/checkbox.svg")) }
                    ${ processSvg(require("./icons/checkbox-filled.svg")) }
                </toolbar-button>
            </toolbar-section>
            <toolbar-section>
                <toolbar-button @check="$emit('tool', 'dropper')">
                    ${ processSvg(require("./icons/dropper.svg")) }
                    ${ processSvg(require("./icons/dropper-filled.svg")) }
                </toolbar-button>
                <toolbar-button @check="$emit('tool', 'magnet')">
                    ${ processSvg(require("./icons/magnet.svg")) }
                    ${ processSvg(require("./icons/magnet-filled.svg")) }
                </toolbar-button>
                <toolbar-button @check="$emit('tool', 'paint')">
                    ${ processSvg(require("./icons/paint.svg")) }
                    ${ processSvg(require("./icons/paint-filled.svg")) }
                </toolbar-button>
                <div class="${ css.toolbarButton }" @click="$emit('showColorPicker', $event)">
                    <color-picker style="${ rss({ centerX: true, centerY: true }) }" :color="colorPicked"/>
                </div>
            </toolbar-section>
        </div>
    `,
    props: {
        colorPicked: {
            type: String,
            default: 'blue'
        }
    }
});
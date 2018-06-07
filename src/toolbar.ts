import Vue from "vue";
import { rinss } from "rinss";
import { processSvg } from "./processSvg";
import { theme } from "./theme";

const css = rinss.create({
    toolbar: {
        width: 50,
        height: '100%',
        background: 'rgb(247, 247, 247)',
        absLeft: 0,
        absTop: 0,
        overflow: "hidden",
        boxShadow: '0 19px 38px rgba(0,0,0,0.10), 0 15px 12px rgba(0,0,0,0.05)'
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
    },
    icon: {
        width: 20,
        height: 20,
        centerX: true,
        centerY: true,
        svg: {
            ':first-child': {
                color: theme.textPrimary
            },
            ':last-child':  {
                color: theme.primary
            }
        }
    },
    hideFirstChild: {
        svg: {
            ':first-child': {
                display: 'none'
            }
        }
    },
    hideLastChild: {
        svg: {
            ':last-child': {
                display: 'none'
            }
        }
    }
});

const nameSelected = { value: '' };

const ToolbarButton = Vue.extend({
    template: `
        <div class="${ css.toolbarButton }" @click="select()">
            <div :class="getClass()"><slot></slot></div>
        </div>
    `,
    props: {
        name: String,
        selected: Boolean
    },
    data: function() { return {
        nameSelected: nameSelected
    }},
    mounted: function() {
        if (this.selected) this.nameSelected.value = this.name;
    },
    methods: {
        getSrc: function() {
            const filled = this.name === this.nameSelected.value;
            return 'icons/' + this.name + (filled ? '-filled' : '') + '.svg';
        },
        select: function() {
            this.nameSelected.value = this.name;
        },
        getClass: function() {
            const isSelected = this.nameSelected.value === this.name;
            return css.icon + ' ' + (isSelected ? css.hideFirstChild : css.hideLastChild);
        }
    }
});

const ToolbarSection = Vue.extend({
    template: `
        <div class="${ css.toolbarSection }"><slot></slot></div>
    `
});

Vue.component('toolbar', {
    components: {
        'toolbar-button': ToolbarButton,
        'toolbar-section': ToolbarSection
    },
    template: `
        <div class="${ css.toolbar }">
            <toolbar-section>
                <toolbar-button name="cursor" selected>
                    ${ processSvg(require("./icons/cursor.svg")) }
                    ${ processSvg(require("./icons/cursor-filled.svg")) }
                </toolbar-button>
                <toolbar-button name="transform">
                    ${ processSvg(require("./icons/transform.svg")) }
                    ${ processSvg(require("./icons/transform-filled.svg")) }
                </toolbar-button>
            </toolbar-section>
            <toolbar-section>
                <toolbar-button name="rectangle">
                    ${ processSvg(require("./icons/rectangle.svg")) }
                    ${ processSvg(require("./icons/rectangle-filled.svg")) }
                </toolbar-button>
                <toolbar-button name="circle">
                    ${ processSvg(require("./icons/circle.svg")) }
                    ${ processSvg(require("./icons/circle-filled.svg")) }
                </toolbar-button>
                <toolbar-button name="line">
                    ${ processSvg(require("./icons/line.svg")) }
                    ${ processSvg(require("./icons/line-filled.svg")) }
                </toolbar-button>
                <toolbar-button name="textarea">
                    ${ processSvg(require("./icons/textarea.svg")) }
                    ${ processSvg(require("./icons/textarea-filled.svg")) }
                </toolbar-button>
                <toolbar-button name="textfield">
                    ${ processSvg(require("./icons/textfield.svg")) }
                    ${ processSvg(require("./icons/textfield-filled.svg")) }
                </toolbar-button>
                <toolbar-button name="type">
                    ${ processSvg(require("./icons/type.svg")) }
                    ${ processSvg(require("./icons/type-filled.svg")) }
                </toolbar-button>
                <toolbar-button name="checkbox">
                    ${ processSvg(require("./icons/checkbox.svg")) }
                    ${ processSvg(require("./icons/checkbox-filled.svg")) }
                </toolbar-button>
            </toolbar-section>
            <toolbar-section>
                <toolbar-button name="dropper">
                    ${ processSvg(require("./icons/dropper.svg")) }
                    ${ processSvg(require("./icons/dropper-filled.svg")) }
                </toolbar-button>
                <toolbar-button name="magnet">
                    ${ processSvg(require("./icons/magnet.svg")) }
                    ${ processSvg(require("./icons/magnet-filled.svg")) }
                </toolbar-button>
                <toolbar-button name="paint">
                    ${ processSvg(require("./icons/paint.svg")) }
                    ${ processSvg(require("./icons/paint-filled.svg")) }
                </toolbar-button>
            </toolbar-section>
        </div>
    `
});


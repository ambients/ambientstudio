import Vue from "vue";
import rinss, { rss } from "rinss";
import "./panels";
import "./materialInput";
import theme from './theme';
import processSvg from './processSvg';
import "./icon";
import './iconSlot';
import Radio from './radio';

const topSVG = processSvg(require("./icons/align-top.svg"));
const middleSVG = processSvg(require("./icons/align-middle.svg"));
const bottomSVG = processSvg(require("./icons/align-bottom.svg"));
const minSVG = processSvg(require("./icons/min.svg"));
const maxSVG = processSvg(require("./icons/max.svg"));

const css = rinss.create({
    minMaxInput: {
        background: 'transparent',
        border: 'none',
        fontSize: 13
    },
    alignmentButtons:{
        floatTop: 10,
        width: '100%',
        display:'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
    },
    positionButtons:{
        fontSize: 10,
        floatTop: 25,
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        paddingLeft: 10
    },
    position:{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 10px 1fr'
    },
    positionMinMax:{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 10px 1fr 1fr',
        paddingLeft: 10,
    },
    minMax:{
        display: 'grid',
        gridTemplateColumns: '10px 40px',
    },
});

Vue.component('alignment-button', {
    template: `
        <icon :style="computedStyle"><slot/></icon>
    `,
    props: {
        rotated: Boolean
    },
    computed: {
        computedStyle():string {
            return rss({
                rotate: this.rotated ? -90 : 0,
                cursor: 'pointer'
            });
        }
    }
});

Vue.component('position-button', {
    mixins: [Radio],
    template: `
        <icon-slot :style="computedStyle">
            <icon slot="icon" :active="isChecked"><slot/></icon>
            {{text}}
        </icon-slot>
    `,
    props: {
        text: String
    },
    computed: {
        computedStyle():string {
            return rss({
                color: (this as any).isChecked ? theme.primary : theme.textPrimary,
                cursor: 'pointer'
            });
        }
    }
});

Vue.component('position-panel', {
    template: `
        <panel title="Position" :expanded="expanded">
            <div class="${css.alignmentButtons}">
                <alignment-button>${ topSVG}</alignment-button>
                <alignment-button>${ middleSVG}</alignment-button>
                <alignment-button>${ bottomSVG}</alignment-button>
                <alignment-button rotated>${ topSVG}</alignment-button>
                <alignment-button rotated>${ middleSVG}</alignment-button>
                <alignment-button rotated>${ bottomSVG }</alignment-button>
            </div>
            <div class="${css.positionButtons}">
                <position-button name="position" text="Relative">
                    ${ processSvg(require("./icons/waves.svg")) }
                    ${ processSvg(require("./icons/waves-filled.svg")) }
                </position-button>
                <position-button name="position" text="Absolute">
                    ${ processSvg(require("./icons/target.svg"))}
                    ${ processSvg(require("./icons/target-filled.svg")) }
                </position-button>
                <position-button name="position" text="Fixed">
                    ${ processSvg(require("./icons/pin.svg"))}
                    ${ processSvg(require("./icons/pin-filled.svg")) }
                </position-button>
            </div>
            <div class="${css.position}" >
                <material-input placeholder="Left"/>
                <div/>
                <material-input placeholder="Top"/>
            </div>
            <div class="${css.position}" style="${ rss({ floatTop: 0 }) }">
                <material-input placeholder="Width"/>
                <div/>
                <material-input placeholder="Height"/>
            </div>
            <div class="${css.positionMinMax}">
                <div class="${css.minMax}">
                    <icon size="10px">${minSVG}</icon>
                    <input class="${css.minMaxInput}" placeholder="min"/>
                </div>
                <div class="${css.minMax}">
                    <icon size="10px">${maxSVG}</icon>
                    <input class="${css.minMaxInput}" placeholder="max"/>
                </div>
                <div/>
                <div class="${css.minMax}">
                    <icon size="10px">${minSVG}</icon>
                    <input class="${css.minMaxInput}" placeholder="min"/>
                </div>
                <div class="${css.minMax}">
                    <icon size="10px">${maxSVG}</icon>
                    <input class="${css.minMaxInput}" placeholder="max"/>
                </div>
            </div>
        </panel>
    `,
    props: {
        expanded: Boolean
    }
});
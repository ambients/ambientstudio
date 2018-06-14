import Vue from "vue";
import rinss, { rss } from "rinss";
import "./panels";
import "./materialInput";
import theme from './theme';
import processSvg from './processSvg';
import "./row";
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
    }
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
        <icon-slot @click.native="check" :style="computedStyle">
            <icon slot="icon" :active="isChecked"><slot/></icon>
            {{text}}
        </icon-slot>
    `,
    props: {
        text: String
    },
    computed: {
        computedStyle() {
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
            <row stretch style="${ rss({ floatTop: 10 }) }">
                <cell><alignment-button>${ topSVG}</alignment-button></cell>
                <cell><alignment-button>${ middleSVG}</alignment-button></cell>
                <cell><alignment-button>${ bottomSVG}</alignment-button></cell>
                <cell><alignment-button rotated>${ topSVG}</alignment-button></cell>
                <cell><alignment-button rotated>${ middleSVG}</alignment-button></cell>
                <cell><alignment-button rotated>${ bottomSVG }</alignment-button></cell>
            </row>
            <row stretch style="${ rss({ fontSize: 10, floatTop: 25 }) }">
                <cell><position-button name="position" text="Relative">
                    ${ processSvg(require("./icons/waves.svg")) }
                    ${ processSvg(require("./icons/waves-filled.svg")) }
                </position-button></cell>
                <cell><position-button name="position" text="Absolute">
                    ${ processSvg(require("./icons/target.svg"))}
                    ${ processSvg(require("./icons/target-filled.svg")) }
                </position-button></cell>
                <cell><position-button name="position" text="Fixed">
                    ${ processSvg(require("./icons/pin.svg"))}
                    ${ processSvg(require("./icons/pin-filled.svg")) }
                </position-button></cell>
            </row>
            <row stretch style="${ rss({ floatTop: 15 }) }">
                <cell><material-input placeholder="Left"/></cell>
                <gap/>
                <cell><material-input placeholder="Top"/></cell>
            </row>
            <row stretch>
                <cell><material-input placeholder="Width"/></cell>
                <gap/>
                <cell><material-input placeholder="Height"/></cell>
            </row>
            <row stretch>
                <cell><row stretch>
                    <cell shrink><icon size="10px">${minSVG}</icon></cell>
                    <cell><input class="${css.minMaxInput}" placeholder="min"/></cell>
                </row></cell>
                <cell><row stretch>
                    <cell shrink><icon size="10px">${maxSVG}</icon></cell>
                    <cell><input class="${css.minMaxInput}" placeholder="max"/></cell>
                </row></cell>
                <gap/>
                <cell><row stretch>
                    <cell shrink><icon size="10px">${minSVG}</icon></cell>
                    <cell><input class="${css.minMaxInput}" placeholder="min"/></cell>
                </row></cell>
                <cell><row stretch>
                    <cell shrink><icon size="10px">${maxSVG}</icon></cell>
                    <cell><input class="${css.minMaxInput}" placeholder="max"/></cell>
                </row></cell>
            </row>
        </panel>
    `,
    props: {
        expanded: Boolean
    }
});
import Vue from "vue";
import rinss, { rss } from "rinss";
import "./panels";
import theme from "./theme";
import processSvg from './processSvg';
import Radio from './radio';
import './icon';
import './row';
import './colorPicker';

const borderTopRight = processSvg(require('./icons/border-top-right.svg'));
const borderTop = processSvg(require('./icons/border-top.svg'));
const borderLeft = processSvg(require('./icons/border-left.svg'));
const borderRight = processSvg(require('./icons/border-right.svg'));
const borderBottom = processSvg(require('./icons/border-bottom.svg'));

const colorPalette = require('./icons/font-color.svg');
const borderThickness = require('./icons/thickness.svg');
const borderLine = processSvg(require('./icons/line.svg'));

const css = rinss.create({
    borderColorInput:{
        background:'none',
        border:'none',
        borderBottom:'1px solid black'   
    },
    separator: {
        width: '100%',
        height: 0,
        borderBottom: '1px solid ' + theme.background,
        floatTop: 0,
        margin: 10
    }
});


Vue.component('border-type',{
    mixins:[Radio],
    template:`
        <icon style="cursor:pointer" @click.native="check" :active="isChecked"><slot/></icon>
    `
});

Vue.component('border-panel',{
    template:`
    <panel title="Border" expanded>
        <row stretch style="${rss({floatTop:0})}">
            <cell shrink><border-type>
                ${borderTop}
            </border-type></cell>
            <gap/>
            <cell>
                <material-input placeholder="Top thickness"/>
            </cell>
        </row>
        <row stretch style="${rss({floatTop:0, marginBottom:10})}">
            <cell shrink><color-picker size="20px" :color="borderTopColor" @click.native="$emit('showColorPicker', $event)"/></cell>
            <gap/>
            <cell><input class="${css.borderColorInput}" placeholder="Color" v-model="borderTopColor"/></cell>
            <gap/>
            <cell><border-type name="topBorder">
                ${borderLine}
            </border-type></cell>
            <cell><border-type name="topBorder">
                ${borderLine}
            </border-type></cell>
            <cell><border-type name="topBorder">
                ${borderLine}
            </border-type></cell>
            <cell><border-type name="topBorder">
                ${borderLine}
            </border-type></cell>
            <gap/>
        </row>

        <row stretch style="${rss({floatTop:0})}">
            <cell shrink><border-type>${borderBottom}</border-type></cell>
            <gap/>
            <cell><material-input placeholder="Bottom thickness"/></cell>
        </row>
        <row stretch style="${rss({floatTop:0, marginBottom:10})}">
            <cell shrink><color-picker size="20px" :color="borderBottomColor" @click.native="$emit('showColorPicker', $event)"/></cell>
            <gap/>
            <cell><input class="${css.borderColorInput}" placeholder="Color" v-model="borderBottomColor"/></cell>
            <gap/>
            <cell><border-type name="bottomBorder">
                ${borderLine}
            </border-type></cell>
            <cell><border-type name="bottomBorder">
                ${borderLine}
            </border-type></cell>
            <cell><border-type name="bottomBorder">
                ${borderLine}
            </border-type></cell>
            <cell><border-type name="bottomBorder">
                ${borderLine}
            </border-type></cell>
            <gap/>
        </row>

        <row stretch style="${rss({floatTop:0})}">
            <cell shrink><border-type>
                ${borderLeft}
            </border-type></cell>
            <gap/>
            <cell>
                <material-input placeholder="Left thickness"/>
            </cell>
        </row>
        <row stretch style="${rss({floatTop:0, marginBottom:10})}">
            <cell shrink><color-picker size="20px" :color="borderLeftColor" @click.native="$emit('showColorPicker', $event)"/></cell>
            <gap/>
            <cell><input class="${css.borderColorInput}" placeholder="Color" v-model="borderLeftColor"/></cell>
            <gap/>
            <cell><border-type name="topBorder">
                ${borderLine}
            </border-type></cell>
            <cell><border-type name="topBorder">
                ${borderLine}
            </border-type></cell>
            <cell><border-type name="topBorder">
                ${borderLine}
            </border-type></cell>
            <cell><border-type name="topBorder">
                ${borderLine}
            </border-type></cell>
            <gap/>
        </row>

        <row stretch style="${rss({floatTop:0})}">
            <cell shrink><border-type>
                ${borderRight}
            </border-type></cell>
            <gap/>
            <cell>
                <material-input placeholder="Right thickness"/>
            </cell>
        </row>
        <row stretch style="${rss({floatTop:0, marginBottom:10})}">
            <cell shrink><color-picker size="20px" :color="borderRightColor" @click.native="$emit('showColorPicker', $event)"/></cell>
            <gap/>
            <cell><input class="${css.borderColorInput}" placeholder="Color" v-model="borderRightColor"/></cell>
            <gap/>
            <cell><border-type name="topBorder">
                ${borderLine}
            </border-type></cell>
            <cell><border-type name="topBorder">
                ${borderLine}
            </border-type></cell>
            <cell><border-type name="topBorder">
                ${borderLine}
            </border-type></cell>
            <cell><border-type name="topBorder">
                ${borderLine}
            </border-type></cell>
            <gap/>
        </row>

        <div class="${ css.separator }"></div>

        <row stretch style="${rss({floatTop:0})}">
            <cell shrink><border-type>
                ${borderTopRight}
            </border-type></cell>
            <cell>
                <material-input placeholder="Top right size"/>
            </cell>
            <gap/>
            <cell shrink><border-type style="${rss({rotate:-90})}">
                ${borderTopRight}
            </border-type></cell>
            <cell>
                <material-input placeholder="Top left size"/>
            </cell>
        </row>
        <row stretch style="${rss({floatTop:0})}">
            <cell shrink><border-type style="${rss({rotate:90})}">
                ${borderTopRight}
            </border-type></cell>
            <cell>
                <material-input placeholder="Bottom right size"/>
            </cell>
            <gap/>
            <cell shrink><border-type style="${rss({rotate:180})}">
                ${borderTopRight}
            </border-type></cell>
            <cell>
                <material-input placeholder="Bottom left size"/>
            </cell>
        </row>
    </panel>
    `,
    props:{
        colorPicked: String
    },
});
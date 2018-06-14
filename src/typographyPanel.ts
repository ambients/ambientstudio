import Vue from "vue";
import { rss } from "rinss";
import "./panels";
import './row';
import './materialSelect';
import './colorPicker';
import processSVG from './processSvg';
import Radio from './radio';

Vue.component('typography-button', {
    mixins: [Radio],
    template: `
        <icon style="cursor:pointer" @click.native="check" :active="isChecked"><slot/></icon>
    `
});

Vue.component('typography-panel',{
    template: `
        <panel title="Typography" :expanded="expanded">
            <row stretch style="${ rss({ floatTop: 10 })}">
                <cell><typography-button name="fontStyle">
                    ${ processSVG(require('./icons/bold.svg'))}
                    ${ processSVG(require('./icons/bold-filled.svg'))}
                </typography-button></cell>
                <cell><typography-button name="fontStyle">
                    ${ processSVG(require('./icons/italic.svg'))}
                    ${ processSVG(require('./icons/italic-filled.svg'))}
                </typography-button></cell>
                <cell><typography-button name="fontStyle">
                    ${ processSVG(require('./icons/underline.svg'))}
                    ${ processSVG(require('./icons/underline-filled.svg'))}
                </typography-button></cell>
                <cell><typography-button name="fontStyle">
                    ${ processSVG(require('./icons/strikethrough.svg'))}
                    ${ processSVG(require('./icons/strikethrough-filled.svg'))}
                </typography-button></cell>
                <cell><typography-button name="textAlign">
                    ${ processSVG(require('./icons/align-left.svg'))}
                    ${ processSVG(require('./icons/align-left-filled.svg'))}
                </typography-button></cell>
                <cell><typography-button name="textAlign">
                    ${ processSVG(require('./icons/align-center.svg'))}
                    ${ processSVG(require('./icons/align-center-filled.svg'))}
                </typography-button></cell>
                <cell><typography-button name="textAlign">
                    ${ processSVG(require('./icons/align-right.svg'))}
                    ${ processSVG(require('./icons/align-right-filled.svg'))}
                </typography-button></cell>
                <cell><typography-button name="textAlign">
                    ${ processSVG(require('./icons/align-justify.svg')) }
                    ${ processSVG(require('./icons/align-justify-filled.svg')) }
                </typography-button></cell>
            </row>
            <row stretch style="${ rss({ floatTop: 15 }) }">
                <cell>
                    <material-select
                     placeholder="Font family"
                     :options="['Arial', 'Helvetica']"/>
                </cell>
                <gap/>
                <cell>
                    <material-select
                     placeholder="Font weight"
                     :options="['Bold', 'Bolder', 'Normal', 'Lighter', 'Light']"/>
                </cell>
            </row>
            <row stretch>
                <cell><material-input placeholder="Font size"/></cell>
                <gap/>
                <cell><material-input placeholder="Line height"/></cell>
            </row>
            <row stretch style="${ rss({ floatTop: 10 }) }">
                <cell shrink>
                    <color-picker size="30px" :color="colorPicked" @click.native="$emit('showColorPicker', $event)"/>
                </cell>
                <gap/>
                <cell><material-input placeholder="Color" v-model="colorPicked"/></cell>
            </row>
            <row stretch>
                <cell><material-input placeholder="Letter spacing"/></cell>
                <gap/>
                <cell><material-input placeholder="Word spacing"/></cell>
            </row>
            <row stretch>
                <cell><material-input placeholder="Text indent"/></cell>
                <gap/>
                <cell><material-input placeholder="Paragraph spacing"/></cell>
            </row>
        </panel>
    `,
    props: {
        expanded: Boolean,
        colorPicked: String
    }
});
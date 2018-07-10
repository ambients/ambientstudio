import Vue from "vue";
import rinss, { rss } from "rinss";
import "./panels";
import './row';
import './materialSelect';
import './colorPicker';
import processSVG from './processSvg';
import Radio from './radio';

const css = rinss.create({
    typographyButtons:{
        floatTop:10,
        width: '100%',
        paddingLeft:10,
        display:'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr'
    },
    fontStyle:{
        width:'100%',
        floatTop:0,
        display:'grid',
        gridTemplateColumns: '1fr 10px 1fr'
    },
    fontType:{
        width:'100%',
        floatTop:0,
        display:'grid',
        gridTemplateColumns:'1fr 10px 1fr',
    },
    fontColor:{
        width: '100%',
        floatTop:10,
        display:'grid',
        gridTemplateColumns:'30px 10px 1fr',        
    },
    fontSpacing:{
        width: '100%',
        floatTop:0,
        display:'grid',
        gridTemplateColumns:'1fr 10px 1fr',
    },
    paragraph:{
        width: '100%',
        floatTop:0,
        display:'grid',
        gridTemplateColumns:'1fr 10px 1fr',
    },
});
Vue.component('typography-button', {
    mixins: [Radio],
    template: `
        <icon style="cursor:pointer" :active="isChecked"><slot/></icon>
    `
});

Vue.component('typography-panel',{
    template: `
        <panel title="Typography" :expanded="expanded">
            <div class="${css.typographyButtons}">
                <typography-button name="fontBold">
                    ${ processSVG(require('./icons/bold.svg'))}
                    ${ processSVG(require('./icons/bold-filled.svg'))}
                </typography-button>
                <typography-button name="fontItalic">
                    ${ processSVG(require('./icons/italic.svg'))}
                    ${ processSVG(require('./icons/italic-filled.svg'))}
                </typography-button>
                <typography-button name="fontUnderline">
                    ${ processSVG(require('./icons/underline.svg'))}
                    ${ processSVG(require('./icons/underline-filled.svg'))}
                </typography-button>
                <typography-button name="fontScratch">
                    ${ processSVG(require('./icons/strikethrough.svg'))}
                    ${ processSVG(require('./icons/strikethrough-filled.svg'))}
                </typography-button>
                <typography-button name="textAlign">
                    ${ processSVG(require('./icons/align-left.svg'))}
                    ${ processSVG(require('./icons/align-left-filled.svg'))}
                </typography-button>
                <typography-button name="textAlign">
                    ${ processSVG(require('./icons/align-center.svg'))}
                    ${ processSVG(require('./icons/align-center-filled.svg'))}
                </typography-button>
                <typography-button name="textAlign">
                    ${ processSVG(require('./icons/align-right.svg'))}
                    ${ processSVG(require('./icons/align-right-filled.svg'))}
                </typography-button>
                <typography-button name="textAlign">
                    ${ processSVG(require('./icons/align-justify.svg')) }
                    ${ processSVG(require('./icons/align-justify-filled.svg')) }
                </typography-button>
            </div>
            <div class = "${css.fontStyle}">
                <material-select
                 placeholder="Font family"
                 :options="['Arial', 'Helvetica']"/>
                <div/>
                <material-select
                 placeholder="Font weight"
                 :options="['Bold', 'Bolder', 'Normal', 'Lighter', 'Light']"/>
            </div>
            <div class="${css.fontType}">
                <material-input placeholder="Font size"/>
                <div/>
                <material-input placeholder="Line height"/>
            </div>
            <div class="${css.fontColor}">
                <color-picker size="30px" :color="colorPicked" @click.native="$emit('showColorPicker', $event)"/>
                <div/>
                <material-input placeholder="Color" v-model="colorPicked"/>
            </div>
            <div class="${css.fontSpacing}">
                <material-input placeholder="Letter spacing"/>
                <div/>
                <material-input placeholder="Word spacing"/>
            </div>
            <div class="${css.paragraph}">
                <material-input placeholder="Text indent"/>
                <div/>
                <material-input placeholder="Paragraph spacing"/>
            </div>
        </panel>
    `,
    props: {
        expanded: Boolean,
        colorPicked: String
    }
});
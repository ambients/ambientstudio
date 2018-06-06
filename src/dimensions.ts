import Vue from "vue";
import { rinss } from "rinss";
import "./panels";
import "./materialInput"
import { theme } from "./theme";

const css = rinss.create({
    dimensionRow: {
        display: 'flex',
        width:'100%'
    },
    dimensionsIcon: {
        width: 20,
        height: 20,
        flex: '0 0 20px'
    },
    minMaxIcon: {
        width: 10,
        height: 10,
        flex: '0 0 10px',
        marginRight: 5
    },
    dimensionsInput: {
        width: '100%',
        overflow: "hidden",
        flex: '1 1 auto',
        background: 'transparent',
        border: 'none'
    },
    dimensionsRendered: {
        fontSize: 10,
        width: '100%',
        flex: '1 1 auto',
        overflow:'hidden'      
    },
    paddingRow: {
        display: 'flex',
        floatTop: 0,
        width: '100%'
    },
    paddingInput: {
        width: '100%',
        flex: '1 1 auto',
        ':not(:first-child)': {
            marginLeft: 10
        }
    },
    separator: {
        width: '100%',
        height: 0,
        borderBottom: '1px solid ' + theme.background,
        floatTop: 0
    }
});

Vue.component('dimensions-panel',{
    template: `
    <panel title="Dimensions" expanded>
        <div class="${ css.dimensionRow }">
            <div class="${ css.dimensionsIcon }"><img src="icons/width.svg"></img></div>
            <input class="${css.dimensionsInput}" placeholder="width" v-model="widthRendered"></input>
            <div class="${ css.dimensionsIcon }"><img src="icons/height.svg"></img></div>
            <input class="${css.dimensionsInput}" placeholder="height" v-model="heightRendered"></input>
        </div>
        <div class="${ css.dimensionRow }">
            <div class="${ css.minMaxIcon }"><img src="icons/min.svg"></img></div>
            <input class="${css.dimensionsInput}" placeholder="min"></input>
            <div class="${ css.minMaxIcon }"><img src="icons/max.svg"></img></div>
            <input class="${css.dimensionsInput}" placeholder="max"></input>
            <div class="${ css.minMaxIcon }"><img src="icons/min.svg"></img></div>
            <input class="${css.dimensionsInput}" placeholder="min"></input>
            <div class="${ css.minMaxIcon }"><img src="icons/max.svg"></img></div>
            <input class="${css.dimensionsInput}" placeholder="max"></input>
        </div>
        <div class="${ css.dimensionRow }">
            <div class="${css.dimensionsRendered}">Rendered: {{widthRendered}}</div>
            <div class="${css.dimensionsRendered}">Rendered: {{wheightRendered}}</div>
        </div>
        <div class="${ css.separator }"></div>
        <div class="${ css.paddingRow }">
            <material-input class="${ css.paddingInput }">padding-left</material-input>
            <material-input class="${ css.paddingInput }">padding-right</material-input>
        </div>
        <div class="${ css.paddingRow }">
            <material-input class="${ css.paddingInput }">padding-top</material-input>
            <material-input class="${ css.paddingInput }">padding-bottom</material-input>
        </div>
        <div class="${ css.separator }"></div>
        <div class="${ css.paddingRow }">
            <material-input class="${ css.paddingInput }">margin-left</material-input>
            <material-input class="${ css.paddingInput }">margin-right</material-input>
        </div>
        <div class="${ css.paddingRow }">
            <material-input class="${ css.paddingInput }">margin-top</material-input>
            <material-input class="${ css.paddingInput }">margin-bottom</material-input>
        </div>
    </panel>
    `,
    data: function() {
        return {
            widthRendered: '',
            heightRendered: ''
        }
    }
});
import Vue from "vue";
import {rss} from "rinss";
import rinss from "rinss";
import processSvg from "./processSvg";
import theme from "./theme";
import './row';
import Checkbox from "./checkbox";
import { pushOne, clear, pullOne } from "../node_modules/ambients-utils";

const visibility= processSvg(require('./icons/visibility.svg'));
const visibilityFilled=processSvg(require('./icons/visibility-filled.svg'));
const lock= processSvg(require('./icons/lock.svg'));
const lockFilled=processSvg(require('./icons/lock-filled.svg'));
const placeholder = processSvg(require('./icons/placeholder.svg'));
const placeholderFilled = processSvg(require('./icons/placeholder-filled.svg'));

const css=rinss.create({
    outline:{
        background: theme.white,
        width: '100%',
        paddingLeft:5,
        borderRight: '3px solid ' + theme.background,
        userSelect:'none'
    },
    elementName:{
        floatLeft:0,
    },
    separator: {
        width: '100%',
        height: 0,
        borderBottom: '1px solid ' + theme.background,
        floatTop: 0,
        marginTop:10,
    },
    outlineRow:{
        floatTop:0,
        height:20,
        fontSize:13,
        width:'100%',
        display: 'grid',
        gridTemplateColumns: '15px 15px 15px 1fr',
        gridGap: '5px'
    },
});

const selectedArray:Array<Vue> = [];

Vue.component('outline-row', {
    template:`
        <div class="${ css.outlineRow }" :style="computedStyle">
            <icon name="visibility" style="cursor:pointer" size="15px" >
                ${visibility}
                ${visibilityFilled}
            </icon>
            <icon name="lock" style="cursor:pointer" size="15px">
                ${lock}
                ${lockFilled}
            </icon>
            <icon style="cursor:pointer" size="15px">
                ${placeholder}
                ${placeholderFilled}
            </icon>
            <div class="${css.elementName}" @click="click"><slot></slot></div>
        </div>
    `,
    data() {
        return {
            selectedArray
        };
    },
    computed: {
        computedStyle():string {
            return rss({
                background: this.selected ? 'yellow' : theme.white
            });
        },
        selected():boolean {
            return this.selectedArray.indexOf(this) > -1;
        }
    },
    methods: {
        click(e:MouseEvent) {
            if (!this.selected) {
                if (!e.shiftKey) clear(this.selectedArray);
                pushOne(this.selectedArray, this);
            }
            else {
                pullOne(this.selectedArray, this);
            }
        }
    }
});

Vue.component('outline',{
    template:`
        <div class="${css.outline}">
            <outline-row style="${ rss({marginTop:10})}"></outline-row>
            <div class="${ css.separator }" style="${rss({marginBottom:10})}"></div>
            <outline-row>whatever</outline-row>
            <outline-row>whatever</outline-row>
            <outline-row>whatever</outline-row>
        </div>
    `
});
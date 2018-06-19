import Vue from "vue";
import rinss from "rinss";
import {rss} from "rinss";
import theme from "./theme";
import "./row";
import processSvg from "./processSvg"
import { truncate } from "fs";

const forward = processSvg(require('./icons/forward.svg'));

const css=rinss.create({
    menu:{
        width:250,
        height: '100vh',
        background: theme.white,
        borderRight: '3px solid ' + theme.background,
        borderBottom: '3px solid' + theme.background,
        zIndex:999,
        floatLeft: 0,
        fontSize:13
    },
    menuStyle:{
        color: theme.textPrimary,
        ':hover':{
            background: theme.background
        }
    },
    separator: {
        width: '100%',
        height: 0,
        borderBottom: '1px solid ' + theme.background,
        floatTop: 0,
        marginBottom: 10,
        marginTop: 5
    },
});

let count = -1;
let nameFocused = { value: '' };

Vue.component('MenuRow', {
    template: `
        <row stretch style="${rss({height:40})}" class="${css.menuStyle}" @mouseenter.native="changeName">
            <gap/>
            <cell shrink align="left"><slot name="ops"/></cell>
            <cell align="right"><slot/></cell>
            <gap/>
        </row>
    `,
    props: {
        name: {
            type: String,
            default: 'menuRow' + (++count)
        },
        unnamed: Boolean
    },
    data() {
        return {
            nameFocused
        };
    },
    methods: {
        changeName() {
            if (!this.unnamed) this.nameFocused.value = this.name;
        }
    }
});

Vue.component('main-menu',{
    template:`
        <div style="${ rss({ absLeft:0, absTop:40, userSelect:'none',}) }">
            <div class="${css.menu}">
                <MenuRow><div slot="ops">New</div>Ctrl + N</MenuRow>
                <MenuRow><div slot="ops">Open</div>Ctrl + O</MenuRow>
                <MenuRow name="openRecent"><div slot="ops">Open recent</div><icon>${forward}</icon></MenuRow>
                <MenuRow name="getUIKit"><div slot="ops">Get UI kit</div><icon>${forward}</icon></MenuRow>
                <MenuRow><div slot="ops">Open CC Libraries</div>Shift + Ctrl + L</MenuRow>
                <MenuRow><div slot="ops">Open CC Libraries</div>Shift + Ctrl + L</MenuRow>
                <div class="${ css.separator }"></div>
                <MenuRow><div slot="ops">Save</div>Ctrl + S</MenuRow>
                <MenuRow><div slot="ops">Save As</div>Shift + Ctrl + S</MenuRow>
                <MenuRow><div slot="ops">Revert to Saved</div></MenuRow>
                <div class="${ css.separator }"></div>
                <MenuRow name="export"><div slot="ops">Export</div><icon>${forward}</icon></MenuRow>
                <MenuRow><div slot="ops">Import</div>Shift + Ctrl + I</MenuRow>
                <MenuRow><div slot="ops">Share</div></MenuRow>
                <MenuRow><div slot="ops">Manage published links</div></MenuRow>
                <div class="${ css.separator }"></div>
                <MenuRow name="help"><div slot="ops">Help</div><icon>${forward}</icon></MenuRow>
            </div>




            <div class="${css.menu}" v-if="nameFocused.value === 'openRecent'" style="${rss({paddingTop:20})}">
                <MenuRow unnamed style="${rss({height:30})}"><div slot="ops">Recent files</div></MenuRow>
                <MenuRow unnamed style="${rss({height:30})}"><div slot="ops">Delete files</div></MenuRow>
            </div>
            




            <div class="${css.menu}" v-if="nameFocused.value === 'getUIKit'" style="${rss({paddingTop:20})}">
                <MenuRow unnamed style="${rss({height:30})}"><div slot="ops">Apple IOS</div></MenuRow>
                <MenuRow unnamed style="${rss({height:30})}"><div slot="ops">Google materials</div></MenuRow>
                <MenuRow unnamed style="${rss({height:30})}"><div slot="ops">Microsoft windows</div></MenuRow>
                
                <div class="${ css.separator }"></div>

                <MenuRow unnamed style="${rss({height:30})}"><div slot="ops">Wireframe</div></MenuRow>
                <MenuRow unnamed style="${rss({height:30})}"><div slot="ops">Other UI libraries</div></MenuRow>
            </div>




            <div class="${css.menu}" v-if="nameFocused.value === 'export'" style="${rss({paddingTop:20})}">
                <MenuRow unnamed style="${rss({height:30})}"><div slot="ops">Export all</div>Shift + Ctrl + E</MenuRow>
                <MenuRow unnamed style="${rss({height:30})}"><div slot="ops">Export selected</div>Ctrl + E</MenuRow>
                <MenuRow unnamed style="${rss({height:30})}"><div slot="ops">All art boards</div></MenuRow>
            </div>




            <div class="${css.menu}" v-if="nameFocused.value === 'help'" style="${rss({paddingTop:20})}">
                <MenuRow unnamed style="${rss({height:30})}"><div slot="ops">Patch notes</div></MenuRow>
                <MenuRow unnamed style="${rss({height:30})}"><div slot="ops">Tutorials and resources</div></MenuRow>
                <MenuRow unnamed style="${rss({height:30})}"><div slot="ops">Feedback</div></MenuRow>
                <MenuRow unnamed style="${rss({height:30})}"><div slot="ops">Future release</div></MenuRow>
            </div>
        </div>
    `,
    data() {
        return {
            nameFocused
        };
    },
    mounted() {
        this.nameFocused.value = '';
    }
});
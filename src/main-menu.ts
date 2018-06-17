import Vue from "vue";
import rinss from "rinss";
import {rss} from "rinss";
import theme from "./theme";
import "./row";
import processSvg from "./processSvg"

const menuIcon= processSvg(require('./icons/placeholder.svg'));
const rightArrow = processSvg(require('./icons/placeholder.svg'));

const css=rinss.create({
    menu:{
        width:250,
        background: theme.white,
        borderRight: '3px solid ' + theme.background,
        borderBottom: '3px solid' + theme.background,
        zIndex:999,
        absLeft:0,
        absTop:40
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

Vue.component('main-menu',{
    template:`
        <div class="${css.menu}">

            <row stretch style="${rss({height:40, color:theme.textPrimary})}">
                <gap/>
                <cell shrink align="left">New</cell>
                <cell align="right">Ctrl + N</cell>
                <gap/>
            </row>

            <row stretch style="${rss({height:40, color:theme.textPrimary})}">
                <gap/>
                <cell shrink align="left">Open</cell>
                <cell align="right">Ctr + O</cell>
                <gap/>
            </row>

            <row stretch style="${rss({height:40, color:theme.textPrimary})}">
                <gap/>
                <cell shrink align="left">Open Recent</cell>
                <cell align="right"><icon>
                    ${rightArrow}
                </icon></cell>
                <gap/>
            </row>
            
            <row stretch style="${rss({height:40, color:theme.textPrimary})}">
                <gap/>
                <cell shrink align="left">Get UI Kits</cell>
                <cell align="right"><icon>
                    ${rightArrow}
                </icon></cell>
                <gap/>
            </row>

            <row stretch style="${rss({height:40, color:theme.textPrimary})}">
                <gap/>
                <cell shrink align="left">Open CC Libraries</cell>
                <cell align="right">Shift + Ctrl + L</cell>
                <gap/>
            </row>

            <div class="${ css.separator }"></div>

            <row stretch style="${rss({height:40, color:theme.textPrimary})}">
                <gap/>
                <cell shrink align="left">Save</cell>
                <cell align="right">Ctrl + S</cell>
                <gap/>
            </row>

            <row stretch style="${rss({height:40, color:theme.textPrimary})}">
                <gap/>
                <cell shrink align="left">Save As</cell>
                <cell align="right">Shift + Ctrl + S</cell>
                <gap/>
            </row>

            <row stretch style="${rss({height:40, color:theme.textPrimary})}">
                <gap/>
                <cell shrink align="left">Revert to Saved</cell>
                <cell align="right"></cell>
                <gap/>
            </row>

            <div class="${ css.separator }"></div>

            <row stretch style="${rss({height:40, color:theme.textPrimary})}">
                <gap/>
                <cell shrink align="left">Export</cell>
                <cell align="right"><icon>
                    ${rightArrow}
                </icon></cell>
                <gap/>
            </row>

            <row stretch style="${rss({height:40, color:theme.textPrimary})}">
                <gap/>
                <cell shrink align="left">Import</cell>
                <cell align="right">Shift + Ctrl + I</cell>
                <gap/>
            </row>

            <row stretch style="${rss({height:40, color:theme.textPrimary})}">
                <gap/>
                <cell shrink align="left">Share</cell>
                <cell align="right"></cell>
                <gap/>
            </row>

            <row stretch style="${rss({height:40, color:theme.textPrimary})}">
                <gap/>
                <cell shrink align="left">Manage Published Links</cell>
                <cell align="right"></cell>
                <gap/>
            </row>

            <div class="${ css.separator }"></div>

            <row stretch style="${rss({height:40, color:theme.textPrimary})}">
                <gap/>
                <cell shrink align="left">Help</cell>
                <cell align="right"><icon>
                    ${rightArrow}
                </icon></cell>
                <gap/>
            </row>
        </div>
    `,
});
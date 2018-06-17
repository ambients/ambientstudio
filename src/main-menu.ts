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

Vue.component('main-menu',{
    template:`
        <div style="${ rss({ absLeft:0, absTop:40 }) }">
            <div class="${css.menu}">

                <row stretch style="${rss({height:40})}"class="${css.menuStyle}">
                    <gap/>
                    <cell shrink align="left">New</cell>
                    <cell align="right">Ctrl + N</cell>
                    <gap/>
                </row>

                <row stretch style="${rss({height:40})}"class="${css.menuStyle}">
                    <gap/>
                    <cell shrink align="left">Open</cell>
                    <cell align="right">Ctr + O</cell>
                    <gap/>
                </row>

                <row stretch style="${rss({height:40})}" class="${css.menuStyle}" @mouseenter.native="openRecentHover" @mouseleave.native="openRecentHoverOff">
                    <gap/>
                    <cell shrink align="left">Open Recent</cell>
                    <cell align="right"><icon>
                        ${forward}
                    </icon></cell>
                    <gap/>
                </row>
                
                <row stretch style="${rss({height:40})}"class="${css.menuStyle}" @mouseenter.native="getUIHover" @mouseleave.native="getUIHoverOff">
                    <gap/>
                    <cell shrink align="left">Get UI Kits</cell>
                    <cell align="right"><icon>
                        ${forward}
                    </icon></cell>
                    <gap/>
                </row>

                <row stretch style="${rss({height:40})}"class="${css.menuStyle}">
                    <gap/>
                    <cell shrink align="left">Open CC Libraries</cell>
                    <cell align="right">Shift + Ctrl + L</cell>
                    <gap/>
                </row>

                <div class="${ css.separator }"></div>

                <row stretch style="${rss({height:40})}"class="${css.menuStyle}">
                    <gap/>
                    <cell shrink align="left">Save</cell>
                    <cell align="right">Ctrl + S</cell>
                    <gap/>
                </row>

                <row stretch style="${rss({height:40})}"class="${css.menuStyle}">
                    <gap/>
                    <cell shrink align="left">Save As</cell>
                    <cell align="right">Shift + Ctrl + S</cell>
                    <gap/>
                </row>

                <row stretch style="${rss({height:40})}"class="${css.menuStyle}">
                    <gap/>
                    <cell shrink align="left">Revert to Saved</cell>
                    <cell align="right"></cell>
                    <gap/>
                </row>

                <div class="${ css.separator }"></div>

                <row stretch style="${rss({height:40})}"class="${css.menuStyle}" @mouseenter.native="exportHover" @mouseleave.native="exportHoverOff">
                    <gap/>
                    <cell shrink align="left">Export</cell>
                    <cell align="right"><icon>
                        ${forward}
                    </icon></cell>
                    <gap/>
                </row>

                <row stretch style="${rss({height:40})}"class="${css.menuStyle}">
                    <gap/>
                    <cell shrink align="left">Import</cell>
                    <cell align="right">Shift + Ctrl + I</cell>
                    <gap/>
                </row>

                <row stretch style="${rss({height:40})}"class="${css.menuStyle}">
                    <gap/>
                    <cell shrink align="left">Share</cell>
                    <cell align="right"></cell>
                    <gap/>
                </row>

                <row stretch style="${rss({height:40})}"class="${css.menuStyle}">
                    <gap/>
                    <cell shrink align="left">Manage Published Links</cell>
                    <cell align="right"></cell>
                    <gap/>
                </row>

                <div class="${ css.separator }"></div>

                <row stretch style="${rss({height:40})}"class="${css.menuStyle}" @mouseenter.native="helpHover" @mouseleave.native="helpHoverOff">
                    <gap/>
                    <cell shrink align="left">Help</cell>
                    <cell align="right"><icon>
                        ${forward}
                    </icon></cell>
                    <gap/>
                </row>
            </div>




            
            <div class="${css.menu}" v-if="openRecentMenu" style="${rss({paddingTop:20})}">
                <row stretch style="${rss({height:30})}"class="${css.menuStyle}">
                    <gap/>
                    <cell shrink align="left">Recent files</cell>
                    <cell align="right"></cell>
                    <gap/>
                </row>
                
                <row stretch style="${rss({height:30})}"class="${css.menuStyle}">
                    <gap/>
                    <cell shrink align="left">Delete files</cell>
                    <cell align="right"></cell>
                    <gap/>
                </row>
            </div>





            <div class="${css.menu}" v-if="getUIMenu" style="${rss({paddingTop:20})}">
                <row stretch style="${rss({height:30})}"class="${css.menuStyle}">
                    <gap/>
                    <cell shrink align="left">Apple IOS</cell>
                    <cell align="right"></cell>
                    <gap/>
                </row>
                <row stretch style="${rss({height:30})}"class="${css.menuStyle}">
                    <gap/>
                    <cell shrink align="left">Google materials</cell>
                    <cell align="right"></cell>
                    <gap/>
                </row>
                <row stretch style="${rss({height:30})}"class="${css.menuStyle}">
                    <gap/>
                    <cell shrink align="left">Microsoft windows</cell>
                    <cell align="right"></cell>
                    <gap/>
                </row>

                <div class="${ css.separator }"></div>

                <row stretch style="${rss({height:30})}"class="${css.menuStyle}">
                    <gap/>
                    <cell shrink align="left">Wireframe</cell>
                    <cell align="right"></cell>
                    <gap/>
                </row>
                <row stretch style="${rss({height:30})}"class="${css.menuStyle}">
                    <gap/>
                    <cell shrink align="left">Other UI libraries</cell>
                    <cell align="right"></cell>
                    <gap/>
                </row>
            </div>





            <div class="${css.menu}" v-if="exportMenu" style="${rss({paddingTop:20})}">
                <row stretch style="${rss({height:30})}"class="${css.menuStyle}">
                    <gap/>
                    <cell shrink align="left">Export all</cell>
                    <cell align="right">Shift + Ctrl + E</cell>
                    <gap/>
                </row>
                <row stretch style="${rss({height:30})}"class="${css.menuStyle}">
                    <gap/>
                    <cell shrink align="left">Selected</cell>
                    <cell align="right">Ctrl + E</cell>
                    <gap/>
                </row>
                <row stretch style="${rss({height:30})}"class="${css.menuStyle}">
                    <gap/>
                    <cell shrink align="left">All art boards</cell>
                    <cell align="right"></cell>
                    <gap/>
                </row>
            </div>





            <div class="${css.menu}" v-if="helpMenu" style="${rss({paddingTop:20})}">
                <row stretch style="${rss({height:30})}"class="${css.menuStyle}">
                    <gap/>
                    <cell shrink align="left">Patch notes</cell>
                    <cell align="right"></cell>
                    <gap/>
                </row>
                <row stretch style="${rss({height:30})}"class="${css.menuStyle}">
                    <gap/>
                    <cell shrink align="left">Tutorials and resources</cell>
                    <cell align="right"></cell>
                    <gap/>
                </row>
                <row stretch style="${rss({height:30})}"class="${css.menuStyle}">
                    <gap/>
                    <cell shrink align="left">Feedback</cell>
                    <cell align="right"></cell>
                    <gap/>
                </row>
                <row stretch style="${rss({height:30})}"class="${css.menuStyle}">
                    <gap/>
                    <cell shrink align="left">Future release</cell>
                    <cell align="right"></cell>
                    <gap/>
                </row>
            </div>
        </div>
    `,
    data(){
        return{
            openRecentMenu: false,
            getUIMenu: false,
            exportMenu: false,
            helpMenu: false,
        }
    },
    methods:{
        openRecentHover(){
            this.openRecentMenu = true
        },
        openRecentHoverOff(){
            this.openRecentMenu = false
        },
        getUIHover(){
            this.getUIMenu = true
        },
        getUIHoverOff(){
            this.getUIMenu = false
        },
        exportHover(){
            this.exportMenu = true
        },
        exportHoverOff(){
            this.exportMenu = false
        },
        helpHover(){
            this.helpMenu = true
        },
        helpHoverOff(){
            this.helpMenu = false
        },
    },
});
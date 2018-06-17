import Vue from "vue";
import rinss from "rinss";
import {rss} from "rinss";
import theme from "./theme";
import "./row";
import "./materialSelect";
import processSvg from "./processSvg";
import "./main-menu"

const menuicon = processSvg(require('./icons/hamburger.svg'));
const mobileicon = processSvg(require('./icons/display-size.svg'));
const compileicon = processSvg(require('./icons/right-triangle.svg'));
const exporticon = processSvg(require('./icons/export.svg'));

const css=rinss.create ({
    menuBarTitle:{
        color: theme.textPrimary,
    },
    menuBar:{
        borderBottom: '3px solid ' + theme.background,
        background: theme.white,
        floatTop:0
    },
});

Vue.component('menu-bar',{
    template:`
        <div>
            <main-menu v-if="showMenu"/>
            <row stretch class="${css.menuBar}" style="${rss({height:40})}">
                <gap/>
                <cell shrink><icon @click.native="buttonClick" :style="buttonStyle">
                    ${menuicon}
                </icon></cell>
                <cell><div class="${css.menuBarTitle}">hello</div></cell>
                <gap/>
                <cell shrink><icon>
                    ${mobileicon}
                </icon></cell>
                <gap/>
                <cell shrink><icon>
                    ${compileicon}
                </icon></cell>
                <gap/>
                <cell shrink><icon>
                    ${exporticon}
                </icon></cell>
                <gap/>
            </row>
        </div>   
        
    `,
    data(){
        return{
            showMenu: false
        }
    },
    methods:{
        buttonClick(){
            this.showMenu=!this.showMenu
        },
    },
    computed:{
        buttonStyle(){
            return rss({
                cursor: 'pointer',
                color: (this as any).showMenu ? theme.primary : theme.textPrimary
            })
        }
    }
});
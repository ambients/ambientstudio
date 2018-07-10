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
        textAlign: 'center',
        
    },
    menuBar:{
        borderBottom: '3px solid ' + theme.background,
        background: theme.white,
        floatTop:0,
        height:40,
        width:'100%',
        display:'grid',
        gridTemplateColumns:'10px 20px auto 10px 20px 20px 20px 20px 20px 20px',
        paddingTop:10,
    },
});

Vue.component('menu-bar',{
    template:`
        <div style="${rss({userSelect:'none'})}">
            <main-menu v-if="showMenu"/>
            <div class="${css.menuBar}">
                <div/>
                <icon @click.native="buttonClick" :style="buttonStyle">
                    ${menuicon}
                </icon>
                <div class="${css.menuBarTitle}">hello</div>
                <div/>
                <icon>
                    ${mobileicon}
                </icon>
                <div/>
                <icon>
                    ${compileicon}
                </icon>
                <div/>
                <icon>
                    ${exporticon}
                </icon>
                <div/>
            </div>
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
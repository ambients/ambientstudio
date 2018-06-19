import Vue from "vue";
import rinss, {rss} from "rinss";
import theme from "./theme";
import "./row";
import processSvg from "./processSvg";
import './materialSelect';

const smartphone=require('./icons/smartphone.svg');
const tablet = require('./icons/tablet.svg');
const television =require('./icons/television.svg');
const webpage = require('./icons/webpage.svg');
const customWebpage = require('./icons/custom-webpage.svg');


const css = rinss.create({
    newPageStyle:{
        width: 500,
        height: 300,
        centerX: true,
        centerY: true,
        zIndex:9999,
        background: theme.white,
    },
    newProjectTitle:{
        textAlign:'center',
        floatTop:40,
        fontSize:32,
        width:'100%'
    },
    newProjectFormat:{
        centerX:true,
        floatTop:20,
        display: 'flex',
        flexWrap: 'nowrap',
    },
    newProjectIcons:{
        width:60,
        height:60,
        floatTop:0,
    },
    newProjectButton:{
        floatTop:20,
        width:100,
        height:50,
        centerX:true,
        background:'none',
        border:'none',
        cursor:'pointer',
        color:theme.textPrimary,
        ':hover':{
            color:'blue',
        }
    },
});

Vue.component('NewProject',{
    template:`
        <div class="${css.newPageStyle}">
            <div class="${css.newProjectTitle}">Select Project format</div>
            <div class="${css.newProjectFormat}">
                <div style="${rss({floatLeft:0, margin:20})}">
                    <div class="${css.newProjectIcons}">${smartphone}</div>
                    <select style="${rss({floatTop:0, centerX:true, width: 60, background: 'none', border: 'none', borderBottom:'1px solid ' + theme.background})}">
                    </select>
                </div>
                <div style="${rss({floatLeft:0, margin:20})}">
                    <div class="${css.newProjectIcons}">${tablet}</div>
                    <select style="${rss({floatTop:0, centerX:true, width: 60, background: 'none', border: 'none', borderBottom:'1px solid ' + theme.background})}">
                    </select>
                </div>
                <div style="${rss({floatLeft:0, margin:20})}">
                    <div class="${css.newProjectIcons}">${television}</div>
                    <select style="${rss({floatTop:0, centerX:true, width: 60, background: 'none', border: 'none', borderBottom:'1px solid ' + theme.background})}">
                    </select>
                </div>
                <div style="${rss({floatLeft:0, margin:20})}">
                    <div class="${css.newProjectIcons}">${webpage}</div>
                    <select style="${rss({floatTop:0, centerX:true, width: 60, background: 'none', border: 'none', borderBottom:'1px solid ' + theme.background})}">
                    </select>
                </div>
                <div style="${rss({floatLeft:0, margin:20})}">
                    <div class="${css.newProjectIcons}">${customWebpage}</div>
                    <div style="${rss({display:'flex', floatTop:0, centerX:true})}">
                        <input style="${rss({width: 25, background: 'none', border: 'none', borderBottom:'1px solid ' + theme.background, placeholder:'w',color: theme.textPrimary, fontSize: 10})}">
                        </input>
                        <div style="${rss({fontColor: theme.textPrimary, fontSize: 10})}">x</div>
                        <input style="${rss({width: 25, background: 'none', border: 'none', borderBottom:'1px solid ' + theme.background, placeholder:'h',color: theme.textPrimary, fontSize: 10})}">
                        </input>
                    </div>
                </div>
            </div>
            <button class="${css.newProjectButton}">Start Project</button>
        </div>            
    `
});
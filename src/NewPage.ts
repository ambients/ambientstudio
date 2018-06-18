import Vue from "vue"
import rinss, {rss} from "rinss"
import theme from "./theme"
import "./row"

const css=rinss.create({
    newPageStyle:{
        width:'90%',
        height:'90%',
        absLeft:0,
        absTop:0,
        zIndex:9999,
        border: '3px solid' + theme.background,
    },
    newPageTop:{
        height:'50%',
        width:'100%',
        borderBottom:'3px solid' + theme.background,
    },
    newPageRow:{
        width:'100%',
        height:'50%',
        background: 'blue'
    },
    newPageCell:{
        width:'50%',
        height:'100%',
        background: 'red'
    }
});

Vue.component('NewPage',{
    template:`
        <div class="${css.newPageStyle}">
            <div class="${css.newPageTop}"></div>
            <row stretch class="${css.newPageRow}">
                <cell><div class="${css.newPageCell}"></div></cell>
                <cell><div class="${css.newPageCell}"></div></cell>
            </row>
        </div>            
    `
});
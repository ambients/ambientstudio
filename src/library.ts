import Vue from "vue";
import {rss} from "rinss";
import rinss from "rinss";
import processSvg from "./processSvg";
import theme from "./theme";
import './row';

const plus = processSvg(require('./icons/plus.svg'));
const placeholder = processSvg(require('./icons/placeholder.svg'));

const css=rinss.create({
    outline:{
        background: theme.white,
        width: '100%',
        padding:5,
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
});

Vue.component('LibraryRow',{
    template:`
        <row stretch style="${rss({floatTop:0})}">
            <cell shrink style="cursor:pointer"><icon>
                <slot name="icons"/>
            </icon></cell>
            <cell align = "left"><div style="floatLeft:0">
                <slot/>
            </div></cell>
        </row>
    `
});

Vue.component('library',{
    template:`
        <div class="${css.outline}">
            <LibraryRow><div slot="icons">
                ${plus}
            </div></LibraryRow>
            <div class="${ css.separator }" style="${rss({marginBottom:10})}"></div>
            <LibraryRow><div slot="icons">
                ${placeholder}
            </div>my component</LibraryRow>
        </div>
    `
});
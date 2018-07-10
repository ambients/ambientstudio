import Vue from "vue";
import rinss, { rss } from "rinss";
import "./panels";
import theme from "./theme";
import processSvg from './processSvg';
import Radio from './radio';
import './icon';
import './row';
import './colorPicker';

const borderTopRight = processSvg(require('./icons/border-top-right.svg'));
const borderTop = processSvg(require('./icons/border-top.svg'));
const borderLeft = processSvg(require('./icons/border-left.svg'));
const borderRight = processSvg(require('./icons/border-right.svg'));
const borderBottom = processSvg(require('./icons/border-bottom.svg'));
const borderLine = processSvg(require('./icons/line.svg'));

const css = rinss.create({
    borderColorInput:{
        background:'none',
        border:'none',
        borderBottom:'1px solid black'   
    },
    separator: {
        width: '100%',
        height: 0,
        borderBottom: '1px solid ' + theme.background,
        floatTop: 0,
        margin: 10
    },
    borderColor:{
        floatTop:0,
        width:'100%',
        display: 'grid',
        gridTemplateColumns: '20px 10px 1fr',
    },
    borderStyle:{
        floatTop:0,
        marginBottom:10,
        width:'100%',
        display:'grid',
        gridTemplateColumns:'20px 10px 100px 10px 20px 20px 20px 20px 10px'
    },
    borderRadius:{
        floatTop:0,
        width:'100%',
        display:'grid',
        gridTemplateColumns:'20px 1fr 10px 20px 1fr',
    },
});

Vue.component('border-type',{
    mixins:[Radio],
    template:`
        <icon style="cursor:pointer" :active="isChecked"><slot/></icon>
    `
});

Vue.component('border-panel',{
    template:`
    <panel title="Border" expanded>
        <div class="${css.borderColor}">
            <border-type style="${rss({top:20})}">
                ${borderTop}
            </border-type>
            <div/>
            <material-input placeholder="Top thickness"/>
        </div>
        <div class="${css.borderStyle}">
            <color-picker color="red"/>
            <div/>
            <input class="${css.borderColorInput}" placeholder="Color"/>
            <div/>
            <border-type name="TopBorder">
                ${borderLine}
            </border-type>
            <border-type name="TopBorder">
                ${borderLine}
            </border-type>
            <border-type name="TopBorder">
                ${borderLine}
            </border-type>
            <border-type name="TopBorder">
                ${borderLine}
            </border-type>
            <div/>
        </div>

        <div class="${css.borderColor}">
            <border-type style="${rss({top:20})}">
                ${borderBottom}
            </border-type>
            <div/>
            <material-input placeholder="Bottom thickness"/>
        </div>
        <div class="${css.borderStyle}">
            <color-picker color="red"/>
            <div/>
            <input class="${css.borderColorInput}" placeholder="Color"/>
            <div/>
            <border-type name="BottomBorder">
                ${borderLine}
            </border-type>
            <border-type name="BottomBorder">
                ${borderLine}
            </border-type>
            <border-type name="BottomBorder">
                ${borderLine}
            </border-type>
            <border-type name="BottomBorder">
                ${borderLine}
            </border-type>
            <div/>
        </div>

        <div class="${css.borderColor}">
            <border-type style="${rss({top:20})}">
                ${borderLeft}
            </border-type>
            <div/>
            <material-input placeholder="Left thickness"/>
        </div>
        <div class="${css.borderStyle}">
            <color-picker color="red"/>
            <div/>
            <input class="${css.borderColorInput}" placeholder="Color"/>
            <div/>
            <border-type name="LeftBorder">
                ${borderLine}
            </border-type>
            <border-type name="LeftBorder">
                ${borderLine}
            </border-type>
            <border-type name="LeftBorder">
                ${borderLine}
            </border-type>
            <border-type name="LeftBorder">
                ${borderLine}
            </border-type>
            <div/>
        </div>

        <div class="${css.borderColor}">
            <border-type style="${rss({top:20})}">
                ${borderRight}
            </border-type>
            <div/>
            <material-input placeholder="Right thickness"/>
        </div>
        <div class="${css.borderStyle}">
            <color-picker color="red"/>
            <div/>
            <input class="${css.borderColorInput}" placeholder="Color"/>
            <div/>
            <border-type name="RightBorder">
                ${borderLine}
            </border-type>
            <border-type name="RightBorder">
                ${borderLine}
            </border-type>
            <border-type name="RightBorder">
                ${borderLine}
            </border-type>
            <border-type name="RightBorder">
                ${borderLine}
            </border-type>
            <div/>
        </div>

        <div class="${ css.separator }"></div>

        <div class="${css.borderRadius}">
            <border-type style="${rss({top:20})}">
                ${borderTopRight}
            </border-type>
            <material-input placeholder="Radius"/>
            <div/>
            <border-type style="${rss({rotate:-90, top:20})}">
                ${borderTopRight}
            </border-type>
            <material-input placeholder="Radius"/>
        </div>
        <div class="${css.borderRadius}">
            <border-type style="${rss({top:20, rotate:90})}">
                ${borderTopRight}
            </border-type>
            <material-input placeholder="Radius"/>
            <div/>
            <border-type style="${rss({rotate:180, top:20})}">
                ${borderTopRight}
            </border-type>
            <material-input placeholder="Radius"/>
        </div>
    </panel>
    `,
    props:{
        colorPicked: String
    },
});
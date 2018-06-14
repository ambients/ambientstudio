import Vue from "vue";
import rinss from "rinss";
import "./panels";
import theme from "./theme";
import processSvg from './processSvg';

const borderTopRight = processSvg(require('./icons/border-top-right.svg'));
const borderTop = processSvg(require('./icons/border-top.svg'));
const borderLeft = processSvg(require('./icons/border-left.svg'));
const borderRight = processSvg(require('./icons/border-right.svg'));
const borderBottom = processSvg(require('./icons/border-bottom.svg'));

const colorPalette = require('./icons/font-color.svg');
const borderThickness = require('./icons/thickness.svg');
const borderLine = processSvg(require('./icons/line.svg'));

const css = rinss.create({
    borderIcon:{
        width:40,
        height:40,
        cursor: 'pointer',
        margin: 5,    
    },
    borderRow:{
        floatTop: 0,
        display:'flex',
        width: '100%'
    },
    borderOptions:{
        width:'100%',
        flex:'1 1 auto',
        marginLeft:20
    },
    borderStyle:{
        width:'100%',
        display: 'flex',
        floatTop:0,
    },
    borderInputStyle:{
        width:'100%',
        flex: '1 1 auto',
        display: 'flex',
        background: theme.background,
    },
    borderThickness:{
        flex:'1 1 auto',
        width:'100%',
        display:'flex'
    },
    inputIcons:{
        width:20,
        height:20,
        marginLeft:5,
        cursor: 'pointer'
    },
    borderThicknessInput:{
        flex:'1 1 auto',
        width:'100%',
        border: 'none',
        background: 'none'
    },
    borderType:{
        width:'100%',
        floatTop:0,
        display:'flex',
    },
    borderTypeTable:{

    },
    separator: {
        width: '100%',
        height: 0,
        borderBottom: '1px solid ' + theme.background,
        floatTop: 0,
        marginBottom: 10
    },
    rotation:{
        svg:{
            rotate: -90,
        }
    },
    rotation2:{
        svg:{
            rotate: -180,
        }
    },
    rotation3:{
        svg:{
            rotate: -270,
        }
    }
});

Vue.component('border-icon',{
    template:`
        <div class="${css.borderIcon}" :style="getStyle()" @click="toggleSelected()"><slot></slot></div>
    `,
    data: function() {return{
        iconColor: false
    }},
    methods: {
        toggleSelected: function() :void{
            this.iconColor=!this.iconColor;
        },
        getStyle: function() :string {
            return rinss.compile({
                color: (this.iconColor) ? theme.primary : theme.textPrimary
            });
        }
    }
});

const borderStyleName ={value: ''};

Vue.component('input-icon',{
    template:`
        <div class="${css.inputIcons}" :style="getType()" @click="toggleSelect()"><slot></slot></div>
    `,
    props: {
        name: String,
    },
    data: function() {return{
        borderStyleName: borderStyleName
    }},
    methods:{
        toggleSelect: function() :void{
            if (this.borderStyleName.value === this.name)
                this.borderStyleName.value = '';
            else
                this.borderStyleName.value = this.name;
            },
        getType: function() :string {
            return rinss.compile({
                color: (this.borderStyleName.value === this.name) ? theme.primary : theme.textPrimary
            });
        }
    }
});

Vue.component('border-card',{
    template:`
        <div class="${css.borderRow}">
            <border-icon rotation><slot></slot></border-icon>
            <div class="${css.borderOptions}">
                <div class="${css.borderStyle}">
                    <div class="${css.borderInputStyle}">
                        <div class="${css.borderThickness}">
                            <input-icon>${borderThickness}</input-icon>
                            <input class="${css.borderThicknessInput}" :placeholder="name"></input>
                        </div>
                    </div>
                    <input-icon>${colorPalette}</input-icon>
                </div>
                <div class="${css.borderType}">
                    <table class="${css.borderTypeTable}">
                        <tr>
                            <td align="center"><input-icon name="L1">${borderLine}</input-icon></td>
                            <td align="center"><input-icon name="L2">${borderLine}</input-icon></td>
                            <td align="center"><input-icon name="L3">${borderLine}</input-icon></td>
                            <td align="center"><input-icon name="L4">${borderLine}</input-icon></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    `,
    props: {
        name: String,
    },
});

Vue.component('border-panel',{
    template:`
    <panel title="Border" expanded>
        <border-card name=" top thickness">${borderTop}</border-card>
        <border-card name=" left thickness">${borderLeft}</border-card>
        <border-card name=" right thickness">${borderRight}</border-card>
        <border-card name=" bottom thickness">${borderBottom}</border-card>
        
        <div class="${ css.separator }"></div>

        <border-card name=" top right radius">${borderTopRight}</border-card>
        <border-card name=" top left radius" class="${css.rotation}">${borderTopRight}</border-card>
        <border-card name=" bottom right radius" class="${css.rotation2}">${borderTopRight}</border-card>
        <border-card name=" bottom left radius" class="${css.rotation3}">${borderTopRight}</border-card>
        
    </panel>
    `
});
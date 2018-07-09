import Vue from "vue";
import rinss, {rss} from "rinss";
import theme from "./theme";
import './outline';
import Radio from './radio';
import './library';

const css = rinss.create({
    container: {
        background: theme.white,
        userSelect:'none',
        display:'grid',
        gridTemplateRows: '40px 1fr',
        borderRight: '3px solid ' + theme.background,
    },
    libraryMenu:{
        width:200,
        background: theme.white,
        borderBottom: '3px solid ' + theme.background,
        borderRight: '3px solid ' + theme.background,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        paddingLeft: 10,
        paddingRight: 10
    },
    libraryMenuTitles:{
        cursor: 'pointer',
        fontSize: 13,
        verticalAlign: 'middle',
        lineHeight: 40
    },
});

Vue.component ('libraryMenuTitle', {
    mixins: [Radio],
    template:`
        <div class="${css.libraryMenuTitles}" :style="computedStyle"><slot/></div>
    `,
    computed:{
        computedStyle():string {
            return rss({
                color:(this as any).isChecked? theme.primary : theme.textPrimary,
            })
        }
    },
})

Vue.component('libraries', {
    template: `
        <div class="${ css.container }">
            <div class="${css.libraryMenu}">
                <libraryMenuTitle
                 name="libraryMenuTitle" @check="selected = 'outline'" checked>
                    Outline
                </libraryMenuTitle>
                <libraryMenuTitle
                 name="libraryMenuTitle" @check="selected = 'library'">
                    Library
                </libraryMenuTitle>
                <libraryMenuTitle
                 name="libraryMenuTitle" @check="selected = 'components'">
                    Components
                </libraryMenuTitle>
            </div>
            <div>
                <outline v-if="selected === 'outline'"/>
                <library v-if="selected === 'library'"/>
                <library v-if="selected === 'components'"/>
            </div>
        </div>
    `,
    data() {
        return {
            selected: ''
        };
    }
});
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
    },
    libraryMenu:{
        width:200,
        background: theme.white,
        borderBottom: '3px solid ' + theme.background,
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
        <div class="${css.libraryMenuTitles}" @click="check" :style="computedStyle" :active="isChecked"><slot/></div>
    `,
    computed:{
        computedStyle(){
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
                <libraryMenuTitle name="test" checked @check="titleChecked = 'outline'">Outline</libraryMenuTitle>
                <libraryMenuTitle name="test" @check="titleChecked = 'library'">Library</libraryMenuTitle>
                <libraryMenuTitle name="test" @check="titleChecked = 'components'">Components</libraryMenuTitle>
            </div>
            <div>
                <outline v-if="titleChecked === 'outline'"/>
                <library v-if="titleChecked === 'library'"/>
                <library v-if="titleChecked === 'components'"/>
            </div>
        </div>
    `,
    data() {
        return {
            titleChecked: ''
        };
    }
});
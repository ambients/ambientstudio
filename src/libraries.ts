import Vue from "vue";
import rinss, {rss} from "rinss";
import theme from "./theme";
import './outline';
import Radio from './radio';
import './library';

const css = rinss.create({
    container: {
        background: theme.white,
        width: 200,
        height:'100%',
        userSelect:'none',
        display:'grid',
        gridTemplateRows: '60px 1fr',
    },
    libraryMenu:{
        width:200,
        background: theme.white,
        borderRight: '3px solid ' + theme.background,
        borderBottom: '3px solid ' + theme.background,
        overflowX: 'scroll',
        overflowY: 'hidden',
        whiteSpace: 'nowrap',
    },
    libraryMenuTitles:{
        display: 'inline-block',
        position: 'relative',
        margin: 10,
        cursor: 'pointer',
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
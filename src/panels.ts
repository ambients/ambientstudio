import Vue from "vue";
import { rinss } from "rinss";

const css = rinss.create({
    panels: {
        width: 250,
        height: '100%',
        background: 'rgb(247, 247, 247)',
        absRight: 0,
        absTop: 0,
        overflowX: 'hidden',
        overflowY: 'scroll',
        userSelect: 'none',
        boxShadow: '0 19px 38px rgba(0,0,0,0.10), 0 15px 12px rgba(0,0,0,0.05)'
    },
    panel: {
        width: '100%',
        floatTop: 0,
        borderBottom: '1px solid rgb(228, 228, 228)',
        padding: 20,
        overflow: 'hidden'
    },
    title:{
        width: '100%',
        floatTop: 0,
        color: '#c0c0c0',
        fontSize: 13,
        fontWeight: 'bold',
    },
    container: {
        width: '100%'
    }
});

Vue.component('panels', {
    template: `
        <div class="${ css.panels }"><slot></slot></div>
    `
});

Vue.component('panel', {
    template: `
        <div class=${ css.panel }>
            <div class=${ css.title } @click="toggleCollapse()">{{title}}</div>
            <div class=${ css.container } :style="getStyle()"><slot></slot></div>
        </div>
    `,
    props: {
        collapsed: Boolean,
        title: String
    },
    data: function(){ return {
        isCollapsed: this.collapsed,
    }},
    methods: {
        toggleCollapse: function() {
            this.isCollapsed = !this.isCollapsed
        },
        getStyle: function() {
            if (this.isCollapsed) return rinss.compile({
                height: { to: 0 },
                floatTop: { to: 0 },
                opacity: { to: 0 }
            });
            else return rinss.compile({
                height: { to: 'auto', el: this.$el },
                floatTop: { to: 10 },
                opacity: { to: 1 }
            });
        }
    }
});
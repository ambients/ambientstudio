import Vue from "vue";
import { rinss } from "rinss";

const css = rinss.create({
    panels: {
        width: 250,
        height: '100vh',
        background: 'rgb(247, 247, 247)',
        absRight: 0,
        absTop: 0,
        overflowX: 'hidden',
        overflowY: 'scroll',
        userSelect: 'none'
    },
    panel: {
        width: '100%',
        height: 300,
        floatTop: 0,
        borderBottom: '1px solid rgb(228, 228, 228)',
        background: 'rgb(247, 247, 247)',
        padding: 10,
        color: 'rgb(177, 177, 177)',
        fontSize: 14
    },
    titleBar:{
        width: '100%',
        height: 30,
        background: 'rgb(247, 247, 247)'
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
            <div class=${ css.titleBar } @click="collapse()"><slot></slot></div>
        </div>
    `,
    props: {
        collapsed: Boolean
    },
    data: function(){ return {
        isCollapsed: this.collapsed
    }},
    mounted: function() {
        if (this.isCollapsed) rinss.inline(this.$el, { height: 30 });
        else rinss.inline(this.$el, { height: 300 });
    },
    methods: {
        collapse: function(){
            if (this.isCollapsed) {
                rinss.inline(this.$el, {
                    height: { to: 300 }
                });
                this.isCollapsed = false;
            }
            else {
                rinss.inline(this.$el, {
                    height: { to: 30 }
                });
                this.isCollapsed = true;
            }
        }
    }
});
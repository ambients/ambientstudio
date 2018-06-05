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
        color: '#999999',
        fontSize: 13,
        fontWeight: 'bold',
    },
    container: {
        width: '100%',
        floatTop: 10
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
            <div class=${ css.title } @click="collapse()">{{title}}</div>
            <div class=${ css.container }><slot></slot></div>
        </div>
    `,
    props: {
        collapsed: Boolean,
        title: String
    },
    data: function(){ return {
        isCollapsed: this.collapsed,
        titleHeight: 0
    }},
    mounted: function() {
        const padding = parseFloat(rinss.computed(this.$el, 'padding'));
        this.titleHeight = this.$el.querySelector('.' + css.title).clientHeight + (padding * 2);
        if (this.isCollapsed) rinss.inline(this.$el, { height: this.titleHeight });
    },
    methods: {
        collapse: function(){
            const containerHeight = this.$el.querySelector('.' + css.container).clientHeight;
            const padding = parseFloat(rinss.computed(this.$el, 'padding'));

            if (this.isCollapsed) {
                rinss.inline(this.$el, {
                    height: { from: this.titleHeight, to: containerHeight + this.titleHeight + padding }
                });
                this.isCollapsed = false;
            }
            else {
                rinss.inline(this.$el, {
                    height: { from: containerHeight + this.titleHeight + padding, to: this.titleHeight }
                });
                this.isCollapsed = true;
            }
        }
    }
});
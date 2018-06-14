import Vue from "vue";
import rinss from "rinss";

const css = rinss.create({
    panels: {
        width: 300,
        height: '100%',
        background: 'rgb(247, 247, 247)',
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
        cursor: 'pointer',
        textAlign: 'left'
    },
    container: {
        width: '100%',
        height: 0,
        floatTop: 0,
        opacity: 0
    }
});

Vue.component('panels', {
    template: `
        <div class="${ css.panels }"><slot/></div>
    `
});

Vue.component('panel', {
    template: `
        <div class=${ css.panel }>
            <div class=${ css.title } @click="collapsed=!collapsed">{{title}}</div>
            <div ref="container" class=${ css.container }><slot/></div>
        </div>
    `,
    props: {
        title: String,
        expanded: Boolean
    },
    data() {
        return {
            collapsed: true,
        };
    },
    mounted() {
        if (this.expanded) this.collapsed = false;
    },
    watch: {
        collapsed(collapsed) {
            rinss.inline(this.$refs.container as Element, {
                height: { to: collapsed ? 0 : 'auto' },
                floatTop: { to: collapsed ? 0 : 10 },
                opacity: { to: collapsed ? 0 : 1, then: ()=>{
                    rinss.inline(this.$refs.container as Element, {
                        pointerEvents: collapsed ? 'none' : 'auto'
                    });
                }}
            });
        }
    }
});
import Vue from "vue";
import { rinss } from "rinss";

const css = rinss.create({
    toolbar: {
        width: 50,
        height: '100vh',
        background: 'rgb(247, 247, 247)',
        absLeft: 0,
        absTop: 0,
        overflow: "hidden"
    },
    toolbarSection: {
        width: '100%',
        paddingTop: 10,
        paddingBottom: 10,
        floatTop: 0
    },
    toolbarButton: {
        width: '100%',
        height: 50,
        floatTop: 0
    },
    icon: {
        width: 25,
        centerX: true,
        centerY: true
    }
});

Vue.component('toolbar-button', {
    template: `
        <div class="${ css.toolbarButton }">
            <img class="${ css.icon }" :src="src"></img>
        </div>
    `,
    props: ['src']
});

Vue.component('toolbar-section', {
    template: `
        <div class="${ css.toolbarSection }"><slot></slot></div>
    `
});

Vue.component('toolbar', {
    template: `
        <div class="${ css.toolbar }"><slot></slot></div>
    `
});


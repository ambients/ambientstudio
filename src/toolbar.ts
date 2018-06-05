import Vue from "vue";
import { rinss } from "rinss";

const css = rinss.create({
    toolbar: {
        width: 50,
        height: '100%',
        background: 'rgb(247, 247, 247)',
        absLeft: 0,
        absTop: 0,
        overflow: "hidden",
        boxShadow: '0 19px 38px rgba(0,0,0,0.10), 0 15px 12px rgba(0,0,0,0.05)'
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
        width: 20,
        centerX: true,
        centerY: true
    }
});

const nameSelected = { value: '' };

Vue.component('toolbar-button', {
    template: `
        <div class="${ css.toolbarButton }">
            <img class="${ css.icon }" :src="getSrc(name, getSelected())" @click="select()"></img>
        </div>
    `,
    props: {
        name: String,
        selected: Boolean
    },
    data: function() { return {
        nameSelected: nameSelected
    }},
    mounted: function() {
        if (this.selected) this.nameSelected.value = this.name;
    },
    methods: {
        getSrc: function(str, filled) {
            return 'icons/' + str + (filled ? '-filled' : '') + '.svg';
        },
        getSelected: function() {
            return this.name === this.nameSelected.value;
        },
        select: function() {
            this.nameSelected.value = this.name;
        }
    }
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


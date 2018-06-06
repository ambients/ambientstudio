import Vue from "vue";
import { rinss } from "rinss";
import "./panels";

const css = rinss.create({
    fontRow: {
        display: 'flex',
        flowTop: 0,
        width: '100%'
    },
    fontMenu: {
        overflow: 'hidden',
        flow: '1 1 auto',
        height: 20,
        width: '70%',
        background: 'red'
    },
    fontSize: {
        flow: '1 1 auto',
        height: 20,
        width: '30%',
        background:'blue',
        marginLeft: 10
    },
});

Vue.component('typography-panel',{
    template: `
    <panel title="typography" expanded>
        <div class="${css.fontRow}">
            <div class="${css.fontMenu}"></div>
            <input class="${css.fontSize}"></input>
        </div>
    </panel>
    `
});
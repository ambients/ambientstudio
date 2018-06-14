import Vue from 'vue';
import './row';
import './icon';

Vue.component('icon-slot', {
    template: `
        <div><row>
            <cell shrink><slot name="icon"/></cell>
            <gap size="2px"/>
            <cell align="left"><slot/></cell>
        </row></div>
    `
});
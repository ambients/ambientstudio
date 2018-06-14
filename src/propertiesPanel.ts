import Vue from "vue";
import "./panels";
import "./materialInput";

Vue.component('properties-panel', {
    template: `
        <panel title="Properties" :expanded="expanded">
            <material-input placeholder="Element id"/>
            <material-input placeholder="Element class"/>
        </panel>
    `,
    props: {
        expanded: Boolean
    }
});
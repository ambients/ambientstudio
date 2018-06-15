import Vue from "vue";
import rinss, { rss } from "rinss";

const css = rinss.create({
    label: {
        fontSize: 13,
        important: true
    },
    wrapper: {
        width: '100%'
    },
    field: {
        marginBottom: 10,
        important: true
    },
    select: {
        input: {
            fontSize: 13,
            important: true
        }
    }
});

Vue.component('material-select', {
    template: `
        <div class="${ css.wrapper }">
            <md-field class="${ css.field }">
                <label class="${ css.label }">{{placeholder}}</label>
                <md-select class="${ css.select }" v-model="selected">
                    <md-option v-for="(o, index) of options" :value="o" :key="index">{{o}}</md-option>
                </md-select>
                <select style="${ rss({ fillParent: true, opacity: 0, cursor: 'pointer' }) }" v-model="selected">
                    <option v-for="o of options" :value="o">{{o}}</option>
                </select>
            </md-field>
        </div>
    `,
    props: {
        placeholder: String,
        options: Array,
    },
    data() {
        return {
            selected: ''
        }
    }
});
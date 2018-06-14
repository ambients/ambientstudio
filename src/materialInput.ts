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
    input: {
        fontSize: 13,
        important: true
    }
});

Vue.component('material-input', {
    template: `
        <div class="${ css.wrapper }" :style="computedStyle">
            <md-field class="${ css.field }">
                <label class="${ css.label }">{{placeholder}}</label>
                <md-input class="${ css.input }"
                 :value="value"
                 @change.native="$emit('input', $event.target.value)"/>
            </md-field>
        </div>
    `,
    props: {
        placeholder: String,
        value: String
    },
    data() {
        return {
            width: ''
        };
    },
    mounted() {
        this.width = this.$el.clientWidth + 'px';
    },
    computed: {
        computedStyle():string {
            return rss({ width: this.width });
        }
    }
});
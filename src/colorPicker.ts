import Vue from 'vue';
import rinss, { rss } from 'rinss';
import theme from './theme';

const css = rinss.create({
    colorPicker: {
        borderRadius: 3,
        border: '1px solid ' + theme.textPrimary,
        position: 'relative',
        cursor: 'pointer',
        '>div': {
            width: '75%',
            height: '75%',
            centerX: true,
            centerY: true,
            border: '1px solid ' + theme.textPrimary
        }
    }
});

Vue.component('color-picker', {
    template: `
        <div class="${ css.colorPicker }" :style="outerStyle">
            <div :style="innerStyle"/>
        </div>
    `,
    props: {
        color: String,
        size: {
            type: String,
            default: '20px'
        }
    },
    computed: {
        outerStyle():string {
            return rss({ width: this.size, height: this.size });
        },
        innerStyle(): string {
            return rss({ background: this.color });
        }
    }
});
import Vue from 'vue';
import rinss, { rss } from 'rinss';
import theme from './theme';

const css = rinss.create({
    hideFirstChild: {
        svg: {
            ':first-child:not(:last-child)': {
                display: 'none'
            }
        }
    },
    hideLastChild: {
        svg: {
            ':last-child:not(:first-child)': {
                display: 'none'
            }
        }
    }
});

Vue.component('icon', {
    template: `
        <div :class="computedClass" :style="computedStyle"><slot/></div>
    `,
    props: {
        size: {
            type: String,
            default: '20px'
        },
        active: Boolean
    },
    computed: {
        computedClass():string {
            return this.active ? css.hideFirstChild : css.hideLastChild
        },
        computedStyle():string {
            return rss({
                width: this.size,
                height: this.size,
                color: this.active ? theme.primary : theme.textPrimary
            });
        }
    }
});
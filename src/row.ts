import Vue from 'vue';
import rinss, { rss } from 'rinss';

const css = rinss.create({
    shrink: {
        whiteSpace: 'nowrap',
        width: 1
    },
    grow: {
        whiteSpace: 'nowrap',
        '>*': {
            width: '100%',
        }
    },
    auto: {
        whiteSpace: 'nowrap'
    }
});

Vue.component('cell', {
    template: `
        <td align="center" :class="computedClass"><slot/></td>
    `,
    inject: {
        stretch: { default: false }
    },
    props: {
        shrink: Boolean
    },
    computed: {
        computedClass():string {
            return this.shrink ? css.shrink : ((this as any).stretch ? css.grow : css.auto);
        }
    }
});

Vue.component('gap', {
    template: `
        <td align="center" class="${ css.shrink }"><div :style="computedStyle"/></td>
    `,
    props: {
        size: {
            type: String,
            default: '10px'
        }
    },
    computed: {
        computedStyle():string {
            return rss({ width: this.size, height: '100%' });
        }
    }
});

Vue.component('row', {
    template: `
        <table :style="tableStyle"><tr><slot/></tr></table>
    `,
    props: {
        stretch: Boolean,
        stretchy: Boolean
    },
    provide() {
        return {
            stretch: this.stretch
        };
    },
    computed: {
        tableStyle() {
            return rss({
                width: this.stretch ? '100%' : 'auto',
                height: this.stretchy ? '100%' : 'auto',
                borderCollapse: 'collapse'
            });
        }
    }
});
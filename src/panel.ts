import Vue from "vue";
import { rinss } from "rinss";

const css = rinss.create({
    panel: {
        width: '100%',
        height: 30,
        floatTop: 0,
        borderTop: '2px solid rgb(228, 228, 228)',
        background: 'rgb(247, 247, 247)',
        padding: 10,
        color: 'rgb(177, 177, 177)',
        fontSize: 14
    },
    titleBar:{
        width: '100%',
        height: 30,
        background: 'rgb(247, 247, 247)'
    }
});

Vue.component('panel', {
    template: `
        <div class=${ css.panel }>
            <div class=${ css.titleBar } @click="collapse()"><slot></slot></div>
        </div>
    `,
    data: function(){ return {
        folded: true
    }},
    methods: {
        collapse: function(){
            if (this.folded) {
                rinss.inline(this.$el, {
                    height: { to: 300 }
                });
                this.folded = false;
            }
            else {
                rinss.inline(this.$el, {
                    height: { to: 30 }
                });
                this.folded = true;
            }
        }
    }
});
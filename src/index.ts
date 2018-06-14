import "normalize.css";
import "babel-polyfill";

import Vue from "vue";
import rinss from "rinss";
import Modal from 'ambients-modal';
import { Sketch } from 'vue-color';
import { Obj } from "ambients-utils";

import VueResize from 'vue-resize';
Vue.use(VueResize);

import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import 'vue-material/dist/theme/default.css';
Vue.use(VueMaterial);

import AsyncComputed from 'vue-async-computed';
Vue.use(AsyncComputed)
declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        asyncComputed?: Obj<Function>
    }
}

Vue.mixin({
    methods: {
        $emitState(name:string, value?:any):void {
            this.$emit(name, value);
            (this.$stateValue || (this.$stateValue = {}))[name] = value;
            (this.$stateEmitted || (this.$stateEmitted = {}))[name] = true;
        },
        $onState(name:string, cb:(value:any)=>void):void {
            if ((this.$stateEmitted || (this.$stateEmitted = {}))[name])
                cb.call(this, (this.$stateValue || (this.$stateValue = {}))[name]);

            this.$on(name, cb);
        }
    }
});
declare module 'vue/types/vue' {
    interface Vue {
        $stateEmitted: Obj<boolean>,
        $stateValue: Obj<any>,
        $emitState: (name:string, value?:any)=>void,
        $onState: (name: string, cb: (value: any) => void)=>void
    }
}

import './panels';
import './propertiesPanel';
import './positionPanel';
import './toolbar';
import './typographyPanel';

rinss.config({ duration: 250 });

const container = document.createElement('div');
document.body.appendChild(container);

rinss.inline(document.body, {
    overflow: 'hidden',
    fontFamily: '"Arial", "sans-serif"'
});

const css = rinss.create({
    stage: {
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0
    },
    test: {
        width: 100,
        height: 100,
        background: 'red',
        floatTop: 10
    },
    colorPickerModal: {
        zIndex: 9999,
        boxShadow: '0 19px 38px rgba(0,0,0,0.10), 0 15px 12px rgba(0,0,0,0.05)'
    },
    sketchPicker: {
        userSelect: 'none'
    }
});

const colorPicker = {
    show: false,
    color: {
        hex: '#ff0000'
    },
    left: 0,
    top: 0
};

const textColorPicker = {
    show: false,
    color: {
        hex: '#000000'
    },
    left: 0,
    top: 0
};

new Vue({
    el: container,
    components: {
        'modal': Modal,
        'sketch-picker': Sketch
    },
    template: `
        <div class="${ css.stage }">
            <panels>
                <properties-panel expanded/>
                <position-panel expanded/>
                <typography-panel
                 @showColorPicker="showTextColorPicker"
                 :colorPicked="textColorPicker.color.hex"
                 expanded/>
                <panel title="Backgrounds"/>
                <panel title="Effects"/>
            </panels>
            <toolbar @showColorPicker="showColorPicker" :colorPicked="colorPicker.color.hex"/>
            <modal class="${ css.colorPickerModal }"
             v-if="colorPicker.show"
             :left="colorPicker.left"
             :top="colorPicker.top"
             @close="colorPicker.show=false">
                <sketch-picker class="${ css.sketchPicker }" v-model="colorPicker.color"/>
            </modal>
            <modal class="${ css.colorPickerModal}"
             v-if="textColorPicker.show"
             :left="textColorPicker.left"
             :top="textColorPicker.top"
             @close="textColorPicker.show=false">
                <sketch-picker class="${ css.sketchPicker }" v-model="textColorPicker.color"/>
            </modal>
        </div>
    `,
    data() {
        return {
            colorPicker,
            textColorPicker
        }
    },
    methods: {
        showColorPicker(e:PointerEvent) {
            this.colorPicker.left = e.clientX;
            this.colorPicker.top = e.clientY;
            this.colorPicker.show = true;
        },
        showTextColorPicker(e:PointerEvent) {
            this.textColorPicker.left = e.clientX;
            this.textColorPicker.top = e.clientY;
            this.textColorPicker.show = true;
        }
    }
});
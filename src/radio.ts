import Vue from 'vue';
import { identify, Obj } from 'ambients-utils';

const checkedMap:Obj<Obj<any>> = {};

export default Vue.extend({
    props: {
        name: String,
        checked: Boolean
    },
    data() {
        return {
            checkedMap: checkedMap[this.name] || (checkedMap[this.name] = { id: '' }),
            isChecked: this.checked
        };
    },
    methods: {
        check() {
            this.checkedMap.id = identify(this);
        }
    },
    watch: {
        'checkedMap.id'(id) {
            this.isChecked = id === identify(this);
        },
        isChecked: {
            immediate: true,
            handler(val) {
                this.$emit(val ? 'check' : 'uncheck');
            }
        }
    }
});
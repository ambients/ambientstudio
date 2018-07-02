import Vue from 'vue';

export default Vue.extend({
    props: {
        name: String,
        checked: Boolean
    },
    data() {
        return {
            isChecked: this.checked
        };
    },
    watch: {
        isChecked: {
            immediate: true,
            handler(val) {
                if (val) this.$emit('check');
            }
        }
    },
    mounted() {
        this.$el.addEventListener('click', () => this.isChecked = !this.isChecked);
    }
});
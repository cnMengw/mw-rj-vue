export default {
    computed: {},
    data() {
        return {
            hello: 'hello minx'
        };
    },
    created() {},
    methods: {
        showError(info) {
            this.$store.commit('setIsError', true);
            this.$store.commit('setErrorInfo', info || '');
        },
        recoverError() {
            const errorInfo = {
                type: 4,
                msg: '',
                isReload: false
            };
            this.$store.commit('setIsError', false);
            this.$store.commit('setErrorInfo', errorInfo);
        }
    },
    mounted() {},
    components: {},
    destroy() {}
};

<template>
    <div id="app">
        <router-view />
    </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';
export default {
    name: 'App',
    props: {},
    computed: {
        ...mapGetters(['isReady', 'isLogin', 'isError', 'errorInfo'])
    },
    data() {
        return {};
    },
    watch: {
        $route(to) {
            if (to.meta.title) {
                window.document.title = to.meta.title;
            }
            window.$mvvm.recoverError();
        }
    },
    created() {},
    methods: {},
    mounted() {},
    destroy() {}
};
</script>

<style lang="scss" type="text/scss">
html,body,#app {
    width: 100%;
    height: 100%;
    overflow: auto;
}
</style>

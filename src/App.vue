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
    #app {
    width: 100%;
    height: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    .login-windows {
        width: 100%;
    }
}
.xdf-loading-spinner{
    margin: 150px auto 0 auto;
    text-align: center;
    font-size:32px;
}
</style>

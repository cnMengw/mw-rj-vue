<!-- 获取下载链接 -->
<template>
    <div class="index-mock">
        <div class="down" @click="getdownUrl">获取下载链接</div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: 'index',
    data() {
        return {
            resD: [],
            circleD: []
        };
    },
    created() {
        this.init();
    },
    methods: {
        init() {},
        getdownUrl() {}
    }
};
</script>

<style lang="scss" type="text/scss" scoped>
.index-mock{
    display: flex;
    padding: 32px;
}
</style>
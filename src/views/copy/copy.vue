<template>
    <div class="index-mock">
        <div class="down" @click="copyDom">复制</div>
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
        copyDom() {
            let res1 = {
                "status": 200,
                "msg": "ok",
            }
            this.xdfUtil.copyText(JSON.stringify(res1), '.down', () => {
            })
            console.log(JSON.stringify(data))
        }
    }
};
</script>

<style lang="scss" type="text/scss" scoped>
.index-mock{
    display: flex;
    padding: 32px;
}
</style>
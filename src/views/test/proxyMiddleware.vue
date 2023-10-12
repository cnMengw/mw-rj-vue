<!-- 代理 -->
<template>
    <div id="index">
        <div @click="handData">处理数据</div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: 'index',
    data() {
        return {
            klines: [],
            lessKlin: []
        };
    },
    created() {
        // this.init();
    },
    methods: {
        handData() {
            this.xdfAxios({
                url: `/prodHuo/api-website/v2/component/info/0201003810`,
                method: 'get',
                params: {}
            }).then(res => {
                console.log(res, 'res--');
            });
        }
    }
};
</script>

<style lang="scss" type="text/scss" scoped>
.row-item{
    display: flex;
    padding: 32px;
    border-bottom: 1px solid red;
    .row{
        display: flex;
        width: 200px;
        .lable{
            width: 140px;
        }
    }
}

#index {
    height: 100%;
    overflow: auto;
}
</style>

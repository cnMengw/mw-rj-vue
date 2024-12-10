<template>
    <div class="index-mock">
        <div class="down" @click="handleXunLeiDownload">图片下载-并压缩成zip</div>
        <div>如果pdf下载注意跨域</div>
    </div>
</template>


<script type="text/ecmascript-6">
import downZip from './mock';
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
        init() {
            
        },
        handleXunLeiDownload() {
            let fileArr = [
                {"name":"yangweijian@xdf.cn","url":"https://cfiles.xdf.cn/48fee902-8881-4243-b8cb-39086388849d.jpeg"},{"name":"gaoyulin1@xdf.cn","url":"https://cfiles.xdf.cn/f4b4befc-4551-4b11-878f-176f202df896.jpeg"},{"name":"yangxi48@xdf.cn","url":"https://cfiles.xdf.cn/85ca8abb-4e22-44d4-bf79-f83aa8a19c78.jpeg"},{"name":"yangxiaofang13@xdf.cn","url":"https://cfiles.xdf.cn/cc3be4f8-978b-44e8-b391-f573d855d092.jpeg"},{"name":"changyuan16@xdf.cn","url":"https://cfiles.xdf.cn/ef70a21e-7a52-4484-995f-0ce5c651d50d.jpeg"},{"name":"zhangyunuo3@xdf.cn","url":"https://cfiles.xdf.cn/c175e1f0-87c8-4415-95a6-62ba1489c4f7.jpeg"},{"name":"geyanzhi@xdf.cn","url":"https://cfiles.xdf.cn/3222b527-e885-4f6a-a798-84155784f2e4.jpeg"},{"name":"guoshuangfan@xdf.cn","url":"https://cfiles.xdf.cn/7ff6cc42-31d8-457b-9b57-bf62d30a4140.jpeg"},{"name":"tangfangyan@xdf.cn","url":"https://cfiles.xdf.cn/00238eb2-6278-4c32-ae47-71a9be38a0b8.jpeg"},{"name":"liuxiaoqing25@xdf.cn","url":"https://cfiles.xdf.cn/cb0b737b-c569-4582-b7b3-520646205bf5.jpeg"},{"name":"dingzi@xdf.cn","url":"https://cfiles.xdf.cn/f7b24ca0-201b-47c3-b35a-c614d4b77740.jpeg"},{"name":"liuhuanhuan21@xdf.cn","url":"https://cfiles.xdf.cn/ab49aed5-4780-4bb2-99f1-cac6daabe655.jpeg"},{"name":"luominglin1@xdf.cn","url":"https://cfiles.xdf.cn/457927a5-5d3c-4643-8c5c-a17b1a702d68.jpeg"},{"name":"zhangyu410@xdf.cn","url":"https://cfiles.xdf.cn/a310a43c-4431-43a0-85ac-81a6bba0aa02.jpeg"},{"name":"liuyixiao3@xdf.cn","url":"https://cfiles.xdf.cn/9a670329-ec79-480b-be7f-7143351537e5.jpeg"},{"name":"zhuanglili1@xdf.cn","url":"https://cfiles.xdf.cn/b1fad0e0-fdd9-4f41-8b30-ed4440b2762b.jpeg"},{"name":"lukai2@xdf.cn","url":"https://cfiles.xdf.cn/9e664782-054d-4165-a1fa-60570b0bf50f.jpeg"},{"name":"wangyuehua6@xdf.cn","url":"https://cfiles.xdf.cn/32e3c1fb-32cb-4ca5-ac37-fc7ac96dbd1f.jpeg"},{"name":"raojin@xdf.cn","url":"https://cfiles.xdf.cn/654009c6-da8e-4458-8949-a4eef125676a.jpeg"},{"name":"guandongxing@xdf.cn","url":"https://cfiles.xdf.cn/3602d049-557a-4bd6-ba28-43c72be054a5.jpeg"},{"name":"wanglongbo@xdf.cn","url":"https://cfiles.xdf.cn/097e7098-fa5a-4f8e-a5c8-0423e3f9edd8.jpeg"},{"name":"tangkai9@xdf.cn","url":"https://cfiles.xdf.cn/3a7c8afa-a2fe-47e0-a1b4-559fda70b0c0.jpeg"},{"name":"shiwenqiang2@xdf.cn","url":"https://cfiles.xdf.cn/bd28ea62-8064-4e1a-b758-19e34327b46f.jpeg"},{"name":"zhangbin49@xdf.cn","url":"https://cfiles.xdf.cn/66fea897-443c-4cd3-b87d-9f8fdaf22e3d.jpeg"},{"name":"liqianru1@xdf.cn","url":"https://cfiles.xdf.cn/5bdd6bb4-bf4e-4971-a7a6-10a4ca0b40b1.jpeg"},{"name":"konglei1@xdf.cn","url":"https://cfiles.xdf.cn/5dc73241-88e7-495f-8019-4e563763511d.jpeg"},{"name":"jiangsiyu12@xdf.cn","url":"https://cfiles.xdf.cn/7560efe9-cea6-4b64-a3df-df8cf4199f23.jpeg"},{"name":"fengfeiyu@xdf.cn","url":"https://cfiles.xdf.cn/1a9ede4c-1f66-4c00-8b1c-2da466b686e2.jpeg"},{"name":"miaochao@xdf.cn","url":"https://cfiles.xdf.cn/b49431f7-00be-4679-8097-548de50f4e37.jpeg"},{"name":"zhangwenxiao2@xdf.cn","url":"https://cfiles.xdf.cn/b5974a70-c2a8-4da1-865d-1f2487c4d9a7.jpeg"},{"name":"lina251@xdf.cn","url":"https://cfiles.xdf.cn/b5a24c41-f4b8-44df-87eb-fe329609ccbc.jpeg"},{"name":"chenbin33@xdf.cn","url":"https://cfiles.xdf.cn/6ad5ffa0-19a8-4acf-9569-08d2b93dfa7a.jpeg"},{"name":"liuju7@xdf.cn","url":"https://cfiles.xdf.cn/e558b3b7-28e3-42e2-88ac-3ca7c9902cb7.jpeg"},{"name":"baixue70@xdf.cn","url":"https://cfiles.xdf.cn/be0bcde9-b26a-459f-8ae5-5b1298531aa1.jpeg"},{"name":"tianjunwen@xdf.cn","url":"https://cfiles.xdf.cn/a409c885-52f4-412a-ace8-9c450e7491dc.jpeg"},{"name":"zhuhuijie2@xdf.cn","url":"https://cfiles.xdf.cn/4c2f1a49-5759-4742-9e91-616d69034c70.jpeg"},{"name":"zhuxinyue7@xdf.cn","url":"https://cfiles.xdf.cn/2e65f505-3c2e-45da-926a-ffb67776c39d.jpeg"},{"name":"zhairuochang@xdf.cn","url":"https://cfiles.xdf.cn/61fa04be-12a7-499f-8139-449ffe2ad399.jpeg"},{"name":"yujiawei3@xdf.cn","url":"https://cfiles.xdf.cn/d3a4b2c8-91fe-4f8a-8bc1-cafab0b640e2.jpeg"},{"name":"xiahuimin2@xdf.cn","url":"https://cfiles.xdf.cn/1bdea611-a225-465f-8ce3-e6b3a7ab7528.jpeg"},{"name":"wangyifan106@xdf.cn","url":"https://cfiles.xdf.cn/39a235d1-c1e3-4e3c-a4a9-ea8b0701b334.jpeg"},{"name":"luozhengyang@xdf.cn","url":"https://cfiles.xdf.cn/4ab5a90b-a031-4e39-91f0-921d983a176b.jpeg"},{"name":"chenxiao215@xdf.cn","url":"https://cfiles.xdf.cn/0aa44e94-ae10-4c6d-897f-8777c6f3a2ca.jpeg"},{"name":"zouhuibo@xdf.cn","url":"https://cfiles.xdf.cn/101584cc-af95-445c-88ee-fe3343fbf442.jpeg"},{"name":"","url":"https://cfiles.xdf.cn/3499e4a6-e911-4bec-b656-e6f38be58f73.jpeg"}
            ]
            downZip(fileArr, '活动id_1000902');
        }
    }
}
</script>
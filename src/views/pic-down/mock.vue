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
                {"name":"huangjingyu@xdf.cn","url":"https://cfiles.xdf.cn/0581da54-a866-41ff-861a-012a5f7e4dfa.jpeg"},{"name":"wumengting12@xdf.cn","url":"https://cfiles.xdf.cn/eb56dfd2-dc78-46e9-b8bf-6fee0cbfa89d.jpeg"},{"name":"chenxue56@xdf.cn","url":"https://cfiles.xdf.cn/e55f1e9b-191f-4e12-b090-61aff2987080.jpeg"},{"name":"zhangli167@xdf.cn","url":"https://cfiles.xdf.cn/a2b9f421-6428-4adc-bea2-ac446ab524c7.jpeg"},{"name":"dongtingting8@xdf.cn","url":"https://cfiles.xdf.cn/8b3bb6ff-19a1-4089-a44d-2e89ff4d36e0.jpeg"},{"name":"chenfenfen2@xdf.cn","url":"https://cfiles.xdf.cn/2e4ad1c4-4607-47bd-b989-eca7b63c15ef.jpeg"},{"name":"yanfangfang1@xdf.cn","url":"https://cfiles.xdf.cn/6acfa9a9-e552-480d-99a0-5423951c6c2c.jpeg"},{"name":"zhouxinya3@xdf.cn","url":"https://cfiles.xdf.cn/9efe9d84-e533-4bee-a404-955340599bec.jpeg"},{"name":"yufangping@xdf.cn","url":"https://cfiles.xdf.cn/65b8ec6a-c2d4-40a6-823b-fa12b95edb77.jpeg"},{"name":"yanghuawei1@xdf.cn","url":"https://cfiles.xdf.cn/6da554c1-8749-4bd0-8a61-dd23ff1443c5.jpeg"},{"name":"heyulong2@xdf.cn","url":"https://cfiles.xdf.cn/d15c58e3-7c7a-4ca2-9155-afe7a71de0aa.jpeg"},{"name":"wangkaichen3@xdf.cn","url":"https://cfiles.xdf.cn/78d79250-84ac-4935-938a-f0cc28c1148d.jpeg"},{"name":"lidandan57@xdf.cn","url":"https://cfiles.xdf.cn/6deaa88d-79bf-4db1-aa4c-2389c26c7b2d.jpeg"},{"name":"zhouxiaoxiao3@xdf.cn","url":"https://cfiles.xdf.cn/64ca5947-b138-4b8a-b0b7-286aa5b027de.jpeg"},{"name":"gaoshuyi2@xdf.cn","url":"https://cfiles.xdf.cn/c0cfa512-3215-4fb6-9106-703b4b3ea55f.jpeg"},{"name":"wangjialei2@xdf.cn","url":"https://cfiles.xdf.cn/84c37b2c-229a-4b30-b780-b1b0cd498061.jpeg"},{"name":"songnaili@xdf.cn","url":"https://cfiles.xdf.cn/b1b3282c-2ccc-408f-87a5-8556042f8f30.jpeg"},{"name":"zhoujie101@xdf.cn","url":"https://cfiles.xdf.cn/cba3e7d6-45c6-408b-a171-de0e9605d2fe.jpeg"},{"name":"niujing2@xdf.cn","url":"https://cfiles.xdf.cn/f64d28b2-6069-4cee-92cb-659c159137f0.jpeg"},{"name":"zhouxin63@xdf.cn","url":"https://cfiles.xdf.cn/bc345e38-2f5c-48dc-8546-24d651a5846d.jpeg"},{"name":"xuhongling1@xdf.cn","url":"https://cfiles.xdf.cn/bb4388fa-0729-44c7-a517-2d4631b67faa.jpeg"},{"name":"anxueran@xdf.cn","url":"https://cfiles.xdf.cn/be5190ce-c9ba-400d-b9e4-7d611282571f.jpeg"},{"name":"pengchangqin@xdf.cn","url":"https://cfiles.xdf.cn/7ca51ec2-4eca-4d29-be15-704b1d7e1708.jpeg"},{"name":"wuruili2@xdf.cn","url":"https://cfiles.xdf.cn/dbf3cb9f-9bd6-433b-965f-7a646bfe55a1.jpeg"},{"name":"hurong22@xdf.cn","url":"https://cfiles.xdf.cn/ce07caeb-b555-4637-a6c6-b091e8ea2fc2.jpeg"},{"name":"maoxinlian@xdf.cn","url":"https://cfiles.xdf.cn/a696001d-41cb-4266-b409-3672be7afd63.jpeg"},{"name":"tianyuxia1@xdf.cn","url":"https://cfiles.xdf.cn/4d4609aa-de67-4830-948b-4e3da1ff4759.jpeg"},{"name":"qiujunhui@xdf.cn","url":"https://cfiles.xdf.cn/c006e797-a2ed-419b-a0d1-533c312c8f4c.jpeg"},{"name":"jufeng@xdf.cn","url":"https://cfiles.xdf.cn/8f7b1987-a6bb-48de-9b8b-83898a60b9b7.jpeg"},{"name":"zhanghongxia3@xdf.cn","url":"https://cfiles.xdf.cn/134588ec-408b-4fd8-ad24-299478143405.jpeg"},{"name":"zhangkun205@xdf.cn","url":"https://cfiles.xdf.cn/c61129dd-0f91-4dd1-8595-ac74e62832ca.jpeg"},{"name":"wanglankai@xdf.cn","url":"https://cfiles.xdf.cn/6e0ff38a-4c6a-4534-b949-f3801d67c4c7.jpeg"},{"name":"liguanglong1@xdf.cn","url":"https://cfiles.xdf.cn/26be894e-5787-409e-90ec-b6d55e549441.jpeg"},{"name":"wuyuantian@xdf.cn","url":"https://cfiles.xdf.cn/623d6c9d-07fb-4fbb-bd21-91c94da1636a.jpeg"},{"name":"huanghua6@xdf.cn","url":"https://cfiles.xdf.cn/df2b4619-d7c4-4423-8833-e483dcf7842d.jpeg"},{"name":"chenyanhuan@xdf.cn","url":"https://cfiles.xdf.cn/8c52eb0d-8009-4838-a558-eb8916449adb.jpeg"},{"name":"caiwenjie2@xdf.cn","url":"https://cfiles.xdf.cn/2d2c5302-57b4-4a32-8030-e600399bfca4.jpeg"},{"name":"panheying@xdf.cn","url":"https://cfiles.xdf.cn/b298f8e3-5f15-4f79-a3a5-1b6dd2c43032.jpeg"},{"name":"wangyuting97@xdf.cn","url":"https://cfiles.xdf.cn/6395a1b2-1005-4df3-bd31-1957b2001ff3.jpeg"},{"name":"guozhonghao@xdf.cn","url":"https://cfiles.xdf.cn/916b54a7-8451-4805-95cd-e5c27946d595.jpeg"},{"name":"","url":"https://cfiles.xdf.cn/ec3005e7-9bd6-4140-bde1-2603dddeee70.jpeg"}
            ]
            downZip(fileArr, '活动id_1000883');
        }
    }
}
</script>
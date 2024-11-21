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
                {fvUrl:'https://cfiles.xdf.cn/fb1790f7-9f58-4cac-b26d-56493a6ddf78.jpeg',
                fvName: '图片名称'},
                {fvUrl:'https://cfiles.xdf.cn/fb1790f7-9f58-4cac-b26d-56493a6ddf78.jpeg',
                fvName: '图片名称2'}
            ]
            downZip(fileArr);
        }
    }
}
</script>
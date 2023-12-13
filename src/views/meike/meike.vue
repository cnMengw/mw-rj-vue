<template>
    <div class="index-meike">
        <div class="meike-url" @click="getDownUrl">获取下载链接</div>
        <br />
        <br />
        <br />
        <div class="down" @click="handleXunLeiDownload">迅雷下载</div>
    </div>
</template>

<script type="text/ecmascript-6">
import { getData } from './config.js';
export default {
    name: 'index',
    data() {
        return {
            meikeData: []
        };
    },
    created() {
        this.init();
    },
    methods: {
        init() {},
        getDownUrl() {
            getData((data) => {
                this.meikeData = data.map(it => {
                    return {
                        title: it.classroomName,
                        url: it.url
                    }
                })
                this.$toast('获取url成功')
            }, this);
        },
        handleXunLeiDownload() {
            let tasks = [];
            tasks = this.meikeData.map(it => {
                // 名称定制
                it.title = it.title.replace('目标', '目标(暑)');
                return {
                    name: `${it.title}.mp4`,
                    url: it.url
                }
            });

            // 创建单个任务
            let thunderLink = window.thunderLink;
            thunderLink.newTask({
                tasks: tasks
            })
        }
    }
};
</script>

<style lang="scss" type="text/scss" scoped>
.index-meike{
    padding: 32px;
    font-size: 32px;
}
</style>
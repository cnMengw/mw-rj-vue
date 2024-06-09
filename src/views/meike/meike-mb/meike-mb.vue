<template>
    <div class="meike">
        <template>
            <div class="label-list" v-for="(item, index) in resArr" :key="index">
                <div class="row-top">
                    <span class="top-label">{{item.title}}  {{item.time}}</span>
                    <span class="btn" @click="() => xunDown(item)">迅雷下载</span>
                </div>
                <div class="row">
                    <div class="row-item" v-for="(it2, in2) in item.list">
                        {{ it2.classroomName }} {{it2.endTime}}
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script type="text/ecmascript-6">
import resArr from './meikeData_mb';
export default {
    name: 'index',
    data() {
        return {
            resArr
        };
    },
    created() {
    },
    methods: {
        xunDown(item) {
            let tasks = [];
            tasks = item.list.map(it => {
                return {
                    name: `${it.classroomName}.mp4`,
                    url: it.downUrl
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


<style lang="scss" type="text/scss">
.meike{
    padding: 16px;
    font-size: 16px;
}
.label-list{
    margin-bottom: 16px;
}
.row-top{
    display: flex;
    align-items: center;
    .top-label{
        font-weight: 800;
        color: #3585F7;
    }
}
.row-item{
    font-size: 14px;
    margin-bottom: 8px;
}
.btn{
    padding: 4px 16px;
    border: 1px solid #333;
    cursor: pointer;
    margin-left: 16px;
}
</style>
<template>
    <div class="index-meike">
        <el-input
            type="textarea"
            placeholder="输入token"
        />
        <div>
            <el-button @click="tokenSure">确定</el-button>
        </div>
        <br />
        <br />
        <br />
        <div>
            <el-button @click="comparUrl">合并链接</el-button>
        </div>

        <div class="meike-url" @click="getDownUrl">获取</div>
        <br />
        <br />
        <br />
        <div class="down" @click="handleXunLeiDownload">迅雷下载</div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: 'index',
    data() {
        return {
            listArr: []
        };
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            this.getCalssList();
        },
        tokenSure() {
            // this.getCalssList();
        },
        // 获取课程列表
        getCalssList() {
            let title = 'VIP-G8目标【10:10-12:10】';
            let time = '2024-02-02 - 2024-02-07';

            let _listArr = {
	"code":200,
	"data":{
		"list":[
			{
				"assistantNumber":"",
				"assistants":[],
				"audiencePreEnterTime":30,
				"auditNumber":0,
				"channel":0,
				"channelName":"后台自建",
				"classCode":"RBXC6CPJ1PK",
				"classId":247985,
				"classroomEnName":"",
				"classroomId":3692498,
				"classroomName":"臻臻G8-目标 第1讲",
				"classroomStatus":2,
				"clientVersion":2,
				"courseWareNumber":"",
				"definitionDesc":"标清",
				"deleteAble":false,
				"deptId":2331,
				"deptName":"默认部门",
				"duration":120,
				"endTime":"2024-02-02 12:10",
				"extendTime":1440,
				"fakeLive":false,
				"id":3692498,
				"lessonId":"3692498",
				"level":0,
				"mainId":3692498,
				"managerNumber":"",
				"orgName":"臻臻",
				"organizationId":10000454,
				"parentId":0,
				"resourceNum":6,
				"startTime":"2024-02-02 10:10",
				"studentNumber":36,
				"tagIdList":[],
				"tagIds":"",
				"tagName":"",
				"tagNames":"",
				"teacher":{
					"createTime":"",
					"email":"",
					"id":2207,
					"isInClass":"",
					"joinTime":"",
					"leaveTime":"",
					"mainOrgId":"",
					"nickname":"臻臻老师",
					"organizationId":"",
					"phone":"156****5244",
					"realName":"",
					"relatedUsers":"",
					"roleId":"",
					"status":"",
					"studentCode":"",
					"updateTime":"",
					"userId":2207,
					"userName":"meike9919dvf13q"
				},
				"templateId":1,
				"wallFormat":"1V2-6"
			},
			{
				"assistantNumber":"",
				"assistants":[],
				"audiencePreEnterTime":30,
				"auditNumber":0,
				"channel":0,
				"channelName":"后台自建",
				"classCode":"RBXC6CPJ1PK",
				"classId":247985,
				"classroomEnName":"",
				"classroomId":3692501,
				"classroomName":"臻臻G8-目标 第2讲",
				"classroomStatus":2,
				"clientVersion":2,
				"courseWareNumber":"",
				"definitionDesc":"标清",
				"deleteAble":false,
				"deptId":2331,
				"deptName":"默认部门",
				"duration":120,
				"endTime":"2024-02-03 12:10",
				"extendTime":1440,
				"fakeLive":false,
				"id":3692501,
				"lessonId":"3692501",
				"level":0,
				"mainId":3692501,
				"managerNumber":"",
				"orgName":"臻臻",
				"organizationId":10000454,
				"parentId":0,
				"resourceNum":6,
				"startTime":"2024-02-03 10:10",
				"studentNumber":36,
				"tagIdList":[],
				"tagIds":"",
				"tagName":"",
				"tagNames":"",
				"teacher":{
					"createTime":"",
					"email":"",
					"id":2207,
					"isInClass":"",
					"joinTime":"",
					"leaveTime":"",
					"mainOrgId":"",
					"nickname":"臻臻老师",
					"organizationId":"",
					"phone":"156****5244",
					"realName":"",
					"relatedUsers":"",
					"roleId":"",
					"status":"",
					"studentCode":"",
					"updateTime":"",
					"userId":2207,
					"userName":"meike9919dvf13q"
				},
				"templateId":1,
				"wallFormat":"1V2-6"
			},
			{
				"assistantNumber":"",
				"assistants":[],
				"audiencePreEnterTime":30,
				"auditNumber":0,
				"channel":0,
				"channelName":"后台自建",
				"classCode":"RBXC6CPJ1PK",
				"classId":247985,
				"classroomEnName":"",
				"classroomId":3692504,
				"classroomName":"臻臻G8-目标 第3讲",
				"classroomStatus":2,
				"clientVersion":2,
				"courseWareNumber":"",
				"definitionDesc":"标清",
				"deleteAble":false,
				"deptId":2331,
				"deptName":"默认部门",
				"duration":120,
				"endTime":"2024-02-04 12:10",
				"extendTime":1440,
				"fakeLive":false,
				"id":3692504,
				"lessonId":"3692504",
				"level":0,
				"mainId":3692504,
				"managerNumber":"",
				"orgName":"臻臻",
				"organizationId":10000454,
				"parentId":0,
				"resourceNum":6,
				"startTime":"2024-02-04 10:10",
				"studentNumber":36,
				"tagIdList":[],
				"tagIds":"",
				"tagName":"",
				"tagNames":"",
				"teacher":{
					"createTime":"",
					"email":"",
					"id":2207,
					"isInClass":"",
					"joinTime":"",
					"leaveTime":"",
					"mainOrgId":"",
					"nickname":"臻臻老师",
					"organizationId":"",
					"phone":"156****5244",
					"realName":"",
					"relatedUsers":"",
					"roleId":"",
					"status":"",
					"studentCode":"",
					"updateTime":"",
					"userId":2207,
					"userName":"meike9919dvf13q"
				},
				"templateId":1,
				"wallFormat":"1V2-6"
			},
			{
				"assistantNumber":"",
				"assistants":[],
				"audiencePreEnterTime":30,
				"auditNumber":0,
				"channel":0,
				"channelName":"后台自建",
				"classCode":"RBXC6CPJ1PK",
				"classId":247985,
				"classroomEnName":"",
				"classroomId":3692507,
				"classroomName":"臻臻G8-目标 第4讲",
				"classroomStatus":2,
				"clientVersion":2,
				"courseWareNumber":"",
				"definitionDesc":"标清",
				"deleteAble":false,
				"deptId":2331,
				"deptName":"默认部门",
				"duration":120,
				"endTime":"2024-02-05 12:10",
				"extendTime":1440,
				"fakeLive":false,
				"id":3692507,
				"lessonId":"3692507",
				"level":0,
				"mainId":3692507,
				"managerNumber":"",
				"orgName":"臻臻",
				"organizationId":10000454,
				"parentId":0,
				"resourceNum":6,
				"startTime":"2024-02-05 10:10",
				"studentNumber":36,
				"tagIdList":[],
				"tagIds":"",
				"tagName":"",
				"tagNames":"",
				"teacher":{
					"createTime":"",
					"email":"",
					"id":2207,
					"isInClass":"",
					"joinTime":"",
					"leaveTime":"",
					"mainOrgId":"",
					"nickname":"臻臻老师",
					"organizationId":"",
					"phone":"156****5244",
					"realName":"",
					"relatedUsers":"",
					"roleId":"",
					"status":"",
					"studentCode":"",
					"updateTime":"",
					"userId":2207,
					"userName":"meike9919dvf13q"
				},
				"templateId":1,
				"wallFormat":"1V2-6"
			},
			{
				"assistantNumber":"",
				"assistants":[],
				"audiencePreEnterTime":30,
				"auditNumber":0,
				"channel":0,
				"channelName":"后台自建",
				"classCode":"RBXC6CPJ1PK",
				"classId":247985,
				"classroomEnName":"",
				"classroomId":3692510,
				"classroomName":"臻臻G8-目标 第5讲",
				"classroomStatus":2,
				"clientVersion":2,
				"courseWareNumber":"",
				"definitionDesc":"标清",
				"deleteAble":false,
				"deptId":2331,
				"deptName":"默认部门",
				"duration":120,
				"endTime":"2024-02-06 12:10",
				"extendTime":1440,
				"fakeLive":false,
				"id":3692510,
				"lessonId":"3692510",
				"level":0,
				"mainId":3692510,
				"managerNumber":"",
				"orgName":"臻臻",
				"organizationId":10000454,
				"parentId":0,
				"resourceNum":6,
				"startTime":"2024-02-06 10:10",
				"studentNumber":36,
				"tagIdList":[],
				"tagIds":"",
				"tagName":"",
				"tagNames":"",
				"teacher":{
					"createTime":"",
					"email":"",
					"id":2207,
					"isInClass":"",
					"joinTime":"",
					"leaveTime":"",
					"mainOrgId":"",
					"nickname":"臻臻老师",
					"organizationId":"",
					"phone":"156****5244",
					"realName":"",
					"relatedUsers":"",
					"roleId":"",
					"status":"",
					"studentCode":"",
					"updateTime":"",
					"userId":2207,
					"userName":"meike9919dvf13q"
				},
				"templateId":1,
				"wallFormat":"1V2-6"
			},
			{
				"assistantNumber":"",
				"assistants":[],
				"audiencePreEnterTime":30,
				"auditNumber":0,
				"channel":0,
				"channelName":"后台自建",
				"classCode":"RBXC6CPJ1PK",
				"classId":247985,
				"classroomEnName":"",
				"classroomId":3692513,
				"classroomName":"臻臻G8-目标 第6讲",
				"classroomStatus":2,
				"clientVersion":2,
				"courseWareNumber":"",
				"definitionDesc":"标清",
				"deleteAble":false,
				"deptId":2331,
				"deptName":"默认部门",
				"duration":120,
				"endTime":"2024-02-07 12:10",
				"extendTime":1440,
				"fakeLive":false,
				"id":3692513,
				"lessonId":"3692513",
				"level":0,
				"mainId":3692513,
				"managerNumber":"",
				"orgName":"臻臻",
				"organizationId":10000454,
				"parentId":0,
				"resourceNum":6,
				"startTime":"2024-02-07 10:10",
				"studentNumber":36,
				"tagIdList":[],
				"tagIds":"",
				"tagName":"",
				"tagNames":"",
				"teacher":{
					"createTime":"",
					"email":"",
					"id":2207,
					"isInClass":"",
					"joinTime":"",
					"leaveTime":"",
					"mainOrgId":"",
					"nickname":"臻臻老师",
					"organizationId":"",
					"phone":"156****5244",
					"realName":"",
					"relatedUsers":"",
					"roleId":"",
					"status":"",
					"studentCode":"",
					"updateTime":"",
					"userId":2207,
					"userName":"meike9919dvf13q"
				},
				"templateId":1,
				"wallFormat":"1V2-6"
			}
		],
		"total":6
	},
	"msg":""
}



            this.listArr = {
                title,
                time, time,
                list: _listArr.data.list
            }
            let classroomId = _listArr.data.list.map(it => it.classroomId);
            console.log(JSON.stringify(classroomId));
            console.log(classroomId.length);
        },

        // 第3部-合并url
        comparUrl() {
            const _url = ["https://oss-record.mk.metcom.com.cn/roombox/record/merged/2024/02/02/_3692498p4crtpz.mp4","https://oss-record.mk.metcom.com.cn/roombox/record/merged/2024/02/03/_3692501ZcOcWw8.mp4","https://oss-record.mk.metcom.com.cn/roombox/record/merged/2024/02/04/_36925045znHrDW.mp4","https://oss-record.mk.metcom.com.cn/roombox/record/merged/2024/02/05/_36925074kxC2Yb.mp4","https://oss-record.mk.metcom.com.cn/roombox/record/merged/2024/02/06/_3692510JE3Izwu.mp4","https://oss-record.mk.metcom.com.cn/roombox/record/merged/2024/02/07/_3692513Np667lX.mp4"]

            let _list = this.listArr.list;
            _list = _list.map((it, ind) => {
                it.downUrl = _url[ind];
                return it
            })
            console.log(JSON.stringify(this.listArr));
        },


        getDownUrl() {
            // getData((data) => {
            //     this.meikeData = data.map(it => {
            //         return {
            //             title: it.classroomName,
            //             url: it.url
            //         }
            //     })
            //     this.$toast('获取url成功')
            // }, this);
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
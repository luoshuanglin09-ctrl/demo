<template>
    <div class="index">
        <div class="left">
            <h2>高校学生成果管理平台</h2>
            <el-menu default-active="2" class="el-menu-vertical-demo" router>

                <el-sub-menu index="1">
                    <template #title>
                        <el-icon>
                            <User />
                        </el-icon>
                        <span>用户管理</span>
                    </template>
                    <el-menu-item index="/StudentData">学生信息管理</el-menu-item>
                    <el-menu-item index="/TeacherData">教师信息管理</el-menu-item>
                    <el-menu-item index="/Administrator">管理员信息管理</el-menu-item>
                </el-sub-menu>
                <el-menu-item index="/document">
                    <el-icon>
                        <Document />
                    </el-icon>
                    <span>资料管理</span>
                </el-menu-item>
                <!-- <el-menu-item index="/audit">
                    <el-icon>
                        <DocumentChecked />
                    </el-icon>
                    <span>待审核成果</span>
                </el-menu-item> -->
                <el-sub-menu index="/">
                    <template #title>
                        <el-icon>
                            <DataAnalysis />
                        </el-icon>
                        <span>数据展示</span>
                    </template>
                    <el-menu-item index="/student-data">学生数据分析</el-menu-item>
                    <!-- <el-menu-item index="/data-count">数据统计</el-menu-item> -->
                </el-sub-menu>
                <el-sub-menu index="5">
                    <template #title>
                        <el-icon>
                            <FolderOpened />
                        </el-icon>
                        <span>系统信息发布</span>
                    </template>
                    <el-menu-item index="/system-notice">系统公告</el-menu-item>
                    <el-menu-item index="/match">赛事指南</el-menu-item>
                    <el-menu-item index="/meeting">学术会议</el-menu-item>
                </el-sub-menu>


            </el-menu>
        </div>
        <div class="right">
            <div class="top">
                <el-menu class="el-menu-demo" mode="horizontal" router>
                    <!-- <el-menu-item index="1">Home</el-menu-item>
                    <el-menu-item index="2">消息</el-menu-item>
                    <el-menu-item index="3">全屏模式</el-menu-item> -->
                    <el-sub-menu   index="4">
                        <template #title>个人中心</template>
                        <el-menu-item @click="information">个人信息</el-menu-item>
                        <el-menu-item @click="exit">退出登录</el-menu-item>


                    </el-sub-menu>

                </el-menu>
            </div>
            <div class="content">
                <router-view>

                </router-view>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { User, Document, DocumentChecked, DataAnalysis, FolderOpened } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import useUser from '../store/user.ts'
// import StudentData from '../components/StudentData.vue'

let userStore = useUser();
let router = useRouter();
onMounted(() => {
    if (!userStore.user.username) {
        router.push('/')
    }
    // console.log(userStore.user.username,"userStore.user.username");

})

//退出登录
let exit = () => {
    userStore.clearUser()
    router.push('/')
}

let information = () =>{
    router.push('/src/views/student/my-profile/S-information.vue')
}
</script>

<style scoped lang="scss">
.index {
    width: 100vw;
    height: 100vh;
    display: flex;

    .left {
        width: 200px;
        height: 100%;
        background-color: white;
        color: #409EFF;
        border: 1px solid #E1E2E3;

        h2 {
            font-size: 18px;
            font-family: "KaiTi", sans-serif;
            text-align: center;
            height: 60px;
            line-height: 60px;
        }

        .el-menu {
            border: none;
        }
    }

    .right {
        flex: 1;
        flex-direction: column;
        color: white;
        padding-top: 60px;
        background-color: #F2F3F5;

        .top {
            width: 100%;
            height: 60px;
            background-color: black;
            position: fixed;
            top: 0;

            .el-sub-menu {
                margin-left: 82%;

            }
        }

        .content {
            flex: 1;
            // background-color: #2c3e50;
            color: black;
            width: 99.5%;
            
            padding-top: 10px;
            padding-left: 10px;
            

        }
    }
}
</style>
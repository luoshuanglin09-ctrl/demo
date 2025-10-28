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
                        <span>我的消息</span>
                    </template>
                    <el-menu-item index="/shoujianxiang">收件箱</el-menu-item>
                    <el-menu-item index="/fajianxiang">发件箱</el-menu-item>
                    <!-- <el-menu-item index="/Administrator">管理员信息管理</el-menu-item> -->
                </el-sub-menu>
                <el-sub-menu index="4">
                    <template #title>
                        <el-icon>
                            <User />
                        </el-icon>
                        <span>个人信息管理</span>
                    </template>
                    <el-menu-item index="/teacherinformation">个人信息管理</el-menu-item>
                    
                </el-sub-menu>
                <el-sub-menu index="2">
                    <template #title>
                        <el-icon>
                            <User />
                        </el-icon>
                        <span>学生成功管理</span>
                    </template>
                    <el-menu-item index="/shenhe">审核</el-menu-item>
                    <el-menu-item index="/student-information">学生信息管理</el-menu-item>
                </el-sub-menu>

                <el-sub-menu index="5">
                    <template #title>
                        <el-icon>
                            <User />
                        </el-icon>
                        <span>信息速递</span>
                    </template>
                    <el-menu-item index="/saishizhinan">赛事指南</el-menu-item>
                    <el-menu-item index="/jiaoliuguangchang">交流广场</el-menu-item>
                    <el-menu-item index="/xueshu-meeting">学术会议</el-menu-item>
                </el-sub-menu>

            </el-menu>
        </div>
        <div class="right">
            <div class="top">
                <el-menu class="el-menu-demo" mode="horizontal" router>
                    <el-menu-item index="1">Home</el-menu-item>
                    <el-menu-item index="2">消息</el-menu-item>
                    <el-menu-item index="3">全屏模式</el-menu-item>
                    <el-sub-menu index="4">
                        <template #title>个人中心</template>
                        <el-menu-item index="/user-xx">个人信息</el-menu-item>
                        <el-menu-item @click="exit">退出登录</el-menu-item>


                    </el-sub-menu>

                </el-menu>
            </div>
            <div class="content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { User, Document, DocumentChecked, DataAnalysis, FolderOpened } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import useTeach from '../store/teacher'
// import teacher from '../store/teacher';

let teachStore = useTeach();
let router = useRouter();
onMounted(() => {
    if (!teachStore.teacher.teachname) {
        // console.log(teachStore.teacher.teachname,"----teachStore.teacher.teachname---");
        
        router.push('/')
    }
    // console.log(userStore.user.username,"userStore.user.username");

})

//退出登录
let exit = () => {
    teachStore.clearTeach()
    router.push('/')
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

        .top {
            width: 100%;
            height: 60px;
            background-color: black;
            position: fixed;
            top: 0;

            .el-sub-menu {
                margin-left: 70%;

            }
        }

        .content {
            flex: 1;
            // background-color: #2c3e50;
            color: black;
            width: 100%;

        }
    }
}
</style>
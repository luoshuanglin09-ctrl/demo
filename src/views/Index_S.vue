<template>
    <div class="index">
        <div class="left">
            <h2>高校学生成果管理平台</h2>
            <el-menu default-active="2" class="el-menu-vertical-demo" router>

                <el-sub-menu index="2">
                    <template #title>
                        <el-icon>
                            <Message />
                        </el-icon>
                        <span>我的消息</span>
                    </template>
                    
                    <el-menu-item index="/getEmail">收件箱</el-menu-item>
                    <el-menu-item index="/sendEmail">发件箱</el-menu-item>
                   
                </el-sub-menu>
                
                <el-sub-menu index="3">
                    <template #title>
                        <el-icon>
                            <Document />
                        </el-icon>
                        <span>我的资料</span>
                    </template>
                    <el-menu-item index="/S-information">资料信息</el-menu-item>
                    <el-menu-item index="/S-ability-analysis">综合能力分析</el-menu-item>
                </el-sub-menu>

                <el-sub-menu index="5">
                    <template #title>
                        <el-icon><Sunny /></el-icon>
                        <span>我的成果</span>
                    </template>
                    <el-menu-item index="/my-thesis">我的论文</el-menu-item>
                    <el-menu-item index="/my-patent">我的专利</el-menu-item>
                    <el-menu-item index="/my-award">我的获奖</el-menu-item>
                    <!-- <el-menu-item index="/audit-progress">审核进度</el-menu-item> -->
                </el-sub-menu>

                <el-sub-menu index="4">
                    <template #title>
                        <el-icon><Guide /></el-icon>
                        <span>信息速递</span>
                    </template>
                    <el-menu-item index="/S-sszn">赛事指南</el-menu-item>
                    <el-menu-item index="/S-meeting">学术会议</el-menu-item>
                    <el-menu-item index="/S-square">学术广场</el-menu-item>
                    
                </el-sub-menu>

            </el-menu>
        </div>
        <div class="right">
            <div class="top">
                <el-menu class="el-menu-demo" mode="horizontal" router>
                    <el-menu-item index="1">Home</el-menu-item>
                    <el-menu-item index="2">消息</el-menu-item>
                    <el-menu-item  @click="toggleFullscreen">全屏模式</el-menu-item>
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
import { Guide, Message, Document,Sunny, } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import useStu from '../store/student'
// import teacher from '../store/teacher';

let stuStore = useStu();
let router = useRouter();
onMounted(() => {
    if (!stuStore.student.stuname) {
        // console.log(teachStore.teacher.teachname,"----teachStore.teacher.teachname---");
        
        router.push('/')
    }
    // console.log(userStore.user.username,"userStore.user.username");

})

//退出登录
let exit = () => {
    stuStore.clearStu()
    router.push('/')
}

let toggleFullscreen = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
};

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
            background-color: #F2F3F5;

        }
    }
}
</style>
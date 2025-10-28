<template>
    <div class="box">
        <div class="own">
            <!-- <div class="tx" @click="handleImageUpload">
                <img style="width: 100%;height: 100%; border-radius: 50%;" :src="data.img" alt="">
            </div> -->
            <div class="name">
                {{ teacherList.name }}
            </div>
            <div>

            </div>
        </div>
        <div class="content">
            <el-card style="max-width: 100%">
                <template #header>
                    <div class="grzl">
                        <div class="card-header">
                            <span>个人资料</span>
                        </div>
                        <div class="btn">
                            <el-button type="primary" style="margin-left: 16px" @click="drawershow">
                                修改个人资料
                            </el-button>

                            <el-drawer v-model="drawer" title="I am the title" :with-header="false">
                                <span>修改个人信息</span>
                                <el-form :model="form" style="margin-top: 50px;">
                                    <el-form-item label="姓名" :label-width="formLabelWidth">
                                        <el-input v-model="form.name" autocomplete="off" />
                                    </el-form-item>
                                    <el-form-item label="账号" :label-width="formLabelWidth">
                                        <el-input v-model="form.teachname" autocomplete="off" />
                                    </el-form-item>
                                    <el-form-item label="密码" :label-width="formLabelWidth">
                                        <el-input v-model="form.teachpwd" type="password" autocomplete="off"
                                            show-password />
                                    </el-form-item>
                                    <el-form-item label="教师工号" :label-width="formLabelWidth">
                                        <el-input v-model="form.teachcode" autocomplete="off" />
                                    </el-form-item>
                                    <el-form-item label="电话" :label-width="formLabelWidth">
                                        <el-input v-model="form.teachtel" autocomplete="off" />
                                    </el-form-item>
                                </el-form>
                                <template #footer>
                                    <span class="dialog-footer">
                                        <el-button @click="drawer = false">取消</el-button>
                                        <el-button type="primary" @click="handleAddEmail">
                                            发送
                                        </el-button>
                                    </span>
                                </template>
                            </el-drawer>
                        </div>
                    </div>

                </template>
                <div>

                    <span class="table">
                        <h4 style="margin-right: 30px;">姓名:</h4>
                        <p>{{ teacherList.name }}</p>
                    </span>
                    <span class="table">
                        <h4 style="margin-right: 30px;">账号:</h4>
                        <p>{{ teacherList.teachname }}</p>
                    </span>
                    <span class="table">
                        <h4 style="margin-right: 30px;">密码:</h4>
                        <p>{{ teacherList.teachpwd }}</p>
                    </span>
                    <span class="table">
                        <h4 style="margin-right: 30px;">教师工号:</h4>
                        <p>{{ teacherList.teachcode }}</p>
                    </span>
                    <span class="table">
                        <h4 style="margin-right: 30px;">电话:</h4>
                        <p>{{ teacherList.teachtel }}</p>
                    </span>
                </div>
            </el-card>


        </div>
    </div>
</template>

<script setup lang="ts">
// import { $getourinfomation } from '../../../api/information/infotmation';
// import {$getadmininformation} from '../../../api/information/infotmation.ts'
import { $getTeachList } from '../../../api/SuperUser/teacher';
import { onMounted, reactive, ref } from 'vue';
import { ElMessage, ElNotification, ElMessageBox } from 'element-plus';
// import { $editStudent } from '../../../api/SuperUser/student';
import { $getsingleTeacher} from '../../../api/SuperUser/teacher';
import { $editTeacher } from '../../../api/SuperUser/teacher';

//   import { $getTeachList } from '../../../api/SuperUser/teacher';
import axios from 'axios';

const drawer = ref(false)
const formLabelWidth = '140px'
const searchForm = reactive({
    searchKeyword: ''
})

const searchTx = reactive({
    searchtx: ''
})

const form = reactive({
    teaId: '',
    name: '',
    teachname: '',
    teachpwd: '',
    teachcode:'',
    teachtel:''
})

const teacherList = ref([])
const teachername = ref([])
onMounted(() => {
    // 获取学号
    const storedUsername = sessionStorage.getItem('user');
    const usernameArray = JSON.parse(storedUsername);
    const username = usernameArray[0].name;
    console.log(username);
    searchForm.searchKeyword = username
    searchTx.searchtx = username
    loadTeachList()
})

let data = ref([]);




const loadTeachList = async () => {
    let res = await $getsingleTeacher(searchForm);
    console.log(res.data, "teacher");
    teacherList.value = res.data[0]
    // TeachData.value = res.data;
};





const drawershow = async () => {
    drawer.value = true
    const res = await $getsingleTeacher(searchForm);
    if (res.code === 200) {
        const userInfo = res.data[0];
        form.teaId = userInfo.teaId
        form.name = userInfo.name;
        form.teachname = userInfo.teachname;
        form.teachpwd = userInfo.teachpwd;
        form.teachcode = userInfo.teachcode;
        form.teachtel = userInfo.teachtel;
        
    } else {
        ElMessage.error('获取个人信息失败，请稍后重试');
    }
}

//修改个人信息
const handleAddEmail = async () => {
    console.log(form.teachname,'======');
    console.log(form);

    const res = await $editTeacher(form)
    if (res.code = 200) {
        ElNotification({
            title: 'Success',
            message: '个人信息更新成功',
            type: 'success',
        });
        drawer.value = false
        loadTeachList()
        alert('修改个人信息后请重新登录系统！')
        // form.teaId = "",
        // form.name = "",
        // form.teachname = "",
        // form.teachpwd = "",
        // form.teachcode = "",
        // form.teachtel = ""
    }

}

</script>

<style lang="scss" scoped>
.box {
    width: 70%;
    // height: 300px;
    background-color: #FFFFFF;
    margin-left: 15%;
    overflow: hidden;

    .own {
        width: 100%;
        height: 200px;
        background-color: #25AFF3;
        overflow: hidden;
        display: flex;

        .tx {
            width: 150px;
            height: 150px;
            background-color: aliceblue;
            border-radius: 50%;
            margin-top: 25px;
            margin-left: 25px;
        }

        .name {
            width: 300px;
            height: 150px;
            // background-color: pink;
            margin-top: 25px;
            line-height: 150px;
            text-align: center;
            font-size: 30px;
            font-family: "KaiTi", sans-serif;
        }

    }

    .content {
        // height: 300px;

        .title {
            height: 40px;
            // background-color: pink;
            line-height: 40px;
            font-size: 24px;
            font-weight: 800;
            margin-left: 25px;
            border-bottom: 1px solid #F2F3F5;
        }

        .table {
            display: flex;
            height: 80px;
            line-height: 50px;
            border-bottom: 1px solid #F2F3F5;
        }

        .grzl {
            display: flex;

            .btn {
                margin-left: 80%;
            }
        }
    }
}
</style>
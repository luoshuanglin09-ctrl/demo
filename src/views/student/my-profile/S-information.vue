<template>
    <div class="box">
        <!-- <div class="own">
            <div class="tx" @click="handleImageUpload">
                <img style="width: 100%;height: 100%; border-radius: 50%;" :src="`${baseUrl}${data.img}`" alt="">
            </div>
            <div class="name">
                {{ data.name }}
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
                                    <el-form-item label="性别" :label-width="formLabelWidth">
                                        <el-input v-model="form.sex" autocomplete="off" />
                                    </el-form-item>
                                    <el-form-item label="年龄" :label-width="formLabelWidth">
                                        <el-input v-model="form.age" autocomplete="off" />
                                    </el-form-item>
                                    <el-form-item label="电话" :label-width="formLabelWidth">
                                        <el-input v-model="form.tel" autocomplete="off" />
                                    </el-form-item>
                                    <el-form-item label="班级" :label-width="formLabelWidth">
                                        <el-input v-model="form.gradeclass" autocomplete="off" />
                                    </el-form-item>
                                    <el-form-item label="学号" :label-width="formLabelWidth">
                                        <el-input v-model="form.stucode" autocomplete="off" />
                                    </el-form-item>
                                    <el-form-item label="账号" :label-width="formLabelWidth">
                                        <el-input v-model="form.stuname" autocomplete="off" />
                                    </el-form-item>
                                    <el-form-item label="密码" :label-width="formLabelWidth">
                                        <el-input v-model="form.stupwd" type="password" autocomplete="off"
                                            show-password />
                                    </el-form-item>
                                    <el-form-item label="所选导师" :label-width="formLabelWidth">
                                        <el-select v-model="teachername" placeholder="请选择导师" style="width: 240px">
                                            <el-option v-for="item in teacherList" :key="item.teaId" :label="item.name"
                                                :value="item.name" />
                                        </el-select>
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
        <p>{{ data.name }}</p>
    </span>
    <span class="table">
        <h4 style="margin-right: 30px;">性别:</h4>
        <p>{{ data.sex }}</p>
    </span>
    <span class="table">
        <h4 style="margin-right: 30px;">年龄:</h4>
        <p>{{ data.age }}</p>
    </span>
    <span class="table">
        <h4 style="margin-right: 30px;">电话:</h4>
        <p>{{ data.tel }}</p>
    </span>
    <span class="table">
        <h4 style="margin-right: 30px;">班级:</h4>
        <p>{{ data.gradeclass }}</p>
    </span>
    <span class="table">
        <h4 style="margin-right: 30px;">学号:</h4>
        <p>{{ data.stucode }}</p>
    </span>
    <span class="table">
        <h4 style="margin-right: 30px;">所选导师:</h4>
        <p>{{ data.teachname }}</p>
    </span>
</div>
</el-card>


</div> -->
        <el-card style="max-width: 100%">
            <template #header>
                <div class="card-header">
                    <span>个人信息</span>
                </div>
            </template>
            <!-- <p v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</p> -->
            <div class="tx-card">
                <div class="tx" @click="handleImageUpload">
                    <img style="width: 100%;height: 100%; border-radius: 50%;" :src="`${baseUrl}${data.img}`" alt="">
                </div>
            </div>
            <template #footer>
                <div class="card-footer">
                    <div class="card-inform">
                        <span>姓名:</span>
                    </div>
                </div>
            </template>
            <!-- <template #footer>Footer content</template> -->
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { $getourinfomation } from '../../../api/information/infotmation';
import { $getTeachList } from '../../../api/SuperUser/teacher';
import { onMounted, reactive, ref } from 'vue';
import { ElMessage, ElNotification, ElMessageBox } from 'element-plus';
// import { $editStudent } from '../../../api/SuperUser/student';
import { $editStudentInfor } from '../../../api/information/infotmation.ts'
import axios from 'axios';

const baseUrl = 'http://localhost:3001/avatars/';

const drawer = ref(false)
const formLabelWidth = '140px'
const searchForm = reactive({
    searchKeyword: ''
})

const searchTx = reactive({
    searchtx: ''
})

const form = reactive({
    stuId: '',
    name: '',
    sex: '',
    age: '',
    tel: '',
    gradeclass: '',
    stucode: '',
    stuname: '',
    stupwd: '',
    teachname: ''
})

const teacherList = ref([])
const teachername = ref([])
onMounted(() => {
    // 获取学号
    const storedStucode = sessionStorage.getItem('user');
    const StucodeArray = JSON.parse(storedStucode);
    const stucode = StucodeArray[0].stucode;
    console.log(stucode);
    searchForm.searchKeyword = stucode
    searchTx.searchtx = stucode
    getinformation()
    loadTeachList()
})

let data = ref([]);

const getinformation = async () => {
    console.log(searchForm.searchKeyword);
    // console.log(1111);
    const res = await $getourinfomation(searchForm);
    console.log(res, 'getsingleStucode');
    data.value = res.data[0]
    console.log(res.data[0].img);

    // console.log(data,'====');


}

//上传图片
const handleImageUpload = async () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.addEventListener('change', async () => {
        const file = fileInput.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('image', file);
            formData.append('stucode', searchForm.searchKeyword)
            try {
                const response = await axios.post<{ imageUrl: string }>('http://localhost:3001/information/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                data.img = response.data.imageUrl;
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    });
    fileInput.click();
};

const loadTeachList = async () => {
    let res = await $getTeachList();
    console.log(res.data, "teacher");
    teacherList.value = res.data
    // TeachData.value = res.data;
};



// const getourtx = async () => {
//     console.log(searchTx.searchtx,'11111    ');

//     // console.log(1111);
//     const res = await $getourtx(searchTx);
//     console.log(res, 'getourtx');
//     // data.value = res.data[0]
//     // console.log(data,'====');


// }

const drawershow = async () => {
    drawer.value = true
    const res = await $getourinfomation(searchForm);
    if (res.code === 200) {
        const userInfo = res.data[0];
        form.studId = userInfo.studId
        form.name = userInfo.name;
        form.sex = userInfo.sex;
        form.age = userInfo.age;
        form.tel = userInfo.tel;
        form.gradeclass = userInfo.gradeclass;
        form.stucode = userInfo.stucode;
        form.teachname = userInfo.teachname;
        form.stuname = userInfo.stuname;
        form.stupwd = userInfo.stupwd
    } else {
        ElMessage.error('获取个人信息失败，请稍后重试');
    }
}

//修改个人信息
const handleAddEmail = async () => {
    form.teachname = teachername.value
    console.log(form.teachname);
    console.log(form);

    const res = await $editStudentInfor(form)
    if (res.code = 200) {
        ElNotification({
            title: 'Success',
            message: '个人信息更新成功',
            type: 'success',
        });
        drawer.value = false
        getinformation()

    }

}

</script>

<style lang="scss" scoped>
.box {
    width: 97%;
    // height: 300px;
    background-color: #FFFFFF;
    margin-left: 2%;
    overflow: hidden;

    .tx-card {
        width: 100px;
        height: 100px;
        
        // background-color: aqua;
    }

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
    .card-inform{
            width: 100%;
            // height: 50px;
            background-color: aqua;
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
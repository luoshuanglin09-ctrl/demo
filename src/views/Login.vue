<template>
    <div class="login">
        <div class="box">
            <h2 class="title" style="padding-top: 20px; padding-bottom: 10px; color: black;">高校学生成果管理平台</h2>
            <el-form ref="formRef" :model="formData" status-icon :rules="rules" label-width="120px"
                class="demo-ruleForm">
                <el-form-item label="账号" prop="username" placeholder="请输入账号">
                    <el-input v-model.number="formData.username" />
                </el-form-item>
                <el-form-item label="密码" prop="password" placeholder="请输入密码">
                    <el-input v-model="formData.password" type="password" />
                </el-form-item>
                <!-- 身份选择器 -->
                <el-form-item label="身份" prop="type">
                    <el-select v-model="formData.type" placeholder="请选择身份" class="el-select-box">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm(formRef)">登录</el-button>
                    <!-- <el-button @click="resetForm(formRef)">取消</el-button> -->
                    <el-button type="warning" @click="dialogVisible = true">注册</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="zc">
            <el-dialog v-model="dialogVisible" title="注册" width="30%" :before-close="handleClose">
                <el-form :model="form">
                    <el-form-item label="姓名" :label-width="formLabelWidth" style="margin-right:200px; width: 400px;">
                        <el-input v-model="form.name" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="学号" :label-width="formLabelWidth" style="margin-right:200px; width: 400px;">
                        <el-input v-model="form.stucode" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="电话" :label-width="formLabelWidth" style="margin-right:200px; width: 400px;">
                        <el-input v-model="form.tel" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="班级" :label-width="formLabelWidth" style="margin-right:200px; width: 400px;">
                        <el-input v-model="form.gradeclass" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="账号" :label-width="formLabelWidth" style="margin-right:200px; width: 400px;">
                        <el-input v-model="form.stuname" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="密码" :label-width="formLabelWidth" style="margin-right:200px; width: 400px;">
                        <el-input v-model="form.stupwd" autocomplete="off" />
                    </el-form-item>
                </el-form>


                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="dialogVisible = false">取消</el-button>
                        <el-button type="primary" @click="handleAdd">
                            确认
                        </el-button>
                    </span>
                </template>
            </el-dialog>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import type { FormInstance, FormRules, ElMessageBox } from 'element-plus'
import { $Login, $getTeachOne, $getStuOne } from '../api/login'
import { $addStudent } from '../api/SuperUser/student'
import { $getUserOne } from '../api/login'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'

//导入user全局状态
import useUser from '../store/user'
import useTeach from '../store/teacher'
import useStu from '../store/student'

//返回路由对象
const router = useRouter()
//获取user全局状态
const userStore = useUser()
const teachStore = useTeach()
const stuStore = useStu()

const options = [
    {
        value: '学生',
        label: '学生',
    },
    {
        value: '老师',
        label: '老师',
    },
    {
        value: '管理员',
        label: '超级管理员',
        // disabled: true,
    },
]
//定义ref对象 并绑定表单
const formRef = ref<FormInstance>()
const validateusername = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入账号'))
    } else {

        callback()
    }
}
const validatepassword = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入密码'))
    } else {
        callback()
    }
}
const validatetype = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请选择身份'))
    } else {
        callback()
    }
}


//表单数据
const formData = reactive({
    username: '',
    password: '',
    type: '',
})

const rules = reactive<FormRules<typeof formData>>({
    username: [{ validator: validateusername, trigger: 'blur' }],
    password: [{ validator: validatepassword, trigger: 'blur' }],
    type: [{ validator: validatetype, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            // console.log('submit!')
            // console.log(type.value);
            //  formData.type = type.value
            let res = await $Login(formData)
            // console.log(res);
            // console.log($Login);
            if (res) {
                if (formData.type == '管理员') {
                    let user = await $getUserOne({ username: formData.username },)
                    let type = await $getUserOne({ type: formData.type },)
                    userStore.setUser(user.data[0], type.data[0])
                    console.log(userStore.setUser(user.data[0], type.data[0]));
                    sessionStorage.setItem('userLogin', JSON.stringify(user.data[0]))
                    router.push('/Index_U')
                } else if (formData.type == '老师') {
                    let teach = await $getTeachOne({ teachname: formData.username })
                    let type = await $getTeachOne({ type: formData.type })
                    teachStore.setTeach(teach.data[0], type.data[0])


                    sessionStorage.setItem('teachLogin', JSON.stringify(teach.data[0]))

                    router.push('/Index_T')
                } else if (formData.type == '学生') {

                    let stu = await $getStuOne({ stuname: formData.username })
                    let type = await $getStuOne({ type: formData.type })
                    stuStore.setStu(stu.data[0], type.data[0])
                    sessionStorage.setItem('stuLogin', JSON.stringify(stu.data[0]))


                    router.push('/Index_S')

                } else {
                    alert('登录失败');
                    return false;
                }

            }

        } else {
            console.log('error submit!')
            return false
        }
    })
}
// const submitForm = async () => {
//   const valid = await formRef.value?.validate()
//   if (valid) {
//     const res = await $Login(formData)
//     if (res) {
//       const user = await $getUserOne({ username: formData.username })
//       userStore.setUser(user)
//       redirectUser()
//     }
//   }
// }

// const redirectUser = () => {
//   switch (formData.type) {
//     case '管理员':
//       router.push('/Index_U')
//       break
//     case '老师':
//       router.push('/Index_T')
//       break
//     case '学生':
//       router.push('/Index_S')
//       break
//     default:
//       alert('登录失败')
//       break
//   }
// }

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

onMounted(() => {
    // console.log(userStore.user.type);
    // console.log(teacherStore.teacher.type);


    if (userStore.user.username) {
        //    router.push('/Index_U')
        if (userStore.user.type == '2') {
            router.push('/Index_U')
        } else
            if (userStore.user.type == '1') {
                router.push('/Index_T')
            } else if (userStore.user.type == '0') {
                router.push('/Index_S')
            }
    }
})



const form = reactive({
    name: '',
    stucode: '',
    tel: '',
    gradeclass: '',
    stuname: '',
    stupwd: '',
    type: '0'
})

//注册框
const dialogVisible = ref(false)
const handleAdd = async () => {
  let res = await $addStudent(form);
  // console.log(res);
  // await 

  if (res.code == 200) {
    ElNotification({
      title: 'Success',
      message: '注册成功',
      type: 'success',
    });
    // 重新加载学生列表
   
    // 清空表单数据
    form.name = '';
    form.stucode = '';
    form.tel = '';
    form.gradeclass = '';
    form.stuname = '';
    form.stupwd = '';
    form.type = '0';

    // 关闭对话框
    dialogVisible.value = false;
  } else {
    ElNotification({
      title: 'Error',
      message: '学生信息添加失败',
      type: 'error',
    });
  }
}


</script>

<style scoped>
.login {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('../assets/images/login-bg.png');
    background-repeat: no-repeat;
    background-size: cover;

    .box {
        width: 400px;
        height: 260px;
        border: 1px solid #fff;
        background-color: white;
        position: relative;

        >>>.el-form-item__label {
            color: rgb(12, 1, 1);
        }

        .el-form {
            margin-right: 100px;
        }


        .title {
            color: white;
            font-family: "KaiTi", sans-serif;
            text-align: center;
        }
    }

    .dialog-footer button:first-child {
        margin-right: 10px;
    }


}
</style>
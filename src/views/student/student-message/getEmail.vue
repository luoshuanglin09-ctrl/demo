<template>
    <div class="send-box">
        <div class="search-box" :model="searchForm">
            <el-input v-model="searchForm.searchKeyword" placeholder="请输入搜索关键词" />
            <el-button type="primary" @click="handleSearch" style="margin-left: 20px;">搜索</el-button>
            <el-button type="info" @click="handleRemake">重置</el-button>
        </div>
        <div class="email-box">
            <el-table :data="pagesEmailList" style="width: 100%">
                <el-table-column prop="title" label="标题" />
                <el-table-column prop="sendname" label="发送人" />
                <el-table-column label="发送时间">
                    <template #default="scope">
                        {{ formatDate(scope.row.sendtime) }}
                    </template>
                </el-table-column>
                <el-table-column prop="getname" label="收件人" />
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button key="primary" type="primary" link @click="checkEmail(scope.$index, scope.row)">查看</el-button>
                        <el-button key="danger" type="danger" link @click="delSendEmail(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination size="small" class="pages" background layout="prev, pager, next" :total="EmailData.length" v-model:current-page="pagesIndex" />
        </div>
        <!-- 查看邮件详情 -->
        <el-dialog v-model="centerDialogVisible" title="发件箱" width="80%" center>
            <div>
                <div>
                    <h2>{{ EmailOne.title }}</h2>
                    <br><br>
                    <span class="span">发件人:{{ EmailOne.sendname }}</span><br>
                    <span class="span">发送时间:{{ formatDate(EmailOne.sendtime) }}</span><br>
                    <span class="span">收件人:{{ EmailOne.getname }}</span>
                </div>
                <div class="content-text">
                    <text>
                        {{ EmailOne.content }}
                    </text>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">关闭</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted, computed } from 'vue'
import { $getsingleGetEmail, $getGETEmail, $delGetEmail, $getEmailOne } from '../../../api/Student/email'
import { ElNotification, ElMessageBox } from 'element-plus'
import moment from 'moment'

onMounted(() => {
    // 获取当前用户姓名
    const storedName = sessionStorage.getItem('user');
    const nameArray = JSON.parse(storedName);
    const name = nameArray[0].name;
    form.sendname = name;
    searcheamil.searchname = name;
    searchForm.getname = name;
    loademail()
})

// 数据和状态定义
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const centerDialogVisible = ref(false)

// 发送邮件表单
const form = reactive({
    getname: '',
    title: '',
    content: '',
    sendname: '',
    sendtime: '',
    sendstatus: 1,
    getstatus: 1
})

// 搜索表单
const searchForm = reactive({
    searchKeyword: '',
    getname: '',
    getstatus: 1
})

// 获取邮件（收件箱）
const searcheamil = reactive({
    searchname: ''
})

// 删除邮件数据
const delSendEmaildata = reactive({
    id: '',
    getstatus: 2
})

// 查看邮件详情数据
const getEmailOneData = reactive({
    id: ''
})

let EmailData = ref([]);
let EmailOne = ref([]);
const loademail = async () => {
    let res = await $getGETEmail(searcheamil);
    if (res.code == 200) {
        EmailData.value = res.data;
    }
}

const delSendEmail = async (index, row) => {
    const confirmResult = await ElMessageBox.confirm('确定删除该邮件吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    });

    if (confirmResult === 'confirm') {
        delSendEmaildata.id = row.id;
        const res = await $delGetEmail(delSendEmaildata);

        if (res.code === 200) {
            ElNotification({
                title: 'Success',
                message: '邮件删除成功',
                type: 'success',
            });
            EmailData.value.splice(index, 1);
        }
    }
}

const checkEmail = async (index, row) => {
    getEmailOneData.id = row.id;
    const res = await $getEmailOne(getEmailOneData);
    if (res.code === 200) {
        EmailOne.value = res.data[0];
        centerDialogVisible.value = true;
    }
}

const handleSearch = async () => {
    const res = await $getsingleGetEmail(searchForm);
    if (res.code === 200) {
        EmailData.value = res.data;
    }
}

const handleRemake = async () => {
    searchForm.searchKeyword = '';
    loademail();
}

// 分页
let pagesIndex = ref(1);
let pagesEmailList = computed(() => {
    return EmailData.value.slice((pagesIndex.value - 1) * 10, pagesIndex.value * 10)
})

// 格式化日期
const formatDate = (dateString: string) => {
    return moment(dateString).format('YYYY-MM-DD');
}
</script>

<style lang="scss" scoped>
.send-box {
    width: 100%;
    height: 93vh;
    overflow: hidden;

    .send-btn {
        margin-top: 20px;
        margin-left: 40px;
    }

    .content {
        width: 100%;
        height: 300px;
        border: 1px solid #ccc;
        font-size: inherit;
        color: #606266;
    }

    .email-box {
        width: 90%;
        // height: 30px;
        // background-color: aquamarine;
        margin-top: 20px;
        margin-left: 40px;
        overflow: hidden;


    }

}

.pages {
    margin-top: 30px;
    float: right;
    margin-right: 100px;
}

.span {
    color: #606266;
    font-size: 14px;
}

.content-text {
    margin-top: 30px;
    width: 100%;
    height: 300px;
    border: 1px solid #ccc;
    font-size: inherit;
    color: #606266;
}

.search-box {
    width: 400px;
    display: flex;
    margin-top: 10px;
    margin-bottom: 20px;
    margin-left: 40px;
}
</style>
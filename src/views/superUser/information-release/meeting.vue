<template>
    <div>

        <!-- 新增 -->
        <div class="add_btn">
            <el-button type="primary" @click="dialogFormVisible = true" plain>新增</el-button>
            <el-dialog v-model="dialogFormVisible" title="新增学术会议" style="width: 500px;">
                <el-form :model="addactive">
                    <el-form-item label="学术会议名称" :label-width="formLabelWidth"
                        style="margin-right:200px; width: 400px;">
                        <el-input v-model="addactive.forum_name" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="地址" :label-width="formLabelWidth" style="margin-right:200px; width: 400px;">
                        <el-input v-model="addactive.address" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="内容" :label-width="formLabelWidth" style="margin-right:200px; width: 400px;">
                        <textarea class="content" v-model="addactive.content" style="width: 100%;height: 100px;"></textarea>
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取消</el-button>
                        <el-button type="primary" @click="handleAdd">确认</el-button>
                    </span>
                </template>
            </el-dialog>
        </div>

        <!-- 列表 -->
        <div class="email-box">
            <el-table :data="pagesforum" style="width: 100%">
                <el-table-column prop="id" label="序号" />
                <el-table-column prop="forum_name" label="学术会议名称" />
                <el-table-column prop="address" label="地点" />
                <el-table-column prop="name" label="发送人" />
                <el-table-column prop="datetime" label="发布时间" :formatter="formatDate" />
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button link type="primary" @click="copyLink(scope.row)">分享</el-button>
                        <el-button link type="primary" @click="Linklist(scope.$index, scope.row)">查看详情</el-button>
                        <el-button key="danger" type="danger" link @click="delforum(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog v-model="dialogVisible" title="查看详情" width="500" :before-close="handleClose">
                <h2>{{ xiangqingList.forum_name }}</h2>
                <span>地址：{{ xiangqingList.address }}</span><br/>
                <span>发起人：{{ xiangqingList.name }}</span><br/>
                <span>发起时间：{{ formatDate(xiangqingList.datetime) }}</span><br/>
                <textarea name="" id="" cols="60" rows="10">{{ xiangqingList.content }}</textarea>

                <template #footer>
                    <div class="dialog-footer">
                        <el-button @click="dialogVisible = false">关闭</el-button>
                    </div>
                </template>
            </el-dialog>
            <el-pagination size="small" class="pages" background layout="prev, pager, next" :total="data.length"
                v-model:current-page="pagesIndex" />
        </div>

    </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, computed } from 'vue'
import { ElNotification } from 'element-plus'
import { ElMessageBox } from 'element-plus'
import { $getforum, $delforum, $addforum } from '../../../api/forum/index'
import moment from 'moment';

const dialogFormVisible = ref(false)
const editdialogFormVisible = ref(false)
const formLabelWidth = '140px'
const dialogVisible = ref(false)

onMounted(() => {
    const storedName = sessionStorage.getItem('user');
    const nameArray = JSON.parse(storedName);
    const name = nameArray[0].name;
    NowUser.name = name
    loadmatch()
})

const NowUser = reactive({
    name: ''
})

const addactive = reactive({
    forum_name: '',
    address: '',
    name: '',
    datetime: '',
    content:''
})

let data = ref([])

const loadmatch = async () => {
    let res = await $getforum()
    data.value = res.data
}

let pagesIndex = ref(1);
let pagesforum = computed(() => {
    return data.value.slice((pagesIndex.value - 1) * 10, pagesIndex.value * 10)
})

const copyLink = async (row) => {
    try {
        await navigator.clipboard.writeText(window.location.href);
        ElNotification.success({
            title: '成功',
            message: '已复制链接，请前往聊天工具粘贴！'
        });
    } catch (error) {
        console.error('复制链接失败:', error);
        ElNotification.error({
            title: '错误',
            message: '复制链接失败！'
        });
    }
}

const delforumdata = reactive({
    id: ''
})

const delforum = async (index, row) => {
    delforumdata.id = row.id
    if (NowUser.name == row.name) {
        const res = await $delforum(delforumdata)
        loadmatch()
        if (res.code === 200) {
            ElNotification.success({
                title: '成功',
                message: '已删除对应活动'
            });
        } else {
            ElNotification.error({
                title: '错误',
                message: '删除失败'
            });
        }
    } else {
        alert('此活动发布人不为您，请选择您发布的活动进行删除')
    }
}

const handleAdd = async () => {
    const currentDate = new Date();
    const formattedDate = moment(currentDate).format('YYYY-MM-DD HH:mm:ss');
    addactive.datetime = formattedDate
    addactive.name = NowUser.name

    let res = await $addforum(addactive)
    
    if (res.code == 200) {
        ElNotification({
            title: '成功',
            message: '添加成功',
            type: 'success',
        });
        
        addactive.forum_name = '';
        addactive.address = '';
        addactive.content = '';

        dialogFormVisible.value = false;
    } else {
        ElNotification({
            title: '错误',
            message: '添加失败',
            type: 'error',
        });
    }
}

const xiangqingList = reactive({
    forum_name: '',
    address: '',
    name: '',
    datetime: '',
    content:''
})

const Linklist = async (index, row) => {
    dialogVisible.value = true
    xiangqingList.forum_name = row.forum_name
    xiangqingList.address = row.address
    xiangqingList.name = row.name
    xiangqingList.datetime = row.datetime
    xiangqingList.content = row.content
}

const formatDate = (dateString) => {
    return moment(dateString).format('YYYY-MM-DD');
}
</script>

<style lang="scss" scoped>
.pages {
    margin-top: 30px;
    float: right;
    margin-right: 100px;
}
</style>
  
<template>
    <div>
        <div class="email-box">
            <el-table :data="pagesforum" style="width: 100%">
                <el-table-column prop="id" label="序号" />
                <el-table-column prop="forum_name" label="比赛项目" />
                <el-table-column prop="address" label="地点" />
                <el-table-column prop="name" label="发送人" />
                <el-table-column prop="datetime" label="发布时间" />
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button link type="primary" @click="copyLink(scope.row)">分享</el-button>
                        <el-button link type="primary" @click="Linklist(scope.$index, scope.row)">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog v-model="dialogVisible" title="查看详情" width="500" :before-close="handleClose">
                <h2>{{ xiangqingList.forum_name }}</h2>
                <span>地址：{{ xiangqingList.address }}</span><br />
                <span>发起人：{{ xiangqingList.name }}</span><br />
                <span>发起时间：{{ xiangqingList.datetime }}</span><br />
                <textarea name="" id="" cols="60" rows="10">{{ xiangqingList.content }}</textarea>
                <template #footer>
                    <div class="dialog-footer">
                        <el-button @click="dialogVisible = false">关闭</el-button>
                    </div>
                </template>
            </el-dialog>
            <el-pagination size="small" class="pages" background layout="prev, pager, next" :total="data.length" v-model:current-page="pagesIndex" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, computed } from 'vue'
import { ElNotification, ElMessageBox } from 'element-plus'
import moment from 'moment'
import { $getforum } from '../../../api/forum/index'

const dialogVisible = ref(false)

onMounted(() => {
    loadmatch()
})

let data = ref([])

const loadmatch = async () => {
    let res = await $getforum()
    res.data.forEach(item => {
        item.datetime = moment(item.datetime).format('YYYY-MM-DD') // 格式化为年月日
    })
    data.value = res.data
}

// 分页
let pagesIndex = ref(1);
let pagesforum = computed(() => {
    return data.value.slice((pagesIndex.value - 1) * 10, pagesIndex.value * 10)
})

const copyLink = async (row) => {
    try {
        await navigator.clipboard.writeText(window.location.href)
        ElNotification.success({
            title: 'Success',
            message: '已复制链接，请前往聊天工具粘贴！'
        })
    } catch (error) {
        console.error('Failed to copy link:', error)
        ElNotification.error({
            title: 'Error',
            message: 'Failed to copy link!'
        })
    }
}

const xiangqingList = reactive({
    forum_name: '',
    address: '',
    name: '',
    datetime: '',
    content: ''
})

const Linklist = async (index, row) => {
    dialogVisible.value = true
    xiangqingList.forum_name = row.forum_name
    xiangqingList.address = row.address
    xiangqingList.name = row.name
    xiangqingList.datetime = moment(row.datetime).format('YYYY-MM-DD') // 格式化为年月日
    xiangqingList.content = row.content
}
</script>

<style lang="scss" scoped>
    .pages{
  margin-top: 30px;
  float: right;
  margin-right: 100px;
}
</style>
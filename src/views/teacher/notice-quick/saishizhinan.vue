<template>
    <div>

        <!-- 新增 -->
        <div class="add_btn">
            <el-button type="primary" @click="dialogFormVisible = true" plain>新增</el-button>
            <el-dialog v-model="dialogFormVisible" title="新增赛事" style="width: 500px;">
                <el-form :model="addactive">
                    <el-form-item label="比赛项目" :label-width="formLabelWidth" style="margin-right:200px; width: 400px;">
                        <el-input v-model="addactive.competition_item" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="地址" :label-width="formLabelWidth" style="margin-right:200px; width: 400px;">
                        <el-input v-model="addactive.address" autocomplete="off" />
                    </el-form-item>
                    <!-- <el-form-item label="发布人" :label-width="formLabelWidth" style="margin-right:200px; width: 400px;">
                        <el-input v-model="addactive.name" autocomplete="off" />
                    </el-form-item> -->
                    <el-form-item label="内容" :label-width="formLabelWidth" style="margin-right:200px; width: 400px;">
                        <textarea class="content" v-model="addactive.content" style="width: 100%;height: 100px;"></textarea>
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取消</el-button>
                        <el-button type="primary" @click="handleAdd">
                            确认
                        </el-button>
                    </span>
                </template>
            </el-dialog>
        </div>

        <!-- 列表 -->
        <div class="email-box">
            <el-table :data="pagesCompetition" style="width: 100%">
                <el-table-column prop="id" label="序号" />
                <el-table-column prop="competition_item" label="比赛项目" />
                <el-table-column prop="address" label="地点" />
                <el-table-column prop="name" label="发送人" />
                <el-table-column label="操作">
                    <template #default="scope">
                        <!-- <el-button key="primary" type="primary" link
                            @click="checkEmail(scope.$index, scope.row)">查看</el-button> -->

                        <el-button link type="primary" @click="copyLink(scope.row)">分享</el-button>
                        <el-button link type="primary" @click="Linklist(scope.$index, scope.row)">查看详情</el-button>
                        <el-button key="danger" type="danger" link
                            @click="delcompetition(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>

            </el-table>
            <el-dialog v-model="dialogVisible" title="查看详情" width="500" :before-close="handleClose">
                    <h2>{{xiangqingList.competition_item  }}</h2>
                    <span>地址：{{ xiangqingList.address }}</span><br/>
                    <span>发起人:{{ xiangqingList.name }}</span><br/>
                    <!-- <span>发起时间:{{ xiangqingList.datetime }}</span><br/> -->
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
import { ElNotification, ElMessageBox } from 'element-plus'
import { $getcompetition } from '../../../api/competition/index'
import { $delCompetition } from '../../../api/competition/index'
import {$addCompetition} from '../../../api/competition/index'


const dialogFormVisible = ref(false)
const editdialogFormVisible = ref(false)
const formLabelWidth = '140px'
const dialogVisible = ref(false)
onMounted(() => {
    //获取当前用户
    const storedName = sessionStorage.getItem('user');
    const nameArray = JSON.parse(storedName);
    const name = nameArray[0].name;
    NowUser.name = name
    
    loadmatch()



})

//存储当前用户
const NowUser = reactive({
    name: ''
})

// 新增活动

const addactive = reactive({
    competition_item:'',
    address:'',
    name:'',
    content:''
})

let data = ref([])

const loadmatch = async () => {
    let res = await $getcompetition()
    console.log(res.data[0]);
    data.value = res.data
}



//分页

let pagesIndex = ref(1);
let pagesCompetition = computed(() => {
    return data.value.slice((pagesIndex.value - 1) * 10, pagesIndex.value * 10)
})


const copyLink = async (row) => {
    console.log();

    try {
        await navigator.clipboard.writeText(window.location.href);
        ElNotification.success({
            title: 'Success',
            message: '已复制链接，请前往聊天工具粘贴！  '
        });
    } catch (error) {
        console.error('Failed to copy link:', error);
        ElNotification.error({
            title: 'Error',
            message: 'Failed to copy link!'
        });
    }
}

//删除赛事
const delcompetitiondata = reactive({
    id: ''
})

const delcompetition = async (index, row) => {
    delcompetitiondata.id = row.id
    // console.log(row.name);
    if (NowUser.name == row.name) {

        const res = await $delCompetition(delcompetitiondata)
        if (res.code === 200) {
            ElNotification.success({
                title: 'Success',
                message: '已删除对应活动 '
            });
            loadmatch()
        } else {
            ElNotification.error({
                title: 'Error',
                message: '删除失败'
            });
        }

    } else {
        alert('此活动发布人不为您，请选择您发布的活动进行删除')
    }


}

//新增赛事

const handleAdd = async () =>{
    addactive.name = NowUser.name
    // console.log(addactive.name);
    // console.log(addactive);
    
    let res = await $addCompetition(addactive)
    console.log(res,'=====');
    
    if(res.code == 200){
        loadmatch()
        ElNotification({
            title: 'Success',
            message: '添加成功',
            type: 'success',
        });

        // 清空表单数据
        addactive.competition_item = '';
        addactive.address = '';

    

    // 关闭对话框
    dialogFormVisible.value = false;
    }else{
        ElNotification({
            title: 'error',
            message: '添加失败',
            type: 'error',
        });
    }
    
}

const xiangqingList = reactive({
    competition_item:'',
    address:'',
    name:'',
    content:''
})
const Linklist = async(index,row) =>{
    dialogVisible.value = true
    xiangqingList.competition_item = row.competition_item
    xiangqingList.address = row.address
    xiangqingList.name = row.name
    // xiangqingList.datetime = row.datetime
    xiangqingList.content = row.content
    
}
</script>
<style lang="scss" scoped>
.pages {
    margin-top: 30px;
    float: right;
    margin-right: 100px;
}
</style>
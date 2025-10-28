<template>
  <div class="top">
    <div class="add_btn">
      <el-button type="primary" @click="dialogFormVisible = true" plain>新增</el-button>
      <el-dialog v-model="dialogFormVisible" title="新增学生" style="width: 500px;">
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
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="handleAdd">
              确认
            </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
    <div class="search" :model="searchForm">
      <el-input v-model="searchForm.searchKeyword" placeholder="请输入搜索关键词" />
      <el-button type="primary" @click="handleSearch" style="margin-left: 20px;" >搜索</el-button>
      <el-button type="info" @click="handleRemake">重置</el-button>
    </div>
  </div>
  <!-- 编辑弹窗 -->
  <div class="edit_btn">
    <!-- <el-button type="primary" @click="dialogFormVisible = true" plain>新增</el-button> -->

    <el-dialog v-model="editdialogFormVisible" title="编辑学生" style="width: 500px;">
      <el-form :model="editForm">
        <el-form-item label="姓名" :label-width="formLabelWidth" style="margin-right:200px; width: 400px;">
          <el-input v-model="editForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="学号" :label-width="formLabelWidth" style="margin-right:200px; width: 400px;">
          <el-input v-model="editForm.stucode" autocomplete="off" />
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" style="margin-right:200px; width: 400px;">
          <el-input v-model="editForm.tel" autocomplete="off" />
        </el-form-item>
        <el-form-item label="班级" :label-width="formLabelWidth" style="margin-right:200px; width: 400px;">
          <el-input v-model="editForm.gradeclass" autocomplete="off" />
        </el-form-item>
        <el-form-item label="账号" :label-width="formLabelWidth" style="margin-right:200px; width: 400px;">
          <el-input v-model="editForm.stuname" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" style="margin-right:200px; width: 400px;">
          <el-input v-model="editForm.stupwd" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editdialogFormVisible = false">取消</el-button>
          <!-- <el-button type="primary" @click="dialogFormVisible = false">
            Confirm
          </el-button> -->
          <el-button type="primary" @click="handleEditConfirm">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
  <div class="content">
    <el-table :data="pagesStuList" border style="width: 100%">
      <el-table-column prop="studId" label="ID" width="80" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="stuname" label="账号" />
      <el-table-column prop="stupwd" label="密码" />
      <el-table-column prop="stucode" label="学号" />
      <el-table-column prop="tel" label="电话" />
      <el-table-column prop="gradeclass" label="班级" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button key="primary" type="primary" link @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button key="danger" type="danger" link @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <!-- <el-button key="danger" type="danger" link >查看详情</el-button> -->
        </template>
      </el-table-column>

    </el-table>
    <el-pagination size="small" class="pages"   background layout="prev, pager, next" :total="stuData.length"  v-model:current-page="pagesIndex" />
  </div>
</template>
<script setup lang="ts">

import { onMounted, ref, reactive,computed} from 'vue';
import { $getStuList } from '../../../api/SuperUser/student';
import { $addStudent } from '../../../api/SuperUser/student';
import { $delStudent } from '../../../api/SuperUser/student';
import { $editStudent } from '../../../api/SuperUser/student';
import { $getsingleStudent} from '../../../api/SuperUser/student';
import { ElNotification, ElMessageBox } from 'element-plus'

const dialogFormVisible = ref(false)
const editdialogFormVisible = ref(false)
const formLabelWidth = '140px'


const form = reactive({
  name: '',
  stucode: '',
  tel: '',
  gradeclass: '',
  stuname: '',
  stupwd: '',
  type: '0'
})

const editForm = reactive({
  name: '',
  stucode: '',
  tel: '',
  gradeclass: '',
  stuname: '',
  stupwd: '',
  type: '0'
})
// const searchKeyword = ref('');
const searchForm = reactive({
  searchKeyword:''
})

let stuData = ref([])

const loadStuList = async () => {
  let res = await $getStuList();
  console.log(res);
  stuData.value = res.data;


};

onMounted(() => {
  loadStuList()
})


// 新增学生
const handleAdd = async () => {
  let res = await $addStudent(form);
  // console.log(res);
  // await 

  if (res.code == 200) {
    loadStuList()
    ElNotification({
      title: 'Success',
      message: '学生信息添加成功',
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
    dialogFormVisible.value = false;
  } else {
    ElNotification({
      title: 'Error',
      message: '学生信息添加失败',
      type: 'error',
    });
  }
}

//删除学生
const handleDelete = async (index, row) => {
  const confirmResult = await ElMessageBox.confirm('确定删除该学生信息吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  });

  if (confirmResult === 'confirm') {
    const deleteResult = await $delStudent(row.studId);

    if (deleteResult.code == 200) {
      ElNotification({
        title: 'Success',
        message: '学生信息删除成功',
        type: 'success',
      });
      stuData.value.splice(index, 1);
    }
  }
}
//修改学生信息
const handleEdit = async (index, row) => {
  Object.assign(editForm, row);
  editdialogFormVisible.value = true
}

const handleEditConfirm = async () => {
 
  
  const updateResult = await $editStudent(editForm);
  if (updateResult.code === 200) {
    ElNotification({
      title: 'Success',
      message: '学生信息更新成功',
      type: 'success',
    });
    editdialogFormVisible.value = false
    loadStuList();
  } else {
    ElNotification({
      title: 'Error',
      message: '学生信息更新失败',
      type: 'error',
    });
  }
}

//模糊查询学生、学号
const handleSearch = async () => {
  console.log(searchForm.searchKeyword);
  
  // console.log(1111);
  const response = await $getsingleStudent(searchForm);
  console.log(response,'getsingleStudent');
  
    const data = await response;
    if (data.code === 200) {
      // 假设后端响应中有一个包含搜索结果的 'data' 字段
      stuData.value = data.data;
    } else {
      throw new Error('查询学生信息失败');
    }
};

//重置按钮
const handleRemake = () => {
  searchForm.searchKeyword = '';
  loadStuList();
}

//分页

let pagesIndex = ref(1);
let pagesStuList = computed(() =>{
  return stuData.value.slice((pagesIndex.value-1)*10,pagesIndex.value*10)
})

</script>
<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;

}

.dialog-footer button:first-child {
  margin-right: 10px;
}

.add_btn {
  margin-top: 10px;
  margin-bottom: 20px;
}

.edit_btn {
  margin-top: 10px;
  margin-bottom: 20px;
}
.top{
  display: flex;
  // justify-content: space-between;
  .search{
    display: flex;
    margin-top: 10px;
    margin-bottom: 20px;
    margin-left: 100px;
  }
}
.pages{
  margin-top: 30px;
  float: right;
  margin-right: 100px;
}
</style>
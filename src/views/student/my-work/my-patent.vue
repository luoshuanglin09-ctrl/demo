<template>
    <div>
      <!-- 上传专利 -->
      <div>
        <div class="send-btn">
          <el-button type="success" plain @click="dialogFormVisible = true">上传</el-button>
        </div>
        <div>
          <el-dialog v-model="dialogFormVisible" title="上传专利" style="width: 400px;">
            <el-form :model="form">
              <el-form-item label="题目" :label-width="formLabelWidth">
                <el-input style="width: 180px;" v-model="form.title" autocomplete="off" />
              </el-form-item>
              <el-form-item label="上传专利" :label-width="formLabelWidth">
                <input type="file" ref="fileInput" @change="handleFileChange" />
              </el-form-item>
  
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="uploadFile">
                  确认
                </el-button>
              </span>
            </template>
          </el-dialog>
        </div>
      </div>
      <!-- 展示文件 -->
      <div>
        <div class="email-box">
          <el-table :data="paperList" style="width: 100%">
            <el-table-column prop="title" label="标题" />
            <el-table-column prop="stuname" label="上传者" />
            <el-table-column prop="teachname" label="导师" />
            <el-table-column label="状态" prop="type">
              
            </el-table-column>
            <el-table-column label="审核内容" prop="content"></el-table-column>
            <el-table-column label="操作">
  
              <template #default="scope">
                <el-button key="danger" type="danger" link @click="delpaper(scope.$index, scope.row)">删除</el-button>
                <el-button link @click="downloadFile(scope.row.filename)" type="success" size="small">下载文件</el-button>
              </template>
              
            </el-table-column>
  
          </el-table>
          <!-- <el-pagination size="small" class="pages" background layout="prev, pager, next" :total="EmailData.length"
            v-model:current-page="pagesIndex" /> -->
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import axios from 'axios';
  import { reactive, ref, onMounted } from 'vue'
  import { $getpatent } from '../../../api/paper/paper'
  import {$delpaper} from '../../../api/paper/paper.ts'
  import { ElNotification, ElMessageBox } from 'element-plus'
  const dialogFormVisible = ref(false)
  const formLabelWidth = '140px'
  
  const form = reactive({
    title: '',
    type: '未审核',
    stuname: '',
    teachname: '',
    filetype:'专利'
  
  })
  
  //获取邮件（收件箱）
  const searchpaper = reactive({
    searchname: ''
  })
  
  
  const downloadFile = async (filename: string) => {
    
    
    try {
      const response = await axios.get(`http://localhost:3001/paper/download/${filename}`, {
        responseType: 'blob'
      });
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename); // 使用传入的文件名
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('下载文件时出错：', error);
      alert('文件下载失败，请稍后重试');
    }
  }
  
  onMounted(() => {
    //获取当前用户姓名
    const storedName = sessionStorage.getItem('user');
    const nameArray = JSON.parse(storedName);
    const name = nameArray[0].name;
    form.stuname = name;
    searchpaper.searchname = name;
    const teachname = nameArray[0].teachname;
    form.teachname = teachname;
    loadpaper()
  
  })
  
  
  //获取专利
  const paperList = ref([]);
  const loadpaper = async () => {
    const res = await $getpatent(searchpaper)
    console.log(res, 'res');
    paperList.value = res.data
   
  
  }
  
  
  //上传专利
  const fileInput = ref<HTMLInputElement | null>(null);
  let selectedFile: File | null = null;
  
  const handleFileChange = () => {
    if (fileInput.value && fileInput.value.files) {
      selectedFile = fileInput.value.files[0];
    }
  };
  
  const uploadFile = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('title', form.title);
      formData.append('stuname', form.stuname);
      formData.append('teachname', form.teachname);
      formData.append('type', form.type);
      formData.append('filetype' , form.filetype)
  
      try {
        const response = await fetch('http://localhost:3001/paper/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        console.log(data);
        if (data.code == 200) {
          dialogFormVisible.value = false
          loadpaper()
        }
      } catch (error) {
        console.error('上传文件失败:', error);
      }
    }
  };
  
  const delpaper = async(index,row) =>{
    const confirmResult = await ElMessageBox.confirm('确定删除该学生信息吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    });
    const res = await $delpaper(row.id)
  
    if(res.code == 200 ){
      ElNotification({
          title: 'Success',
          message: '专利删除成功',
          type: 'success',
        });
      paperList.value.splice(index, 1);
    }
  
    
  }
  
  </script>
  
  <style scoped>
  /* 在这里添加您的样式 */
  </style>
  
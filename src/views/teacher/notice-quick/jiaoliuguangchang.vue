<template>
  <div class="box">
      <div class="title">
          <h2>成都工业学术交流广场</h2>
      </div>

      <!-- 发帖 -->
      <el-button type="primary" @click="dialogVisible = true" style="margin-bottom: 20px;">
          发帖
      </el-button>
      <el-dialog v-model="dialogVisible" title="发帖" width="500" :before-close="handleClose">
          <el-form :model="editForm">
              <el-form-item label="标题" :label-width="formLabelWidth" style="margin-right:200px; width: 400px;">
                  <el-input v-model="addpost.title" autocomplete="off" />
              </el-form-item>
              <el-form-item label="内容" :label-width="formLabelWidth" style="margin-right:200px; width: 400px;">
                  <el-input v-model="addpost.content" autocomplete="off" />
              </el-form-item>
          </el-form>
          <template #footer>
              <div class="dialog-footer">
                  <el-button @click="dialogVisible = false">Cancel</el-button>
                  <el-button type="primary" @click="addposts">确认</el-button>
              </div>
          </template>
      </el-dialog>

      <!-- 评论 -->
      <el-dialog v-model="dialogFormVisible" title="评论" width="500">
          <el-form :model="form">
              <el-form-item label="请输入你的评论" :label-width="formLabelWidth">
                  <el-input v-model="addcomments.content" autocomplete="off" />
              </el-form-item>
          </el-form>
          <template #footer>
              <div class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取消</el-button>
                  <el-button type="primary" @click="truecommit">确认</el-button>
              </div>
          </template>
      </el-dialog>

      <!-- 查看评论 -->
      <el-dialog v-model="dialogTableVisible" title="评论区" width="60%">
          <div class="comments" v-for="item in commentsdata" :key="item.comment_id">
              <h3>{{ item.NAME }}:</h3>
              <div class="comments-content">
                  <span>{{ item.content }}</span>
              </div>
              <div class="comments-time">{{ item.created_at }}</div>
          </div>
      </el-dialog>

      <div class="post" v-for="(post, index) in paginatedPosts" :key="post.postId">
          <div class="post-space">
              <div class="post-content">
                  <h3>{{ post.title }}</h3>
                  <br>
                  <span style="margin-top: 20px;">{{ post.content }}</span>
                  <div class="post-content-bottom">
                      <span>发布人:{{ post.AuthorNmae }}</span>
                      <span style="margin-left: 20px; margin-right: 20px;">发布时间:{{ post.CreatedTime }}</span>
                      <br>
                      <el-button type="primary" link @click="addcommit(post.postId)">评论</el-button>
                      <el-button type="primary" link @click="showcomments(post.postId)">查看评论</el-button>
                  </div>
              </div>
          </div>
      </div>

      <!-- 分页 -->
      <el-pagination
          @size-change="handlePageSizeChange"
          @current-change="handleCurrentPageChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="pageSize"
          layout="sizes, prev, pager, next, jumper"
          :total="posts.length">
      </el-pagination>
  </div>
</template>


  
  <script setup lang="ts">
import { $getPost, $addPosts, $addcomments, $getcomments } from '../../../api/post/post'
import { reactive, ref, onMounted, computed } from 'vue'
import moment from 'moment';

const pageSize = ref(5);
const currentPage = ref(1);
const posts = ref([]);
const commentsdata = ref([]);
const dialogVisible = ref(false);
const dialogFormVisible = ref(false);
const dialogTableVisible = ref(false);
const addpost = reactive({
    title: "",
    content: "",
    AuthorNmae: "",
    CreatedTime: ""
});

const addcomments = reactive({
    postId: "",
    content: "",
    NAME: "",
    created_at: ""
});

const getcomments = reactive({
    postId: ""
});

onMounted(() => {
    //获取当前用户
    const storedName = sessionStorage.getItem('user');
    const nameArray = JSON.parse(storedName);
    const name = nameArray[0].name;
    console.log(name);
    addpost.AuthorNmae = name;

    getpost();
});

const getpost = async () => {
    let res = await $getPost();
    console.log(res);

    // 格式化时间
    if (res.code === 200) {
        res.data.forEach(post => {
            post.CreatedTime = moment(post.CreatedTime).format('YYYY-MM-DD');
        });
        posts.value = res.data;
    }
};

const addposts = async () => {
    const currentDate = new Date();
    const formattedDate = moment(currentDate).format('YYYY-MM-DD HH:mm:ss');
    addpost.CreatedTime = formattedDate;
    
    let res = await $addPosts(addpost);
    if (res.code == 200) {
        dialogVisible.value = false;
        getpost();
    }
};

const addcommit = async (postId) => {
    dialogFormVisible.value = true;
    addcomments.postId = postId;

    const storedName = sessionStorage.getItem('user');
    const nameArray = JSON.parse(storedName);
    const name = nameArray[0].name;
    addcomments.NAME = name;

    const currentDate = new Date();
    const formattedDate = moment(currentDate).format('YYYY-MM-DD HH:mm:ss');
    addcomments.created_at = formattedDate;
};

const truecommit = async () => {
    const res = await $addcomments(addcomments);
    if (res.code == 200) {
        getpost();
        dialogFormVisible.value = false;
    }
};

const showcomments = async(postId) => {
    getcomments.postId = postId;
    dialogTableVisible.value = true;

    const res = await $getcomments(getcomments);
    console.log(res);

    // 格式化评论时间
    if (res.code === 200) {
        res.data.forEach(comment => {
            comment.created_at = moment(comment.created_at).format('YYYY-MM-DD');
        });
        commentsdata.value = res.data;
    }
};

// 计算分页后的数据
const paginatedPosts = computed(() => {
    const startIndex = (currentPage.value - 1) * pageSize.value;
    const endIndex = startIndex + pageSize.value;
    return posts.value.slice(startIndex, endIndex);
});

// 处理页面大小变化事件
const handlePageSizeChange = (val) => {
    pageSize.value = val;
    currentPage.value = 1; // 回到第一页
};

// 处理当前页数变化事件
const handleCurrentPageChange = (val) => {
    currentPage.value = val;
};

  </script>
  
  <style lang="scss" scoped>
  .box {
    width: 65%;
    height: 100%;
    margin-left: 15%;
  
    .title {
      width: 100%;
      height: 40px;
      text-align: center;
      line-height: 40px;
    }
  
    .post {
      width: 100%;
      height: 100%;
      background-color: aquamarine;
      overflow: hidden;
  
      .post-space {
        width: 100%;
        height: 150px;
        background-color: white;
        border-bottom: 1px solid #F2F3F5;
        overflow: hidden;
      }
  
      .post-content {
        width: 98.3%;
        height: 150px;
        margin-left: 20px;
        margin-top: 20px;
  
        .post-content-bottom {
          margin-top: 20px;
          margin-left: 70%;
          font-size: 12px;
          line-height: 20px;
        }
      }
    }
  
    .comments{
      width: 100%;
      height: 80px;
      border-bottom: 1px solid white;
      background-color: #F2F3F5;
      .comments-content{
        margin-top: 10px;
        margin-left: 50px;
      }
  
      .comments-time{
        float: right;
      }
    }
  
    .pagination {
      margin-top: 20px;
      display: flex;
      justify-content: center;
    }
  }
  </style>
  
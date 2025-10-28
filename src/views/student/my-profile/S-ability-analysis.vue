<template>
  <div>
    <div class="top">
      <div class="box">
        <div class="title">
          <div class="title-box">
            <div class="title-icon">
              <img src="../../../assets/images/论文答辩.png" style="width: 100%; height: 100%;" alt="">
            </div>
            <span>论文</span>
            <span style="margin-left: 280px;">份</span>
          </div>
        </div>
        <div class="content">
          <span>{{ abillityList.paper }}</span>
        </div>
      </div>
      <div class="box">
        <div class="title">
          <div class="title-box">
            <div class="title-icon">
              <img src="../../../assets/images/专利.png" style="width: 100%; height: 100%;" alt="">
            </div>
            <span style="margin-left: 15px;">专利</span>
            <span style="margin-left: 280px;">份</span>
          </div>
        </div>
        <div class="content">
          <span>{{ abillityList.zl }}</span>
        </div>
      </div>
      <div class="box">
        <div class="title">
          <div class="title-box">
            <div class="title-icon">
              <img src="../../../assets/images/获奖.png" style="width: 100%; height: 100%;" alt="">
            </div>
            <span style="margin-left: 15px;">获奖</span>
            <span style="margin-left: 280px;">份</span>
          </div>
        </div>
        <div class="content">
          <span>{{ abillityList.hj }}</span>
        </div>
      </div>
      <div class="box">
        <div class="title">
          <div class="title-box">
            <div class="title-icon">
              <img src="../../../assets/images/用工总量.png" style="width: 100%; height: 100%;" alt="">
            </div>
            <span style="margin-left: 15px;">总计</span>
            <span style="margin-left: 280px;">份</span>
          </div>
        </div>
        <div class="content">
          <span>{{ abillityList.all }}</span>
        </div>
      </div>
    </div>

    <div class="echart">
      <div class="echart-box">
        <h3>上传作品数量分布图</h3>
        <!-- echarts图 -->
        <zzt :paper="abillityList.paper" :zl="abillityList.zl" :hj="abillityList.hj" :all="abillityList.all" />
      </div>

      <div class="echart-box">
        <huanxintu :abillityList="abillityList" />
      </div>
    </div>

    <!-- <div class="form">
      <div class="email-box">
        <el-table :data="stuAlllist" style="width: 100%">
          <el-table-column prop="title" label="标题" />
          <el-table-column prop="stuname" label="上传者" />
          <el-table-column prop="teachname" label="导师" />
          <el-table-column label="状态" prop="type">

          </el-table-column>
          <el-table-column label="审核内容" prop="content"></el-table-column>

        </el-table>
       
      </div>
    </div> -->
  </div>

</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import * as echarts from 'echarts';
import { $getpapercount } from '../../../api/abillity/abillity'
import { $getzlcount } from '../../../api/abillity/abillity'
import { $gethjcount } from '../../../api/abillity/abillity'
import { $getallpaper } from '../../../api/abillity/abillity';
import {$getstuall} from '../../../api/abillity/abillity';
import zzt from '../../../components/echarts/student/zzt.vue';
import huanxintu from '../../../components/echarts/student/huanxintu.vue';


const searchForm = reactive({
  searchKeyword: ''
})

const abillityList = reactive({
  paper: "",
  zl: "",
  hj: "",
  all: ""
})

// cosnt stuAlllist = ref([])

onMounted(() => {
  const storedName = sessionStorage.getItem('user');
  const nameArray = JSON.parse(storedName);
  const name = nameArray[0].name;
  searchForm.searchKeyword = name;
  // console.log(name);
  getpapercount()
  getzlcount()
  gethjcount()
  getallpaper()
  getstuall()

});


const getpapercount = async () => {
  const res = await $getpapercount(searchForm)

  abillityList.paper = res.data[0].paper_count
  console.log(abillityList.paper);


}

const getzlcount = async () => {
  const res = await $getzlcount(searchForm)

  abillityList.zl = res.data[0].zl_count
  console.log(abillityList.zl);

}

const gethjcount = async () => {
  const res = await $gethjcount(searchForm)

  abillityList.hj = res.data[0].hj_count
  console.log(abillityList.hj);

}


const getallpaper = async () => {
  const res = await $getallpaper(searchForm)

  abillityList.all = res.data[0].allpaper
  console.log(abillityList.all);

}

const stuAlllist = ref([])
const getstuall = async ()=>{
  const res =await $getstuall(searchForm)
  console.log(res.data[0],'11111');
  stuAlllist.value  = res.data
  console.log(stuAlllist.value,'2222');
  
}


</script>

<style lang="scss" scoped>
.top {
  width: 99%;
  height: 154px;
  display: flex;
  justify-content: space-between;
  align-content: space-between;

  .box {
    width: 400px;
    height: 145px;
    background-color: white;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 20px;
    border: 1px solid #F2F3F5;


    .title {
      width: 100%;
      height: 67px;
      border: 1px solid #F2F3F5;

      .title-box {
        width: 372px;
        height: 30px;
        // background-color: aqua;
        margin: 18px 20px 0 20px;
        display: flex;
        line-height: 30px;
        font-size: 14px;
      }

      .title-icon {
        width: 30px;
        height: 30px;
      }
    }

    .content {
      width: 372px;
      height: 76px;
      margin: 18px 20px 0 20px;
      font-size: 1.875rem;
      line-height: 2.25rem;
    }
  }
}

.echart {
  width: 99%;
  height: 440px;
  // background-color: white;
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  align-content: space-between;

  .echart-box {
    width: 838px;
    height: 440px;
    background-color: white;
    margin-left: 20px;
    text-align: center;
  }
}
</style>
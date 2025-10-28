<script setup lang="ts">
  import useStore from './store/user';
  import teachStore from './store/teacher';
  import stuStor from './store/student'
  const userStore = useStore();
  const teacherStore = teachStore();
  const stuStore = stuStor();

  if(sessionStorage.getItem('userLogin')){
    let userLogin = JSON.parse(sessionStorage.getItem('userLogin'));
    userStore.setUser(userLogin);
  }else

  if(sessionStorage.getItem('teachLogin')){
    let teachLogin = JSON.parse(sessionStorage.getItem('teachLogin'));
    teacherStore.setTeach(teachLogin);
  }if(sessionStorage.getItem('stuLogin')){
    let stuLogin = JSON.parse(sessionStorage.getItem('stuLogin'));
    stuStore.setStu(stuLogin);
  }
  
</script>

<template>
  <div>
    <router-view></router-view>
  </div>
  
</template>

<style scoped>

</style>

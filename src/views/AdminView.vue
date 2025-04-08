<script setup>
import { ref ,onMounted} from 'vue'
import { RouterView } from 'vue-router'
import { useAdminStore } from '@/store/admin'
const adminStore = useAdminStore()
onMounted(() => { 
  if (!adminStore.getAdminId) {
    router.push('/admin/login')
  }
})
const active = ref("AdminHome");
const tabList = [
  {
      title: '管理员主页',
    name: 'AdminHome',
      icon: 'home-o',
      path: '/admin/home',
    },
    {
      title: '患者管理',
      name: 'Patient',
      icon: 'user-o',
      path: '/admin/patientManagement',
    },
    {
      title: '医生管理',
      name: 'Doctor',
      icon: 'friends-o',
      path: '/admin/doctorManagement',
    }
  ];
</script>
<template>
<div class="content">
<router-view/>
<van-tabbar v-model="active" :route="true">
  <van-tabbar-item v-for="(item,index) in tabList" :key="index" :name="item.name" :icon="item.icon" :to="item.path">
     {{ item.title }}
  </van-tabbar-item> 
</van-tabbar>
</div>
</template>
<style scoped>
@import url('@/assets/css/content.css');
</style>
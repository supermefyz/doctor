<script setup>
import { useRoute } from "vue-router";
import { ref } from 'vue';
import Chat from '@/views/history/chat.vue'
import Diagnosis from '@/views/history/diagnosis.vue'
import Suggest from '@/views/history/suggest.vue'
import { useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const id = route.query.id ? Number(route.query.id) : null;
if (id === null) {
  alert('缺少患者ID参数');
  router.push('/admin/patientManagement'); // 需要提前导入 useRouter
}
console.log(typeof id)
const name = route.query.name;
 const active = ref(0);
const title= `${id?? '未知ID'}.${name?? '未命名用户'}的历史记录`;
</script>
<template>
    <van-nav-bar :title=title left-text="&lt;返回" @click-left="router.push('/admin/patientManagement')" />
    <van-tabs v-model:active="active">
  <van-tab title="聊天记录"><Chat :user-id="id"/></van-tab>
  <van-tab title="诊断记录"><Diagnosis :user-id="id"/></van-tab>
  <van-tab title="历史建议"><Suggest :user-id="id"/></van-tab>
</van-tabs>
</template>
<style scoped>

</style>

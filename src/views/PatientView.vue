<script setup>
import { NQrCode,NDescriptions, NDescriptionsItem } from "naive-ui";
import { ref, onMounted } from "vue";
import { useRoute,useRouter } from "vue-router";
import axios from "axios";
import config from "@/assets/json/config.json";
const route = useRoute();
const router = useRouter()
const id = route.query.id;
const url = `${config.localhost}/doctor?id=${id}`
onMounted(() => {
  console.log(id);
  axios({
    url: `${config.url}/api/get_record_by_id`,
    method: "get",
    params: {
      id: id
    }
  }).then(res => {
    message.value = res.data;
  }).catch(err => {
    console.log(err);
    router.back()
  });
});
const message = ref({

});
</script>
<template>
  <div class="content">
    <center><h3>病历信息</h3></center>
    <n-descriptions :bordered="true" header="病历信息" :column="4">
      <n-descriptions-item label="姓名">{{ message.name }}</n-descriptions-item>
      <n-descriptions-item label="年龄">{{ message.age }}</n-descriptions-item>
      <n-descriptions-item label="性别">{{
        message.gender
      }}</n-descriptions-item>
      <n-descriptions-item label="手机号">{{
        message.phone
      }}</n-descriptions-item>
      <n-descriptions-item label="身高(cm)">{{
        message.height
      }}</n-descriptions-item>
      <n-descriptions-item label="体重(kg)">{{
        message.weight
      }}</n-descriptions-item>
      <n-descriptions-item label="病史" :span="2">{{
        message.medical_history
      }}</n-descriptions-item>
      <n-descriptions-item label="推荐科室和医生" :span="4" >
        <p>{{
        message.recommendation
      }}</p></n-descriptions-item>
    </n-descriptions>
    <div class="time">
      {{ message.time }}
    </div>
    <center><n-qr-code :value="url" /></center>
  </div>
</template>
<style scoped>
.time {
  text-align: right;
  margin: 20px;
  font-size: 14px;
  color: #999;
  font-weight: bold;
}
</style>
<script setup>
import { ref } from "vue";
import { showConfirmDialog } from 'vant';
import config from "@/assets/json/config.json";
import axios from "axios";
import { useRouter } from "vue-router";
const router = useRouter();
const loadings = ref(false);
const showPicker = ref(false);
const form = ref({
  name: "",
  age: "",
  gender: "",
  height: "",
  weight: "",
  phone: "",
  medicalHistory: "",
});
const columns = [
  {
    text: "男",
    value: "男",
  },
  {
    text: "女",
    value: "女",
  },
];
const onConfirm = ({ selectedOptions }) => {
  form.value.gender = selectedOptions[0]?.text;
  showPicker.value = false;
};
const onSubmit = () => {
  if(!form.value.name ||!form.value.age ||!form.value.gender ||!form.value.height ||!form.value.weight ||!form.value.phone ||!form.value.medicalHistory){
    showConfirmDialog({
      title: '信息填写不完整',
      message: '请填写完整信息',
    });
    return;
  }
  loadings.value = true;
  axios.defaults.withCredentials = true;
    axios({
      url: `${config.url}/api/submit_user_info`,
      method: "post",
      data: form.value,
      withCredentials: true
    }).then((res) => {
      if (res.status === 200) {
        console.log(res.data.message);
        loadings.value = false;
        router.push("/chat");
      } else {
        showConfirmDialog({
          title: '提交失败',
          message: '信息提交失败，请稍后再试',
        });
        loadings.value = false;
      }
    }).catch((err) => {
      showConfirmDialog({
        title: '提交失败',
        message: err.message,
      });
      loadings.value = false;
    });
};
const onReset = () => showConfirmDialog({
  title: '确认清空信息？',
  message:
    '如果清空信息，则需要重新填写信息，确定要清空吗？',
})
  .then(() => {

      form.value = {
        name: "",
        age: "",
        gender: "",
        height: "",
        weight: "",
        phone: "",
        medicalHistory: "",
      };
  })

</script>
<template>
  <div class="content">
    <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="$router.push('/')"
      title="用户信息表单"
    />
    <div class="form">
      <van-form :colon="true" label-align="center" >
        <van-cell inset >
          <van-field
            v-model="form.name"
            name="姓名"
            label="姓名"
            placeholder="姓名"
            :rules="[{ required: true, message: '请填写姓名' }]"
            :required="true"
          />
          <van-field
            v-model="form.age"
            name="年龄"
            label="年龄"
            placeholder="年龄"
            :rules="[{ required: true, message: '请填写年龄' }]"
          />
          <van-field
            v-model="form.gender"
            is-link
            readonly
            name="picker"
            label="性别"
            placeholder="点击选择性别"
            @click="showPicker = true"
          />
          <van-popup v-model:show="showPicker" position="bottom">
            <van-picker
              :columns="columns"
              @confirm="onConfirm"
              @cancel="showPicker = false"
            />
          </van-popup>
          <van-field
            v-model="form.height"
            name="身高"
            label="身高(cm)"
            placeholder="身高"
            :rules="[{ required: true, message: '请填写身高' }]"
          />
          <van-field
            v-model="form.weight"
            name="体重"
            label="体重(kg)"
            placeholder="体重"
            :rules="[{ required: true, message: '请填写体重' }]"
          />
          <van-field
            v-model="form.phone"
            name="手机号"
            label="手机号"
            placeholder="手机号"
            :rules="[{ required: true, message: '请填写手机号' }]"
            required="true"
          />
          <van-field
            v-model="form.medicalHistory"
            name="病史"
            label="病史"
            placeholder="病史"
            :rules="[{ required: true, message: '请填写病史' }]"
            required="true"
            type="textarea"
            :show-word-limit="true"
            maxlength="500"
            :rows="5"
          />
        </van-cell>
      </van-form>
      <van-button 
      type="primary" 
      :round="true"  
      @click="onReset"
      style="margin-top: 20px;width: 100%;"
        >重置信息</van-button
      >
    </div>
    <van-submit-bar
      :loading="loadings"
      button-text="提交信息"
      tip="信息填写完成？点击提交信息生成个人病历"
      @submit="onSubmit"
    />
  </div>
</template>
<style scoped>
.content {
    max-width: 800px; /* 限制最大宽度，适应手机屏幕 */
  margin: 0 auto; /* 水平居中 */
}
.form {
  background-color: aliceblue;
  padding: 20px;
  height: 90vh;
}
</style>

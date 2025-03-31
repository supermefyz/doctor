<script setup>
import { useUserMessageStore } from "@/stores/UserMessage";
import router from "@/router";
import { ref } from "vue";
import { showConfirmDialog } from 'vant';

const user = useUserMessageStore();
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
  loadings.value = true;
  user.putValue(form.value)
  let timer = setTimeout(() => {
    loadings.value = false;
      router.push("/chat");
    clearTimeout(timer);
  }, 500);
};
const onReset = () => showConfirmDialog({
  title: '确认清空信息？',
  message:
    '如果清空信息，则需要重新填写信息，确定要清空吗？',
})
  .then(() => {
      // on confirm
      user.clearValue();
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
      @click-left="$router.back()"
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
            required="true"
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
            label="身高"
            placeholder="身高"
            :rules="[{ required: true, message: '请填写身高' }]"
          />
          <van-field
            v-model="form.weight"
            name="体重"
            label="体重"
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
      round  
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
.form {
  background-color: aliceblue;
  padding: 20px;
  height: 90vh;
}
</style>

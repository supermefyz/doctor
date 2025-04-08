<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import axios from 'axios'
import config from '@/assets/json/config.json'
import { showSuccessToast, showFailToast } from 'vant'
const router = useRouter()
const username = ref('')
const password = ref('')
const loginIn = () => { 
  console.log(username.value, password.value);
  axios({
    url: `${config.url}/admin/login`,
    method: 'post',
    data: {
      username: username.value,
      password: password.value
    }
  }).then(res => {
    console.log(res);
    if (res.data.status === 200) {
      router.push('/admin/home')
      console.log('登录成功')
      showSuccessToast('登录成功')
    } else {
      console.log('登录失败')
      showFailToast('登录失败')
    }
  }).catch(err => {
    console.log(err)
    showFailToast('登录失败')
  })
}
</script>
<template>
<div class="content">
            <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="$router.push('/')"
      title="管理员登录"
    />
    <div class="login-container">
       <van-form @submit="loginIn">
  <van-cell-group inset>
    <van-field
      v-model="username"
      name="用户名"
      label="用户名"
      autocomplete="username"
      placeholder="用户名"
      :rules="[{ required: true, message: '请填写用户名' }]"
    />
    <van-field
      v-model="password"
      type="password"
      name="密码"
      label="密码"
      placeholder="密码"
      autocomplete="current-password"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
  </van-cell-group>
  <div style="margin: 16px;">
    <van-button round block type="primary" native-type="submit">
      登录
    </van-button>
  </div>
</van-form>
    </div>
</div>
</template>
<style scoped>
@import url('@/assets/css/content.css');
@import url('@/assets/css/login.css');
</style>
<script setup>
import { RouterView } from 'vue-router'
import { NConfigProvider } from 'naive-ui'
// import { onMounted } from 'vue'
// import config from '@/assets/json/config.json'
// // 获取URL参数
// const getUrlParam = (name) => {
//   const query = new URLSearchParams(window.location.search)
//   return query.get(name)
// }

// // 获取用户信息
// const getUserInfo = async (code) => {
//   try {
//     const response = await axios.get(config.wechatAuthApi, {
//       params: { code }
//     })
 
//     // 处理获取到的用户信息
//     console.log('用户信息:', response.data)
//     // 这里可以存储用户信息到Vuex/Pinia/localStorage
//   } catch (error) {
//     console.error('获取用户信息失败:', error)
//     // 处理错误情况，比如重新发起授权
//     router.replace('/')
//   }
// }

// onMounted(() => {
//   const code = getUrlParam('code')
//   const state = getUrlParam('state')

//   if (code) {
//     // 第二步：通过code获取用户信息
//     getUserInfo(code)
//   } else {
//     // 第一步：跳转微信授权
//     const REDIRECT_URI = encodeURIComponent(config.localhost)
//     const authUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.appID}&redirect_uri=${REDIRECT_URI}&appSecret=${config.appSecret}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
//     window.location.href = authUrl
//   }
// })
</script>

<template>
<n-config-provider>
   <RouterView />
 </n-config-provider>  
 </template>

<style scoped>

</style>
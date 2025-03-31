<script setup>
import { RouterView } from 'vue-router'
import { onUnmounted } from 'vue'
import { useUserMessageStore } from '@/stores/UserMessage';
const user=useUserMessageStore()
onUnmounted(() => {// 组件销毁时清除消息
  user.clearMessage()
})
</script>

<template>
  <RouterView />
</template>

<style scoped>

</style>

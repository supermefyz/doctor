<script setup>
</script>
<template>
<div class="content">
          <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
      title="管理员主页"
    />
    <van-tabs v-model:active="active">
  <van-tab v-for="index in 8" :title="'标签 ' + index">
    内容 {{ index }}
  </van-tab>
</van-tabs>
</div>
</template>
<style scoped>
@import url('@/assets/css/content.css');
</style>
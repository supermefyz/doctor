<script setup>
import { NQrCode } from 'naive-ui'
import { ref } from 'vue'
const url=ref('https://baidu.com') 
</script>
<template>
<div class="content">
    <div class="content">
            <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
      title="医生"
    />
    <n-qr-code :value="url" />
    </div>
</div>
</template>
<style scoped>
</style>
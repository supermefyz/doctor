<script setup>
import { RouterView } from 'vue-router'
import { NConfigProvider } from 'naive-ui';
</script>

<template>
    <n-config-provider>
      <RouterView />
    </n-config-provider>
  </template>

<style scoped>

</style>

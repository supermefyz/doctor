import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAdminStore = defineStore('admin', () => {
  // 管理员信息
  const admin = ref({})
  // 是否登录
  // 获取管理员信息
  const getAdminId = computed(() => {
    return admin.value.user_id
  })
  // 清空管理员信息
  const clearAdmin = () => {
    admin.value = {}
  }
  return { admin,getAdminId, clearAdmin }
}, {
  persist: true // 持久化
})
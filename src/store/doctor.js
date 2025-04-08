import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useDoctorStore = defineStore('doctor', () => {
    // 医生信息
    const doctor = ref({})
    // 是否登录
    // 获取医生信息
    const getDoctorId = computed(() => {
        return doctor.value.user_id
    })
    // 获取医生状态
    const doctorStatus = computed(() => {
        return doctor.value.status
    })
    // 清空医生信息
    const clearDoctor = () => {
        doctor.value = {}
    }
    return { doctor,getDoctorId, doctorStatus, clearDoctor }
}, {
    persist: true // 持久化
})
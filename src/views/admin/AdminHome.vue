<script setup>
import { ref,onMounted } from 'vue'
import axios from 'axios'
import config from '@/assets/json/config'
import { showSuccessToast } from 'vant'
const patientCount = ref(0)
const finishPatientCount = ref(0)
const unFinishPatientCount = ref(0)
const doctorCount = ref(0)
const loading = ref(false)
const getPatientCount = () => {
    axios({
        url: `${config.url}/api/get_patient_count`,
        method: "get"
    }).then(res => {
        patientCount.value = res.data.patientCount
        finishPatientCount.value = res.data.finishPatientCount
        unFinishPatientCount.value = res.data.unFinishPatientCount
    }).catch(err => {
        console.log(err)
    })
}

const getDoctorCount = () => {
    axios({
        url: `${config.url}/api/get_doctor_count`,
        method: "get"
    }).then(res => {
        doctorCount.value = res.data.doctorCount
    }).catch(err => {
        console.log(err)
    })
}

onMounted(() => {
    getPatientCount()
    getDoctorCount()
    
})

const fresh = () => {
    loading.value = true
    patientCount.value = 0
    finishPatientCount.value = 0
    unFinishPatientCount.value = 0
    doctorCount.value = 0
    setTimeout(() => {
        getPatientCount()
        getDoctorCount()
        showSuccessToast('刷新成功')
        loading.value = false
    }, 1000)
    
}
</script>
<template>
    <div class="content">
            <van-cell-group title="患者信息">
                <van-cell title="患者数量" :value=" patientCount "></van-cell>
                <van-cell title="完成ai诊断患者数量" :value="finishPatientCount"></van-cell>
                <van-cell title="未完成ai诊断患者数量" :value="unFinishPatientCount"></van-cell>
            </van-cell-group>
            <van-cell-group title="医生信息">
                <van-cell title="医生数量" :value="doctorCount"></van-cell>
            </van-cell-group>
            <van-cell-group title="系统信息">
                <van-cell title="系统版本" :value="config.version"></van-cell>
                <van-cell title="系统地址" :value="config.localhost"></van-cell>
                <van-cell title="后端地址" :value="config.url"></van-cell>
            </van-cell-group>
            <van-button type="primary" plain hairline :loading="loading" @click="fresh" class="refresh-btn" loading-text="刷新中...">刷新</van-button>
    </div>
</template>
<style scoped>
@import url('@/assets/css/content.css');
.refresh-btn {
    margin: 20px;
    float: right;
}
  </style>
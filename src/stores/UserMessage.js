import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserMessageStore = defineStore('userMessage', () => {
  const user = ref({
    name: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    phone: '',
    medicalHistory:''
  })
  const putValue = (value) => {
    user.value = {
      name: value.name,
      age: value.age,
      gender: value.gender,
      height: value.height,
      weight: value.weight,
      phone: value.phone,
      medicalHistory: value.medicalHistory
    }
  }
  const clearValue = () => {
    user.value = {
      name: '',
      age: '',
      gender: '',
      height: '',
      weight: '',
      phone: '',
      medicalHistory: ''
    }
  }
  return { user , putValue, clearValue }
})

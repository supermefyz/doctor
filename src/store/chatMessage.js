import { ref , computed } from 'vue'
import { defineStore } from 'pinia'

export const useChatMessageStore = defineStore('chatMessage', () => {
    /**
     * 消息列表
     * @type {ref<Array<Object>>}
     */
    const messages = ref([])
    const isEmpty= computed(() => {
        return messages.value.length === 0
    })
    const getMessageList = computed(() => {
        return messages.value
    })
    const addMessage = (message) => {
        messages.value.push(message)
    }
    const clearMessage = () => {
        messages.value = []
    }
    return { isEmpty, addMessage, clearMessage, getMessageList, messages }
}, {
    persist: true// 持久化
})
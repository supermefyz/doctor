import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useChatMessageStore = defineStore('chatMessage', () => {
    /**
     * 消息列表
     * @type {ref<Array<Object>>}
     */
    const messages = ref([])
    return {messages}
}, {
    persist: true// 持久化
})
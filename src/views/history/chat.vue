<script setup>
import { ref,onMounted } from 'vue'
import { NDataTable, NModal, NList, NListItem } from 'naive-ui'
import getList from '@/assets/js/getList'
import getMessage from '@/assets/js/getMessage'
const props = defineProps({
  userId: {
    type: Number,
    required: true
  }
})
const data = ref([])
onMounted(async () => {
  const rawData =await  getList(props.userId, 1)
  data.value = rawData.data
  total.value = rawData.total
})
// 表格列配置[3,4](@ref)
const columns = ref([
  { 
    title: '记录ID', 
    key: 'id',
    sorter: (a, b) => a.id - b.id,
    defaultSortOrder: 'descend'
  },
  {
    title: '时间',
    key: 'time',

  },
])

// 弹窗控制逻辑[6,7](@ref)
const showDetail = ref(false)
const selectedChat = ref({
  history: []
})
const currentPage = ref(1)
const total = ref(0)

// 修改后
const handleRowClick = async (row) => {
  try {
    let response = JSON.parse(JSON.stringify(await getMessage(row.id))).chat_history
    response=JSON.parse(response)
    console.log('API响应数据:', response) // 清除响应式影响
    
    // 添加数据校验
    if (!Array.isArray(response)) {
      throw new Error('返回数据格式异常')
    }
    
    selectedChat.value = { 
      history: response
    }
    showDetail.value = true
    console.log('更新后的数据:', selectedChat.value)
  } catch (error) {
    console.error('错误详情:', error)
  }
}

const rowProps = (row) => ({
  style: { cursor: 'pointer' },
  onClick: () => handleRowClick(row)
})
const handlePageChange = (page) => {
  currentPage.value = page  
  getList(props.userId, page).then(res => {
    data.value = res.data
    total.value = res.total
  })
}

</script>

<template>
  <n-data-table
    :columns="columns"
    :data="data"
    :row-props="rowProps"
    :pagination="{
      page: currentPage,
      pageSize: 10,
      itemCount: total,
    }"
     @update:page="handlePageChange"
    remote
  />

  <n-modal 
    v-model:show="showDetail"
    preset="card"
    :title="`用户 #${props.userId} 问诊记录`"
    style="width: 600px; max-height: 80vh;overflow-y: auto;"
  >
    <n-list v-if="selectedChat" bordered>
      <n-list-item v-for="(msg, index) in selectedChat.history" :key="index">
        <div :class="['message-bubble', { user: msg.isUser }]">
          <div class="message-header">
            <span class="role">{{ msg.isUser ? '患者' : 'AI医生' }}</span>
          </div>
          <div class="content">{{ msg.content }}</div>
        </div>
      </n-list-item>
    </n-list>
  </n-modal>
</template>

<style scoped>
.message-bubble {
  padding: 12px;
  border-radius: 8px;
  margin: 8px 0;
  word-break: break-word;
}

.message-bubble.user {
  background-color: #f0f7ff;
  border: 1px solid #cce0ff;
}

.message-bubble:not(.user) {
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
}

.message-header {
  margin-bottom: 6px;
  font-size: 0.9em;
  color: #666;
}

.role {
  font-weight: 600;
}
</style>
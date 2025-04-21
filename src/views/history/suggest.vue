<script setup>
import { ref ,h,onMounted} from 'vue'
import { NDataTable, NModal, NDescriptions, NDescriptionsItem } from 'naive-ui'
import getList from '@/assets/js/getList'
import getMessage from '@/assets/js/getMessage'
const props = defineProps({
  userId: {
    type: Number,
    required: true
  }
})
onMounted(async () => {
  const rawData =await  getList(props.userId, 1)
  data.value = rawData.data
    total.value = rawData.total
})
// 历史建议数据结构

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
const data = ref([])
// 弹窗控制
const showDetail = ref(false)
const selectedProposal = ref(null)
const currentPage = ref(1)
const total = ref(0)
const handleRowClick = async (row) => {
  try {
    let response = JSON.parse(JSON.stringify(await getMessage(row.id)))
    response = response.suggestion
    
    selectedProposal.value = { 
      suggestion: response,
      id: row.id,
    }
    showDetail.value = true
  } catch (error) {
    console.error('错误详情:', error)
  }
}

const rowProps = (row) => ({
  style: { cursor: 'pointer' },
  onClick: () => handleRowClick(row)
})
const pagination = ref({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: 10,
  onChange: (page) => {
    pagination.value.page = page
  },
  onUpdatePageSize: (pageSize) => {
    pagination.value.pageSize = pageSize
    pagination.value.page = 1
  }
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
    :bordered="false"
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
    :title="selectedProposal?.title"
    style="width: 800px; max-height: 90vh;overflow-y: auto;"
  >
    <n-descriptions
      v-if="selectedProposal"
      bordered
      label-placement="left"
      :column="1"
      content-style="padding: 12px 16px;"
    >
      <n-descriptions-item label="建议ID">
        {{ selectedProposal.id }}
      </n-descriptions-item>
      <n-descriptions-item label="建议内容">
       {{ selectedProposal.suggestion }}
      </n-descriptions-item>
    </n-descriptions>
  </n-modal>
</template>

<style scoped>
.content-block {
  padding: 12px;
  background: #f8f8f8;
  border-radius: 4px;
  line-height: 1.6;
}

.result-block {
  padding: 12px;
  background: #f0f7ff;
  border-left: 4px solid #2d8cf0;
  border-radius: 4px;
  font-weight: 500;
  color: #2d8cf0;
}

.n-descriptions-item-label {
  min-width: 100px;
  font-weight: bold;
}
</style>
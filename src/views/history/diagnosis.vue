<script setup>
import { ref ,onMounted} from 'vue'
import { NDataTable, NModal, NDescriptions, NDescriptionsItem, NTag } from 'naive-ui'
import getList from '@/assets/js/getList'
import getMessage from '@/assets/js/getMessage'
const props =defineProps({
  userId: {
    type: Number,
    required: true
  }
})
onMounted(async () => {
  const rawData =await getList(props.userId, 1)
  data.value = rawData.data
  total.value = rawData.total
})
// 诊断记录数据结构
const data = ref([])
const currentPage = ref(1)
const total = ref(0)
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

// 弹窗控制相关
const showDetail = ref(false)
const selectedRecord = ref(null)

const handleRowClick =async (row) => {
  try {
    let response = JSON.parse(JSON.stringify(await getMessage(row.id)))
    response = response.diagnosis
    selectedRecord.value = { 
      result: response,
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
    :title="`${selectedRecord?.patient} 的诊断记录`"
    style="width: 800px; max-height: 90vh;overflow-y: auto;"
  >
    <n-descriptions 
      v-if="selectedRecord"
      label-placement="left"
      bordered
      :column="1"
      content-style="white-space: pre-wrap;"
    >
      <n-descriptions-item label="病历id">
        {{ selectedRecord.id }}
      </n-descriptions-item>
      <n-descriptions-item label="诊断结果">
        {{ selectedRecord.result }}
      </n-descriptions-item>
    </n-descriptions>
  </n-modal>
</template>

<style scoped>
.diagnosis-result {
  color: #2d8cf0;
  font-weight: 500;
  font-size: 16px;
}

.prescription {
  background-color: #f8f8f8;
  padding: 12px;
  border-radius: 4px;
  line-height: 1.8;
}

.n-descriptions-item-content {
  padding: 12px 16px;
}
</style>
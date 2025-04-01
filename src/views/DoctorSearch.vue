<script setup>
import { ref, onMounted } from "vue";
import { showToast } from "vant";
import { NDataTable, NPagination } from "naive-ui";
import { useRouter } from "vue-router";
import config from "@/assets/json/config.json";
import axios from "axios";

const router = useRouter();

// 数据加载函数，添加search参数
const loadData = (current_page, keyword = '') => {
  axios({
    url: `${config.url}/api/get_records`,
    method: "get",
    params: {
      page: current_page,
      search: keyword // 确保后端支持搜索参数
    }
  })
    .then((res) => {
      rawData.value = res.data.records; // 直接使用后端返回的当前页数据
      pagination.value.page = res.data.current_page;
      pagination.value.totalItemCount = res.data.total; // 使用后端返回的总数
    })
    .catch((err) => {
      console.log(err);
    });
};

onMounted(() => {
  loadData(1);
});

const rawData = ref([]); // 存储当前页数据

const pagination = ref({
  page: 1,
  pageSize: 10,
  totalItemCount: 0,
});

// 搜索功能改为触发后端请求
const searchValue = ref("");
const onSearch = () => {
  loadData(1, searchValue.value.trim()); // 搜索时重置到第一页
  showToast(searchValue.value ? `搜索: ${searchValue.value}` : "已重置");
};

// 分页变化处理
const handlePageChange = (page) => {
  loadData(page, searchValue.value.trim()); // 保持当前搜索条件
};

// 行点击事件保持不变
const onClick = (rowData) => {
  router.push({ path: "/doctor", query: { id: rowData.id } });
};
const goDetail = (row) => ({
  onClick: () => onClick(row),
});
</script>

<template>
  <div class="container">
    <van-search
      v-model="searchValue"
      shape="round"
      show-action
      clearable
      placeholder="请输入病人姓名或ID"
      @search="onSearch"
      @cancel="searchValue = ''"
    />

    <div class="table-pagination-wrapper">
      <div class="table-wrapper">
        <!-- 直接使用后端返回的当前页数据 -->
        <n-data-table
          :columns="[
            { title: 'ID', key: 'id', width: 80 },
            { title: '姓名', key: 'name', width: 120 },
            { title: '时间', key: 'time' },
          ]"
          :data="rawData"
          :row-key="(row) => row.id"
          striped
          :row-props="goDetail"
        />
      </div>

      <div class="pagination-footer">
        <!-- 分页总数使用后端返回的总数 -->
        <n-pagination
          v-model:page="pagination.page"
          :item-count="pagination.totalItemCount"
          :page-size="pagination.pageSize"
          @update:page="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>
<style scoped>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 12px;
}

.table-pagination-wrapper {
  flex: 1;
  position: relative;
  margin-top: 16px;
}

.table-wrapper {
  height: calc(100% - 60px);
  overflow: auto;
  margin-bottom: 8px;
}

.pagination-footer {
  position: absolute;
  bottom: 15px;
  left: 0;
  right: 0;
  padding: 12px 0;
  background: white;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
}

/* 分页样式优化 */
:deep(.n-pagination) {
  justify-content: center !important;
  padding: 0 !important;
}

:deep(.n-pagination-item) {
  min-width: 28px !important;
  height: 28px !important;
  margin: 0 2px !important;
  font-size: 12px;
}

:deep(.n-pagination-item--active) {
  font-weight: normal;
}

:deep(.n-pagination-prefix) {
  display: none;
}
</style>

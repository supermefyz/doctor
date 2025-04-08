<script setup>
import { ref, onMounted } from "vue";
import { NDataTable, NPagination } from "naive-ui";
import { useRouter } from "vue-router";
import config from "@/assets/json/config.json";
import axios from "axios";
import { useDoctorStore } from "@/store/doctor";
import { showFailToast } from "vant";
const doctorStore = useDoctorStore();
const router = useRouter();

// 数据加载函数，添加search参数
const loadData = (current_page, id = null, name = null) => {
  axios({
    url: `${config.url}/api/get_records`,
    method: "get",
    params: {
      page: current_page,
      id: id,
      name: name
    }
  })
    .then((res) => {
      rawData.value = res.data.records; // 直接使用后端返回的当前页数据
      pagination.value.page = res.data.current_page;
      pagination.value.totalItemCount = res.data.total; // 使用后端返回的总数
    })
    .catch((err) => {
      console.log(err);
    })
};

 if (doctorStore.getDoctorId) {
    // 已登录，加载数据
    loadData(1);
  } else {
    console.log("未登录");
    // 未登录，跳转到登录页
    router.push("/doctorLogin");
    
  }

const rawData = ref([]); // 存储当前页数据

const pagination = ref({
  page: 1,
  pageSize: 10,
  totalItemCount: 0,
});

// 搜索功能改为触发后端请求
const searchValue = ref("");
const onSearch = (page) => {
  const keyword = searchValue.value.trim();
  if (keyword) {
    if (/^\d+$/.test(keyword)) {
      loadData(page, keyword);
    } else if (/^[a-zA-Z\u4e00-\u9fa5]+$/.test(keyword)) {
      loadData(page, null, keyword);
    }  
    return
  } else {
      loadData(page);
  }
};

// 行点击事件保持不变
const onClick = (rowData) => {
  if (doctorStore.doctorStatus) {
    router.push({ path: "/doctor", query: { id: rowData.id } });
  } else {
    showFailToast("您没有权限查看病历");
  }
};
const goDetail = (row) => ({
  onClick: () => onClick(row),
});
const cancelSearch = () => {
  searchValue.value = "";
  loadData(1);
};
</script>

<template>
  <div class="container">
    <van-search
      v-model="searchValue"
      shape="round"
      show-action
      placeholder="请输入病人姓名或ID"
      @search="onSearch(1)"
      @update:model-value="onSearch(1)"
      @cancel="cancelSearch"
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
          @update:page="page => onSearch(page)"
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

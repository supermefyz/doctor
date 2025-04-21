<script setup>
import { ref, onMounted } from "vue";
import { NDataTable, NPagination } from "naive-ui";
import config from "@/assets/json/config.json";
import axios from "axios";

const show = ref(false);
const message = ref({})
// 数据加载函数，添加search参数
const loadData = (current_page, id = null, name = null) => {
  axios({
    url: `${config.url}/api/get_records`,
    method: "get",
    params: {
      page: current_page,
      id: id,
      name: name,
    },
  })
    .then((res) => {
      console.log(res.data);

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
const onSearch = (page) => {
  const keyword = searchValue.value.trim();
  if (keyword) {
    if (/^\d+$/.test(keyword)) {
      loadData(page, keyword);
    } else if (/^[a-zA-Z\u4e00-\u9fa5]+$/.test(keyword)) {
      loadData(page, null, keyword);
    }
    return;
  } else {
    loadData(page);
  }
};

// 行点击事件保持不变
const onClick = (rowData) => {
    //   router.push({ path: "/doctor", query: { id: rowData.id } });
    show.value = true;
    console.log(rowData);
    axios({
        url: `${config.url}/api/get_record_by_id`,
        method: "get",
        params: {
          id: rowData.id
        }
    }).then(res => { 
        console.log(res);
        if(res.status === 200){
            message.value = res.data;
        }else{
            message.value = {};
        }
    }).catch(err => {
        console.log(err);
    });
    message.value = rowData;
};

const goDetail = (row) => ({
  onClick: () => onClick(row),
});
const cancelSearch = () => {
  searchValue.value = "";
  loadData(1);
};


const deleteRecord = (id) => {
  axios({
    url: `${config.url}/api/delete_record`,
    method: "delete",
    params: {
      id: id,
    },
  })
   .then((res) => {
      console.log(res);
      loadData(1);
    })
   .catch((err) => {
      console.log(err);
    });
};

</script>

<template>
  <div class="content">
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
            @update:page="(page) => onSearch(page)"
          />
        </div>
      </div>
    </div>
  </div>
  <van-popup v-model:show="show" :style="{ padding: '10px' }">
    <van-cell>
        <van-field v-model="message.id" label="病人id" readonly></van-field>
        <van-field v-model="message.name" label="病人姓名" readonly></van-field>
        <van-field v-model="message.age" label="年龄" readonly></van-field>
        <van-field v-model="message.gender" label="性别" readonly></van-field>
        <van-field v-model="message.phone" label="联系方式" readonly></van-field>
        <van-field v-model="message.
medical_history" label="病史" readonly></van-field>
        <van-field v-model="message.diagnosis" label="诊断" type="textarea" readonly ></van-field>
        <van-field v-model="message.suggestion" label="建议" type="textarea" readonly></van-field>
    </van-cell>
    <van-cell>
        <van-button type="primary" @click="show = false;$router.push({ path: '/history', query: { id: message.id , name: message.name } })" style="margin-top: 10px">历史记录</van-button>
        <van-button type="primary" @click="show = false" style="margin-top: 10px;margin-left: 10px;">取消</van-button>
        <van-button type="success" @click="show = false;deleteRecord(message.id)" style="margin-left: 10px;margin-top: 10px">删除</van-button>
    </van-cell>
  </van-popup>
</template>
<style scoped>
.pagination-footer {
  position: absolute;
  bottom: 45px;
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

<script setup>
import { ref,onMounted } from 'vue'
import axios from 'axios'
import config from '@/assets/json/config.json'
import { NPagination } from 'naive-ui'
import { showSuccessToast, showFailToast } from 'vant'
const pagination = ref({
  page: 1,
  totalItemCount: 0,
});
const data = ref([])
 const activeName = ref('1');
 const value = ref('')
const show = ref(false)
const doctor = ref({
    id: '',
    name: '',
    department: '',
    phone: '',
    password: '',
    status: false,
 })

 const onSearch = (page) => {
     loadData(page)
 }
 const reset = () => {
     value.value = ''
     activeName.value = ''
     loadData()
 }
const loadData = (page) => {
    axios({
        method: 'get',
        url: `${config.url}/api/doctors`,
        params: {
            page: page || 1,
            search: value.value,
        },
    }).then(res => {
        console.log(res.data)
        data.value = res.data.data
         pagination.value = {
      page: res.data.pagination.current_page,
      totalItemCount: res.data.pagination.total_items, // 使用总条目数
      pageSize: 10
    }
    }).catch(err => {
        console.log(err)
    })
}

const editDoctor = (item) => {
    show.value = true
    doctor.value = {
        id: item.id,
        name: item.name,
        department: item.department,
        phone: item.phone,
        status: item.status,
    }
}
const deleteDoctor = (item) => {
    axios({
        url: `${config.url}/api/doctors`,
        method: 'delete',
        params: {
            doctor_id: item,
        }
    }).then((res) => {
        if (res.status === 200) {
            showSuccessToast('删除成功')
            loadData()
        } else {
            showFailToast('删除失败')
        }
  }).catch(err => {
    console.log(err)
  }).finally(() => {
      show.value = false
    activeName.value = ''
  })
}

const changePage = (page) => {
    activeName.value = ''
    onSearch(page)
}
const saveDoctor = () => {
    axios({
        url: `${config.url}/api/doctors`,
        method: 'put',
        data: doctor.value
    }).then((res) => {
        if (res.status === 200) {
            showSuccessToast('保存成功')
            show.value = false
            loadData()
        } else if (res.status === 201) {
            showSuccessToast('新增成功')
            show.value = false
            loadData()
        } else {
            showFailToast('保存失败')
        }
    }).catch(err => {
        console.log(err)
    }).finally(() => {
        doctor.value = {
            id: '',
            name: '',
            department: '',
            phone: '',
            password: '',
            status: false,
        }
    })
}

onMounted(() => {
    loadData()
    
})
</script>
<template>
    <div class="content">
        <van-search
  v-model="value"
  show-action
  placeholder="请输入医生姓名或科室"
  @search="onSearch"
>
  <template #action>
    <span @click="onSearch">搜索</span>
  </template>
  <template #right-icon>
    <span  @click="reset">重置</span>
  </template>
</van-search>
<div class="pagination-footer">
        <n-pagination
                  v-model:page="pagination.page"
                  :item-count="pagination.totalItemCount"
                  :page-slot="8"
                  :page-size="10"
                  @update:page="page => changePage(page)"
                />
                <van-popup v-model:show="show" :style="{ padding: '10px' }">
                        <van-cell>
                            <van-field v-model="doctor.id" label="医生id" readonly></van-field>
                            <van-field v-model="doctor.name" label="医生姓名"></van-field>
                            <van-field v-model="doctor.department" label="科室"></van-field>
                            <van-field v-model="doctor.phone" label="联系方式"></van-field>
                            <van-field v-model="doctor.password" label="密码"></van-field>
                        </van-cell>
                        <van-cell title="是否有权限">
                            <template #right-icon>
                                <van-switch v-model="doctor.status">
                                </van-switch>
                            </template>
                            </van-cell>   
                        <van-button type="primary" @click="show = false;doctor={id:'',name:'',department:'',phone:'',password:''}" style="margin-top: 10px">取消</van-button>
                        <van-button type="success" @click="show=false;saveDoctor()" style="margin-left: 10px;margin-top: 10px">保存</van-button>
                </van-popup>
    </div>
<main class="main">
    <van-cell>
        <van-button type="primary" @click="show=true" size="small" :icon="'add-o'">新增医生</van-button>
    </van-cell>
    <van-collapse v-model="activeName" accordion>
      <van-collapse-item v-for ="(item,index) in data " :key="index" :title="item.name"  :name="index" :label="item.department" :value="item.phone||'null'">
        <van-cell-group>
            <van-cell title="操作"> 
                <van-button type="primary" @click="editDoctor(item)" size="small">编辑</van-button>
                <span style="margin-left: 10px"/>
                <van-button type="danger" @click="deleteDoctor(item.id)" size="small">删除</van-button>
            </van-cell>
        </van-cell-group>
      </van-collapse-item>
    </van-collapse>
    
</main>
    </div>
</template>
<style scoped>
.content {
        max-width: 800px; /* 限制最大宽度，适应手机屏幕 */
  margin: 0 auto; /* 水平居中 */
   height: auto;
  background: #f5f5f5;
}
.pagination-footer {
  padding: 12px 0;
  background: white;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
  margin-top:20px;
  text-align:center;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-items: center;
}
.main {
    height: 125vh;
}
  </style>
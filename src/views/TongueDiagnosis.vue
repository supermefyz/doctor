<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import config from '@/assets/json/config'
import { showSuccessToast, showFailToast } from 'vant'
const themeColor = 'linear-gradient(135deg, #FF7C5F, #FF2C53)';
const route = useRoute()
const file = ref([])
const id = route.query.id
const showResult = ref(false) // 控制显示上传界面还是结果界面
const resultText = ref('')    // 存储流式结果
const isLoading = ref(false)  // 加载状态

// 上传处理
const afterRead = (file) => {
    const formData = new FormData()
    isLoading.value = true
    formData.append('file', file.file)
    formData.append('id', id)
    showResult.value = true
    resultText.value = '上传成功，AI分析中...'
    axios({
      url: config.url + '/predict',
      data: formData, 
      method: 'post',
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(res => {
        showSuccessToast('上传成功')
      console.log(res.data);
      let temp = res.data.diagnosis.split('**')
        temp=temp.join('').split('-')
        resultText.value=temp.join('')
    }). catch (err=> {
      console.error(err)
      showFailToast('上传失败')
      resultText.value = err.response?.data?.message || '分析失败，请检查网络后重试'
      }).finally(() => {
        isLoading.value = false
      })

}

// 返回重新上传
const backToUpload = () => {
  showResult.value = false
  resultText.value = ''
  file.value = []
}
</script>

<template>
  <div class="container">
    <!-- 上传界面 -->
    <div v-if="!showResult" class="upload-container">
      <div class="header">
        <van-icon name="smile-comment-o" size="36px" :color="themeColor" />
        <h2 class="title">舌诊健康分析</h2>
        <p class="subtitle">上传舌苔照片，获取专业中医健康建议</p>
      </div>

      <div class="upload-area">
         <van-uploader 
      v-model="file" 
      :max-count="1"
      preview-size="90%"
      :deletable="true"
      class="centered-uploader"
    >
          <template #default>
            <div class="upload-card">
              <van-icon name="photograph" size="48px" color="#999" />
              <p class="tip-text">点击上传舌苔照片</p>
              <p class="format-tip">支持 JPG/PNG 格式</p>
            </div>
          </template>
        </van-uploader>
      </div>

      <!-- 优化后的上传按钮 -->
      <div class="button-container">
        <van-button 
          round
          type="primary"
          :color="themeColor"
          class="submit-btn"
          @click="afterRead(file[0])"
          :disabled="file.length === 0"
        >
          <van-icon name="column" size="20" />
          <span class="btn-text">开始智能诊断</span>
        </van-button>
      </div>

      <div class="tips">
        <van-tag type="primary">拍摄提示</van-tag>
        <p>1. 请自然伸出舌头，避免用力</p>
        <p>2. 保持光线充足，避免阴影</p>
        <p>3. 建议使用后置摄像头拍摄</p>
      </div>
    </div>

    <!-- 结果界面 -->
    <div v-else class="result-container">
      <van-nav-bar
        title="诊断结果"
        left-text="返回"
        left-arrow
        @click-left="backToUpload"
      />

      <div class="result-content">
        <div v-if="isLoading" class="loading">
          <van-loading type="spinner" size="24px" />
          <span>AI分析中...</span>
        </div>

        <div class="result-text">
          <template v-for="(line, index) in resultText.split('\n')" :key="index">
            <p v-if="line.trim()" class="result-line">{{ line }}</p>
          </template>
        </div>

        <div v-if="!isLoading" class="action-buttons">
          <van-button 
            round 
            type="primary" 
            :color="themeColor"
            @click="backToUpload"
          >
            <van-icon name="replay" />
            重新上传
          </van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 新增结果页样式 */
.result-container {
  padding: 20px;
  min-height: 100vh;
  background: #fff;
}

.result-content {
  margin-top: 20px;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: #666;
}

.loading span {
  margin-left: 10px;
}

.result-text {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  min-height: 200px;
  line-height: 1.6;
}

.result-line {
  margin: 8px 0;
  animation: fadeIn 0.5s ease-in;
  overflow-y: auto;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.action-buttons {
  margin-top: 30px;
  text-align: center;
}

/* 调整原有上传页样式 */
.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  margin:auto;
}
.upload-container {
  padding: 24px;
  min-height: 100vh;
  background: #f8f9fa;
}

.header {
  text-align: center;
  margin-bottom: 36px;
}

.title {
  font-size: 24px;
  color: #1a1a1a;
  margin: 12px 0;
  font-weight: 600;
  letter-spacing: 1px;
}

.subtitle {
  color: #666;
  font-size: 14px;
  margin: 0;
}
.upload-area {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin:auto;
  padding: 24px;
}

/* 上传组件容器 */
:deep(.centered-uploader) {
  width: 100%;
  max-width: 600px; /* 可根据需要调整最大宽度 */
  display: flex;
  justify-content: center;
}

/* 图片预览样式 */
:deep(.van-uploader__preview) {
  margin: 0 auto; /* 预览图居中 */
}

/* 移动端适配 */
@media (max-width: 768px) {
  .upload-area {
    padding: 16px;
  }
  
  :deep(.centered-uploader) {
    max-width: 100%;
  }
}
.upload-area {
  background: #fff;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  margin-bottom: 24px;
}

.upload-card {
  padding: 10px 0;
  border: 2px dashed #eee;
  border-radius: 12px;
  transition: all 0.3s;
  text-align: center; /* 内容居中 */
}

.upload-card:hover {
  border-color: #FF7C5F;
  background: #fff6f5;
}

.tip-text {
  color: #333;
  font-size: 16px;
  margin: 12px 0 4px;
}

.format-tip {
  color: #999;
  font-size: 12px;
  margin: 0;
}

.submit-btn {
  margin: 24px 0;
  font-size: 16px;
  height: 48px;
  box-shadow: 0 4px 12px rgba(255,60,83,0.2);
}

.submit-btn i {
  margin-right: 8px;
}

.tips {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  color: #666;
  font-size: 13px;
}

.tips p {
  margin: 8px 0;
}

:deep(.van-uploader__preview-image) {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

:deep(.van-uploader__upload) {
  background: transparent;
  border: none;
  margin: 0;
}
.button-container {
  margin: 32px 0;
  display: flex;
  justify-content: center;
}

.submit-btn {
  width: 280px;
  height: 56px;
  font-size: 18px;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(255, 60, 83, 0.3);
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(255, 60, 83, 0.4);
}

.submit-btn:active {
  transform: translateY(0);
}

.btn-text {
  margin-left: 8px;
  font-weight: 500;
}

.submit-btn:disabled {
  opacity: 0.7;
  transform: none;
  box-shadow: none;
  cursor: not-allowed;
}

.upload-container {
  padding: 24px;
  min-height: 100vh;
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
}

.upload-area {
  flex: 1;
  margin-bottom: 24px;
}
</style>
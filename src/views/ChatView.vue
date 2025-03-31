<script setup>
import { ref,onMounted } from 'vue'
import config from '@/assets/json/config.json'
import axios from 'axios'

// 聊天消息数组
const chatMessages = ref([]);
// 用户输入的消息
const inputMessage = ref('');
const isLoading = ref(false);
const userAvatar = new URL('@/assets/img/User.png', import.meta.url).href;
const doctorAvatar = new URL('@/assets/img/Doctor.png', import.meta.url).href;
onMounted(() => {
  // 加载聊天记录
  chatMessages.value.push({
            isUser: false,
            content: "我是你的AI医生，有什么可以帮助你吗？"
        });
});
const sendMessage = async () => {
    if (inputMessage.value.trim()) {
        // 添加用户消息到聊天记录
        chatMessages.value.push({
            isUser: true,
            content: inputMessage.value
        });
        inputMessage.value = '';

        try {
            isLoading.value = true; // 显示加载指示器
            // 调用后端接口获取 AI 回复
            const response = await axios.post(`${config.url}/api/chat`, {
                message: inputMessage.value
            });

            isLoading.value = false; // 隐藏加载指示器

            if (response.data.choices && response.data.choices.length > 0) {
                // 添加 AI 回复到聊天记录
                const aiMessage = {
                    isUser: false,
                    content: response.data.choices[0].message.content
                };
                chatMessages.value.push(aiMessage);
            } else {
                throw new Error('无效的AI响应');
            }
        } catch (error) {
            isLoading.value = false; // 隐藏加载指示器
            console.error('发生错误:', error);
        }
    }
};
</script>
<template>
  <div class="chat-container">
    <!-- 导航栏 -->
    <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
      title="AIChat"
    />
    <!-- 聊天记录展示区域 -->
    <div class="chat-history">
      <div v-for="(message, index) in chatMessages" :key="index" class="chat-message">
        <div :class="[message.isUser ? 'user-message' : 'ai-message']">
          <img
            :src="message.isUser ? userAvatar : doctorAvatar"
            alt="Avatar"
            class="avatar"
          />
          <div class="message-bubble">
            <p class="message-content">{{ message.content }}</p>
        </div>
        </div>
      </div>
    </div>
    <!-- 输入框和发送按钮 -->
    <div class="input-area">
      <van-field
        v-model="inputMessage"
        placeholder="请输入你要发送的消息"
        @keydown.enter="sendMessage"
        style="width: 90%;"
      />
      <van-button type="primary" @click="sendMessage" style="min-width: 1rem;white-space: nowrap;">发送</van-button>
    </div>
  </div>
</template>


<style scoped>
/* 整体容器样式 */
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  max-width: 800px; /* 限制最大宽度，适应手机屏幕 */
  margin: 0 auto; /* 水平居中 */
  background-color: #f5f5f5;
}

/* 聊天记录区域样式 */
.chat-history {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  -webkit-overflow-scrolling: touch; /* 优化滚动体验 */
}

/* 单条聊天消息样式 */
.chat-message {
  display: flex;
  margin-bottom: 10px;
  align-items: flex-start;
}

/* 用户消息样式 */
.user-message {
  justify-content: flex-end;
  flex-direction: row-reverse;
}

/* AI 消息样式 */
.ai-message {
  justify-content: flex-start;
}

/* 头像样式 */
.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 0 5px;
}

/* 消息气泡样式 */
.message-bubble {
  padding: 8px 12px;
  border-radius: 10px;
  max-width: 70%;
  position: relative;
  display: inline-block;
  word-wrap: break-word; /* 允许长单词换行 */
}

/* 用户消息气泡样式 */
.user-message .message-bubble {
  background-color: #DCF8C6;
  margin-left: 5px;
}

/* AI 消息气泡样式 */
.ai-message .message-bubble {
  background-color: #E5E5EA;
  margin-right: 5px;
}

/* 消息内容样式 */
.message-content {
  margin: 0;
}

/* 消息时间戳样式 */
.message-timestamp {
  font-size: 10px;
  color: #888;
  position: absolute;
  bottom: 2px;
  right: 5px;
}

/* 输入区域样式 */
.input-area {
  position: sticky;
  bottom: 0;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 10px;
  border-top: 1px solid #eee;
}

/* 输入框样式 */
.input-area van-field {
  flex: 1;
  margin-right: 10px;
}

/* 发送按钮样式 */
.input-area van-button {
  min-width: 60px;
}
</style>    
<script setup>
import { ref, onMounted, watch, nextTick } from "vue";
import config from "@/assets/json/config.json";
import axios from "axios";
import { showFailToast } from "vant";
import { useRouter } from "vue-router";
const router = useRouter();
// 聊天消息数组
const chatMessages = ref([]);
// 用户输入的消息
const inputMessage = ref("");
const isLoading = ref(false);
const scrollContainer = ref(null); // 容器引用
const userAvatar = new URL("@/assets/img/User.png", import.meta.url).href;
const doctorAvatar = new URL("@/assets/img/Doctor.png", import.meta.url).href;
onMounted(() => {
  // 加载聊天记录
  chatMessages.value.push({
    isUser: false,
    content: "我是你的AI医生，有什么可以帮助你吗？",
  });
});
const sendMessage = async () => {
  isLoading.value = true; // 显示加载指示器
  if (inputMessage.value.trim()) {
    // 添加用户消息到聊天记录
    chatMessages.value.push({
      isUser: true,
      content: inputMessage.value,
    });
    let temp = inputMessage.value;
    inputMessage.value = "";
    console.log(temp);
    axios.defaults.withCredentials = true;
    axios({
      url: `${config.url}/api/chat`,
      method: "post",
      withCredentials: true,
      data: {
        message: temp
      },
    }).then(res => {
      console.log(res);
      isLoading.value = false; // 隐藏加载指示器
      if (res.data.choices && res.data.choices.length > 0) {
        // 添加 AI 回复到聊天记录
        const aiMessage = {
          isUser: false,
          content: res.data.choices[0].message.content,
        };
        if (res.data.choices[0].isOver) {
          console.log(res.data.choices[0].id);
          router.push({path:'/patient',query:{id:res.data.choices[0].id}})
        } else {
          chatMessages.value.push(aiMessage);
        }
      } else {
        console.error(res.error);
      }
    }).catch(error => {
      isLoading.value = false; // 隐藏加载指示器
      console.error("发生错误:", error.message);
      showFailToast(error.message);
      const errorMessage = {
        isUser: false,
        content: "系统或网络错误，请稍后再试。",
      };
      chatMessages.value.push(errorMessage);
    });
  }
};
// 滚动到底部的函数
const scrollToBottom = () => {
  if (!scrollContainer.value) return;
  scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
};

// 监听 messages 变化（深度监听）
watch(
  () => [...chatMessages.value], // 确保数组变化被捕获
  () => nextTick(scrollToBottom),
  { deep: true }
);

// 初始化时滚动到底部
onMounted(scrollToBottom);
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
    <div class="chat-history" ref="scrollContainer">
      <div
        v-for="(message, index) in chatMessages"
        :key="index"
        class="chat-message"
      >
        <div class="ai-message" v-if="!message.isUser">
          <img :src="doctorAvatar" alt="Avatar" class="avatar" />
          <div class="message-bubble">
            <p class="message-content">{{ message.content }}</p>
          </div>
        </div>
        <div class="user-message" v-else>
          <div class="message-bubble">
            <p class="message-content">{{ message.content }}</p>
          </div>
          <img :src="userAvatar" alt="Avatar" class="avatar" />
        </div>
      </div>
      <van-loading size="24px" v-show="isLoading">回复加载中...</van-loading>
    </div>
    <!-- 输入框和发送按钮 -->
    <div class="input-area">
      <van-field
        v-model="inputMessage"
        placeholder="请输入你要发送的消息"
        @keydown.enter="sendMessage"
        style="width: 90%"
      />
      <van-button
        type="primary"
        @click="sendMessage"
        style="min-width: 1rem; white-space: nowrap"
      >发送</van-button>
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
  width: 100%; /* 确保每条消息占满宽度 */
}

/* 用户消息样式 */
.user-message {
  justify-content: flex-end;
  flex-direction: row-reverse;
  margin-left: auto; /* 确保用户消息靠右 */
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
  min-width: 1rem; /* 设置最小宽度 */
  max-width: 17rem; /* 设置最大宽度 */
  position: relative;
  display: inline-block;
  white-space: pre-wrap; /* 允许换行 */
  overflow: hidden; /* 隐藏溢出内容 */
  text-overflow: ellipsis; /* 溢出内容用省略号表示 */
}

/* 用户消息气泡样式 */
.user-message .message-bubble {
  background-color: #dcf8c6;
  margin-left: 5px;
}

/* AI 消息气泡样式 */
.ai-message .message-bubble {
  background-color: #e5e5ea;
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
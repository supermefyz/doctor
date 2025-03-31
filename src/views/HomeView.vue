<script setup>
</script>
<template>
    <div class="background">
        <div class="title">
            <h1>医智健康</h1>
            <p>医疗信息化平台</p>
        </div>
        <div class="button-container">
            <van-button type="primary" to="/userMessage">病人入口</van-button>
            <van-button plain hairline type="success" to="/doctor">医生入口</van-button>
        </div>
    </div>
</template>
<style scoped>
/* 设置背景渐变和动画 */
.background {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    background-size: 200% 200%;
    animation: gradientAnimation 10s ease infinite;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
@keyframes gradientAnimation {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}
/* 标题样式 */
.title {
    text-align: center;
    margin-bottom: 50%;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}
h1 {
    font-size: 48px;
    font-weight: bold;
    margin-bottom: 10px;
}
p {
    font-size: 20px;
}
/* 按钮容器样式 */
.button-container {
    display: flex;
    gap: 50px;
    justify-content: center;
    width: 100%;
    max-width: 400px;
}
/* 按钮样式 */
van-button {
    width: 100%;
    font-size: 18px;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease;
}
van-button:hover {
    transform: translateY(-3px);
}
</style>    
<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <button @tap="onClick">点击</button>
    </view>
    <uni-card title="基础卡片" sub-title="副标题" extra="额外信息"
      thumbnail="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png">
      <text>这是一个带头像和双标题的基础卡片，此示例展示了一个完整的卡片。</text>
    </uni-card>
    <!-- #ifdef MP-WEIXIN -->
    <base-button></base-button>
    <!-- #endif -->
  </view>
</template>

<script setup lang="ts">
const onClick = () => {
  uni.navigateTo({
    url:'/pages/detail/index',
  })
}


</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>

<template>
  <view class="content">
    {{ count }}
  </view>
</template>

<script setup lang="ts">
import { onLaunch } from '@dcloudio/uni-app';
import { ref } from 'vue';

const count = ref<number>(1)
const getData = () => {
  console.log('getdata');
  count.value = Math.random()
}

onLaunch(()=>{
  console.log(12313);
  
})

getData()
</script>

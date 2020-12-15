<template>
  <div class="webView">
    <web-view :src="url"></web-view>
  </div>
</template>

<script>

export default {
  data() {
    return {
      url: 'https://www.baidu.com'
    }
  }
}
</script>

<style>
.webView{
  height: 100vh;
}
</style>

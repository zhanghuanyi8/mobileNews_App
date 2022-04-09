<template>
  <div>
    <router-view></router-view>
    <van-tabbar class="layout-tabbar" route>
      <van-tabbar-item to="/home">
        <i slot="icon" class="toutiao icon-wenda"></i>
        首页
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <i slot="icon" class="toutiao icon-wenda"></i>
        问答
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <i slot="icon" class="toutiao icon-shipin"></i>
        视频</van-tabbar-item
      >
      <van-tabbar-item to="/my">
        <i slot="icon" class="toutiao icon-wode"></i>
        {{ $store.state.user ? "我的" : "未登录" }}</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "laoutindex",
  data() {
    return {};
  },
};
</script>

<style  scoped lang='less'>
.layout-tabbar {
  i.toutiao {
    font-size: 40px;
  }
  font-size: 20px;
}
</style>
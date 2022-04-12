<template>
  <van-cell class="article-item">
    <div slot="title">{{article.title}}</div>
    <div slot="label">
      <!-- 三张图片 -->
      <div class="cover-warp"
           v-if="article.cover.type===3">
        <div class="cover-item"
             v-for="(img,index) in article.cover.images "
             :key="index">
          <van-image width="100"
                     height="100"
                     :src="img" />
        </div>
      </div>
      <div><span>{{article.aut_name}}</span>{{article.comm_count}}评论<span></span><span>{{article.pubdate}}</span></div>

    </div>
    <!-- 一张图片 -->
    <van-image v-if='article.cover.type===1'
               slot="default"
               width="100"
               height="100"
               :src="article.cover.images[0]" />

  </van-cell>

</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}


</script>

<style scoped lang="less"></style>


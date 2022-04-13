<template>
  <van-cell class="article-item">
    <div slot="title"
         class="title van-multi-ellipsis--l2">{{article.title}}</div>
    <div slot="label">
      <!-- 三张图片 -->
      <div class="cover-warp"
           v-if="article.cover.type===3">
        <div class="cover-item"
             v-for="(img,index) in article.cover.images "
             :key="index">
          <van-image :src="img"
                     class="img_item" />

        </div>
      </div>
      <div class="label_content"><span>{{article.aut_name}}</span><span>{{article.comm_count}}评论</span><span>{{article.pubdate | relativeTime}}</span></div>

    </div>
    <!-- 一张图片 -->
    <van-image v-if='article.cover.type===1'
               class="right_cover"
               slot="default"
               fit="cover"
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

<style scoped lang="less">
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  //图片样式设置
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
  .right_cover {
    width: 232px;
    height: 146px;
  }
  .label_content span {
    font-size: 22px;
    color: #666;
    margin-right: 25px;
  }
  // 多图样式
  .cover-warp {
    padding: 30px 0;
    display: flex;
    .cover-item {
      flex: 1;
      height: 146px;
      //flex 1不用设置宽度
      &:not(:last-child) {
        padding-right: 4px;
      }
      .img_item {
        height: 146px;
        width: 100%;
      }
    }
  }
}
</style>


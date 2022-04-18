<template>
  <div class="reaply-content">
    <van-nav-bar>
      <!-- 关闭图标 -->
      <van-icon name="cross"
                slot="left"
                @click="$emit('close')" />
    </van-nav-bar>
    <!-- 滚动区域  -->
    <div class="scroll-top">
      <!-- 评论目标单个对象 -->
      <ItemComment :comment="comment"></ItemComment>
      <!--  全部回复 -->
      <van-cell :title="comment.reply_count>0 ? `${comment.reply_count}条回复` :'暂无回复'" />
      <!-- 引入全部回复 -->
      <comment :list="commentList"
               :articleId="comment.com_id"
               type='c'></comment>
    </div>
    <!-- 发布评论 -->
    <div class="post-warp">
      <van-button class="post-btn"
                  @click="ispostShow=true"
                  round>发布评论</van-button>
    </div>

    <!-- 发布弹窗 -->
    <van-popup v-model="ispostShow"
               position="bottom">
      <commentPost :target="comment.com_id"
                   @uppost="uppost"></commentPost>
    </van-popup>

  </div>
</template>

<script>
import ItemComment from '@/views/article/cmoponents/item-comments.vue'
import comment from '@/views/article/cmoponents/comment.vue'
import commentPost from "@/views/article/cmoponents/comment-post.vue"
export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  components: { ItemComment, comment, commentPost },
  data () {
    return {
      ispostShow: false,
      commentList: []
    }
  },
  methods: {
    uppost (data) {
      this.comment.reply_count++
      this.ispostShow = false
      this.commentList.unshift(data.new_obj)
    }
  }
}
</script>

<style lang="less" scoped>
.scroll-top {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}
.post-warp {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .post-btn {
    width: 60%;
  }
}
</style>
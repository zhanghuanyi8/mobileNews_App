<template>

  <van-button :icon="value===1 ? 'good-job' :'good-job-o'"
              @click="Onlike"
              :class="{liked: value===1 }">
  </van-button>

</template>

<script>
import { addLiked, delLiked } from "@/api/article"
export default {
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async Onlike () {
      if (this.value === 1) {
        // 取消收藏
        try {
          await delLiked(this.articleId)
        } catch (err) {
          console.log(err);
        }
        this.$emit('input', -1)
      } else {
        // 收藏
        try {
          await addLiked(this.articleId)
        } catch (err) {
          console.log(err);
        }
        this.$emit('input', 1)
      }

    }
  }
}
</script>

<style lang="less" scoped>
.liked {
  color: #e5645f;
}
</style>>
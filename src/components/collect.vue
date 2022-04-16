<template>

  <van-button :icon="value ? 'star' :'star-o'"
              @click="OnCollect"
              :class="{collected: value }">
  </van-button>

</template>

<script>
import { addCollect, delCollect } from "@/api/article"
export default {
  props: {
    value: {
      type: Boolean,
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
    async OnCollect () {
      if (this.value) {
        // 取消收藏
        try {
          await delCollect(this.articleId)
        } catch (err) {
          console.log(err);
        }
      } else {
        // 收藏
        try {
          await addCollect(this.articleId)
        } catch (err) {
          console.log(err);
        }
      }
      this.$emit('input', !this.value)
    }
  }
}
</script>

<style lang="less" scoped>
.collected {
  color: #ffa500;
}
</style>>
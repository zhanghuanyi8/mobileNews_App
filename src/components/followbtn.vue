<template>
  <van-button round
              size="small"
              @click="onFollow"
              :loading="followloading"
              v-if="isfollow">已关注</van-button>

  <van-button type="info"
              v-else
              color="#3296fa"
              round
              :loading="followloading"
              @click="onFollow"
              size="small"
              icon="plus">关注</van-button>
</template>

<script>
import { addFollow, DeleteFollow } from '@/api/user'
export default {
  props: {
    isfollow: {
      type: Boolean,
      required: true
    },
    user_id: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      followloading: false
    }
  },
  methods: {
    async onFollow () {
      this.followloading = true
      try {
        if (this.isfollow) {
          await addFollow(this.user_id)
        } else {
          await DeleteFollow(this.user_id)
        }
        this.$emit('upfollow', !this.isfollow)
      } catch (err) {
        if (err?.response.status == 400) {
          this.$toast.fail('不能关注自己')
        }
        this.$toast.fail('操作失败')
      }
      this.followloading = false
    }
  }
}
</script>

<style>
</style>
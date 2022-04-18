<template>
  <div>
    <van-nav-bar title="设置昵称"
                 left-text="取消"
                 right-text="完成"
                 @click-left="$emit('close')"
                 @click-right="onUpdate">

    </van-nav-bar>
    <div class="filed">
      <van-field v-model.trim="message"
                 rows="2"
                 autosize
                 type="textarea"
                 maxlength="7"
                 placeholder="请输入昵称"
                 show-word-limit />
    </div>
  </div>
</template>

<script>
import { updateUser } from "@/api/user"
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      message: this.value
    }
  },
  methods: {
    async onUpdate () {
      try {
        if (this.message.length == 0) { return this.$toast('昵称不能为空') }
        const { data } = await updateUser({
          name: this.message
        })
        this.$emit('upname', this.message)
        console.log(111);
        this.$emit('close')
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>

<style lang="less" scoped>
.filed {
  padding: 20px;
}
</style>
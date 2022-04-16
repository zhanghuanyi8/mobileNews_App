<template>
  <div class="post-comment">
    <van-field class="post-field"
               v-model.trim="message"
               rows="2"
               autosize
               type="textarea"
               maxlength="50"
               placeholder="优质评论将会被优先展示"
               show-word-limit />
    <van-button type="default"
                @click="Onpost"
                :disabled="!message.length"
                size="small">发布</van-button>
  </div>
</template>

<script>
import { artpost } from '@/api/comment'
export default {
  name: 'PostComment',
  components: {},
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    // 评论接口
    async Onpost () {
      try {
        const { data } = await artpost({
          target: this.target,
          content: this.message,
          art_id: null // 对文章评论不用
        })
        this.$emit('update:ispostShow', false)
        this.$emit('uppost', data.data)
        console.log(data.data);
      } catch (err) {

      }
    }
  }
}
</script>

<style scoped lang="less">
.post-comment {
  display: flex;
  padding: 15px;
  align-items: center;
  .post-field {
    background: #f5f7f9;
    margin-right: 15px;
  }
}
</style>


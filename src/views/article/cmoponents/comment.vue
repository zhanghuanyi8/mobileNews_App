<template>
  <van-list v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            :immediate-check="false"
            @load="onLoad">
    <!-- <van-cell v-for="(item,index) in list"
              :key="index"
              :title="item" /> -->
    <ItemComment v-for="(item,index) in  list"
                 :comment="item"
                 :key="index"
                 @reaply-click="$emit('reaply-click',$event)"></ItemComment>
  </van-list>
</template>

<script>
import { getComments } from '@/api/comment'
import ItemComment from './item-comments.vue'
export default {
  components: {
    ItemComment
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      Requestd: true
    },
    list: {
      type: Array,
      default: () => [] //默认空数组  必须这么写 不然循环报错
    },
    type: {
      type: String,
      default: 'a',
      // 验证接收的值 
      validator (value) {
        return ['a', 'c'].includes(value)
      }
    }
  },
  data () {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null
    };
  },
  created () {
    this.loading = true
    this.onLoad()  // 因为组件在最底下  不会加载  但我们还需要用到 所以让他提前加载
  },
  methods: {
    async onLoad () {

      this.loading = false
      try {
        const { data: { data: { results } }, data } = await getComments({
          type: this.type, // 获取评论写a 回复 c
          source: this.articleId,
          offset: this.offset,
          limit: 10
        })
        this.list.push(...results)
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
        this.$emit("onload", data.data)
        this.loading = false
      } catch (err) {
        this.loading = false
      }
    },
  },
};
</script>

<style>
</style>
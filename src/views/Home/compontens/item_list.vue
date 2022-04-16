<template>
  <div class="data_list">
    <van-pull-refresh v-model="isLoading"
                      :success-text="refreshSuccessText"
                      @refresh="onRefresh"
                      success-duration="1500">

      <van-list v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                :error.sync="error"
                @load="onLoad"
                error-text="请求失败，点击重新加载">

        <!-- 具体每个内容组件 -->
        <article_item v-for="(item,index) in list"
                      :key="index"
                      :article="item"></article_item>

      </van-list>
    </van-pull-refresh>

  </div>
</template>

<script>
import { getList } from '@/api/list'
import article_item from '../../../components/article_item.vue'
export default {
  name: 'Item_List',
  data () {
    return {
      list: [], // 存储数据
      loading: false, // 控制加载中
      finished: false,// 数据没有  加载也没了 为true
      timesmap: null,
      error: false,
      isLoading: false,
      refreshSuccessText: ''
    }
  },
  props: {
    channel: {
      type: Object,
      required: true,

    }
  },
  components: {
    article_item
  },
  methods: {
    async onLoad () {
      try {
        const { data } = await getList({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: this.timesmap || Date.now()
        })
        const { results } = data.data

        this.list.push(...results)
        console.log(results);
        this.loading = false
        if (results.length) {
          this.timesmap = data.data.pre_timestamp
        } else {
          this.finished = true
        }

      } catch (err) {
        this.loading = false
        this.error = true
      }
    },

    async onRefresh () {
      try {
        const { data } = await getList({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: this.timesmap || Date.now()
        })
        const { results } = data.data
        this.list.unshift(...results)
        this.isLoading = false
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`

      } catch (err) {
        this.isLoading = false
        this.refreshSuccessText = `刷新失败`
      }
    }

  }
}
</script>

<style lang="less" scoped>
.data_list {
  height: 79vh;
  overflow-y: auto;
}
</style>>

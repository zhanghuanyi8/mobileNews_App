<template>
  <div class="search_result">
    <van-list v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              :error.sync="error"
              @load="onLoad">
      <!-- <van-cell v-for="(item,index) in list"
                :key="index"
                :title="item.title" /> -->

      <artcle_item v-for="(item) in list"
                   :key="item.art_id"
                   :article="item"></artcle_item>
    </van-list>
  </div>
</template>
<script>
import { searchResult } from '@/api/Search'
import artcle_item from "@/components/article_item.vue"
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      error: false

    };
  },
  props: {
    searchval: {
      type: String,
      required: true
    }
  },
  methods: {
    async onLoad () {
      // 异步获取数据
      try {
        const { data: { data: { results } } } = await searchResult({
          page: this.page,
          per_page: 20,
          q: this.searchval
        })

        this.list.push(...results)
        this.loading = false
        if (results.length) {
          this.page++
        } else {
          this.finished = true
          this.loading = false
        }
      } catch (err) {
        this.error = true
        this.loading = false
        this.$toast.fail('失败')
      }

    },
  },
  components: {
    artcle_item
  }
};
</script>

<style>
</style>
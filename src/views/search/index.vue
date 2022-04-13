<template>
  <div class="Search_content">
    <!-- 搜索栏 -->
    <form action="/">
      <van-search v-model="searchvalue"
                  show-action
                  placeholder="请输入搜索关键词"
                  background="#3296fa"
                  @search="onSearch"
                  @cancel="onCancel" />
    </form>
    <!-- 搜索结果 -->
    <search_result v-if="isResultShow"
                   :searchval="searchvalue"></search_result>
    <!-- 联想建议 -->
    <search_suggestion v-else-if="searchvalue"
                       :searchval="searchvalue"
                       @search="onSearch"></search_suggestion>
    <!-- 搜索历史记录 -->
    <search_histiry v-else></search_histiry>

  </div>
</template>

<script>
import search_result from './components/search_result.vue'
import search_histiry from './components/serach_histiry.vue'
import search_suggestion from './components/search_sufggestion.vue'
export default {
  name: 'SearchIndex',
  data () {
    return {
      searchvalue: '',
      isResultShow: false, //控制结果和历史记录的显示 (互斥)
    };
  },
  methods: {
    onSearch (val) {
      this.isResultShow = true
      this.searchvalue = val
    },
    onCancel () {
      this.$router.back() //点击取消时触发此函数
    },

  },
  components: {
    search_result,
    search_histiry,
    search_suggestion
  }

}
</script>

<style lang="less" scoped>
.Search_content {
  .van-search__action {
    color: #fff;
    font-size: 30px;
  }
}
</style>>

<template>
  <div class="Search_content">
    <!-- 搜索栏 -->
    <form action="/">
      <van-search v-model="searchvalue"
                  show-action
                  placeholder="请输入搜索关键词"
                  background="#3296fa"
                  @search="onSearch"
                  @cancel="onCancel"
                  @focus="isResultShow=false" />
    </form>
    <!-- 搜索结果 -->
    <search_result v-if="isResultShow"
                   :searchval="searchvalue"></search_result>
    <!-- 联想建议 -->
    <search_suggestion v-else-if="searchvalue"
                       :searchval="searchvalue"
                       @search="onSearch"></search_suggestion>
    <!-- 搜索历史记录 -->
    <search_histiry v-else
                    :search_histiry="search_histiry"
                    @search="onSearch"
                    @update="search_histiry=[]"></search_histiry>

  </div>
</template>

<script>
import search_result from './components/search_result.vue'
import search_histiry from './components/serach_histiry.vue'
import search_suggestion from './components/search_sufggestion.vue'
import { getItem, setItem } from '@/utils/storage'

export default {
  name: 'SearchIndex',
  data () {
    return {
      searchvalue: '',
      isResultShow: false, //控制结果和历史记录的显示 (互斥)
      search_histiry: getItem("HISTIRY") || [],
    };
  },
  methods: {
    onSearch (val) {
      this.isResultShow = true
      const index = this.search_histiry.indexOf(val)
      if (index == -1) {
        this.search_histiry.unshift(val)
      }
      this.searchvalue = val  //点击搜索时 让上面保持 显示搜索的内容
    },
    onCancel () {
      this.$router.back() //点击取消时触发此函数
    },

  },
  components: {
    search_result,
    search_histiry,
    search_suggestion
  },
  watch: {
    search_histiry () {
      setItem('HISTIRY', this.search_histiry)
    }
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

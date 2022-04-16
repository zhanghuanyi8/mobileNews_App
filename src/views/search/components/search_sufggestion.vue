<template>
  <div class="search_suggestion">
    <van-cell v-for="(text,index) in suggestions"
              :key="index"
              @click="$emit('search',text)"
              icon="search">
      <div slot="title"
           v-html="highlight(text)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestion } from '@/api/Search'
import { debounce } from 'lodash'
export default {
  name: 'search_suggestion',
  data () {
    return {
      suggestions: [],
      timer: null,
      HtmlStr: ''
    }
  },
  props: {
    searchval: {
      type: String,
      required: true
    }
  },
  methods: {
    async loadSearch (q) {
      try {
        const { data: { data: { options } } } = await getSuggestion(q)
        this.suggestions = options
      } catch (err) {
        this.$toast.fail('获取失败')
      }
    },
    highlight (text) {
      try {
        const reg = new RegExp(this.searchval, 'gi')
        return text.replace(reg, `<span style="color:#3296fa">${this.searchval}</span>`)
      } catch (err) {
        console.log(err);
      }
    }
  },
  watch: {
    searchval: {
      immediate: true, //立即监视
      handler: _.debounce(function (value) {
        this.loadSearch(value)
      }, 500)
    }
  }

}

</script>

<style>
</style>
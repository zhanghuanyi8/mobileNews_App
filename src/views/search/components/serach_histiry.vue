<template>
  <div class="search_histiry">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('update',[])">全部删除</span>
        &nbsp;
        <span @click="isDeleteShow=false">完成</span>
      </div>
      <van-icon name="delete"
                v-else
                @click="isDeleteShow=true"></van-icon>
    </van-cell>
    <van-cell v-for="(item,index) in search_histiry"
              :key="index"
              :title="item"
              @click="delete_search(item,index)">
      <van-icon name="close"
                v-show="isDeleteShow"></van-icon>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    search_histiry: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow: false // 控制是否删除
    }
  },
  methods: {
    delete_search (item, index) {
      if (this.isDeleteShow) {
        this.search_histiry.splice(index, 1)
      } else {
        this.$emit('search', item)
      }
    }
  }
}
</script>

<style>
</style>
<template>
  <div class="home_container">
    <!-- 头部  -->
    <van-nav-bar class="page-nav-bar"
                 fixed>
      <van-button class="search_btn"
                  slot="title"
                  type="info"
                  size="small"
                  round
                  to="/search"
                  icon="search">搜索</van-button>
    </van-nav-bar>
    <!-- 频道 -->
    <van-tabs v-model="active"
              animated
              class="channel-tabs"
              swipeable>
      <van-tab :title="item.name"
               v-for="item in channels"
               :key="item.id">
        <!-- 频道主体内容 -->
        <item_list :channel="item"></item_list>
      </van-tab> -->
      <div slot="nav-right"
           @click="isEditSHow"
           class="hamburgur">
        <i class="toutiao icon-gengduo "></i>
      </div>
    </van-tabs>

    <!-- 频道编辑 -->
    <van-popup v-model="isShow"
               closeable
               close-icon-position="top-left"
               position="bottom"
               :style="{ height: '90%' }">
      <Edit_item :channels="channels"
                 :active="active"
                 @upactive="onupdate"></Edit_item>
    </van-popup>

  </div>
</template>

<script>
import { getUserChannels } from '../../api/user'
// 文章列表
import item_list from './compontens/item_list.vue'
// 频道编辑
import Edit_item from './compontens/Edit_item.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: 'HomeIndex',
  data () {
    return {
      active: 0,
      channels: '',
      isShow: false //弹出层是否展示
    };
  },
  created () {
    this.loadUserChannels()
  },
  components: {
    item_list,
    Edit_item
  },
  methods: {
    async loadUserChannels () {
      try {
        if (this.user) {
          const { data } = await getUserChannels()
          this.channels = data.data.channels
        } else {
          const localchannels = getItem('TOUTIAO_CHANNELS')
          if (localchannels) {
            this.channels = localchannels
          } else {
            const { data } = await getUserChannels()
            this.channels = data.data.channels
          }
        }


      } catch (err) {
        this.$toast('获取失败')
      }
    },
    isEditSHow () {
      this.isShow = true
    },
    onupdate (index, flag) {
      this.isShow = flag
      this.active = index
    }

  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style scoped lang="less">
.home_container {
  padding-bottom: 100px;
  padding-top: 92px;
  /deep/ .van-nav-bar__title {
    max-width: 75%;
  }
  // 搜索按钮
  .search_btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  // 标签页
  .channel-tabs {
    position: relative;
    left: 0;
    right: 0;
    z-index: 1;
  }
  /deep/.van-tabs__wrap {
    .van-tab {
      min-width: 200px;
      font-size: 30px;
      color: #777;
      border-right: 1px solid #edeff3;
    }
    .van-tab--active {
      color: #333;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .van-tabs__line {
      bottom: 3px;
      background-color: #3296fa;
      width: 31px;
      height: 6px;
    }
    .hamburgur {
      width: 66px;
      height: 82px;
      position: fixed;
      display: flex;
      justify-content: center;
      align-items: center;
      right: 0;
      background-color: #fff;
      opacity: 0.902;
      i.toutiao {
        font-size: 33px;
      }
      &::before {
        position: absolute;
        left: 0;
        content: "";
        width: 2px;
        height: 80%;
        background: url(../../assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
    height: 82px;
  }
}
</style>


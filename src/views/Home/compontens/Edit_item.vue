<template>
  <div class="edit">
    <van-cell :border="false">
      <!-- 头部 -->
      <div slot="title"
           class="Mytitle"> 我的频道</div>
      <van-button type="danger"
                  class="Editbtn"
                  plain
                  round
                  @click="edit"
                  size="mini">
        {{isEdit? "完成":"编辑"}}</van-button>
    </van-cell>
    <!-- 我的频道格子-->
    <van-grid :gutter="10"
              class="Mycell">
      <van-grid-item v-for="(item,index) in channels"
                     :key="item.id"
                     @click="editchannel(item.id,index)"
                     class="editgrid">
        <!-- 删除插槽 -->
        <van-icon slot="icon"
                  v-show="isEdit && !fixchannel.includes(item.id) "
                  name="clear"></van-icon>
        <!-- 内容 -->
        <span slot="text"
              :class="{active: index==active}"
              class="Mytext">{{item.name}}</span>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐格子 -->
    <van-cell :border="false"
              class="Mytitle">
      <div slot="title"> 我的频道</div>
    </van-cell>
    <van-grid :gutter="10"
              class="recommen_grid">
      <van-grid-item v-for="item in recommend"
                     :key="item.id"
                     icon="plus"
                     @click='Addchannel(item)'
                     :text="item.name"
                     class="editgrid" />
    </van-grid>
  </div>
</template>

<script>
import { getAllchannels, AddUserChannels, DeleteUserChannels } from '@/api/channels'
import { mapState } from 'vuex' //引入vuex
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'Edit_item',
  props: {
    channels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    },

  },
  data () {
    return {
      allChannels: [],
      isEdit: false, //控制编辑状态显示
      fixchannel: [0],
    }
  },
  created () {
    this.loadAllchannels() //读取全部的数据

  },
  methods: {
    async loadAllchannels () {
      try {
        const { data } = await getAllchannels()
        this.allChannels = data.data.channels

      } catch (err) {
        this.$toast.fail('加载频道失败')
      }
    },

    // 添加的频道同步的后台
    async Addchannel (item) {
      this.channels.push(item)
      if (this.user) {
        try {
          await AddUserChannels({
            id: item.id,
            seq: this.channels.length
          })
        } catch (err) {
          this.$toast.fail('保存失败,请稍后重试')
        }
      } else {
        setItem('TOUTIAO_CHANNELS', this.channels)
      }


    },


    // 编辑切换 点击出现删除号
    edit () {
      this.isEdit = !this.isEdit
    },



    editchannel (id, index) {
      // 如果编辑状态 则执行删除
      if (this.isEdit) {
        if (this.fixchannel.includes(id)) return
        this.channels.splice(index, 1)
        if (index <= this.active) {
          this.$emit('upactive', this.active - 1, true)
        }
        this.deleteChannel(id)
      } else {
        //给父组件发通知
        this.$emit('upactive', index, false)

      }
    },
    // 删除的我的频道 同步到后台
    async deleteChannel (id) {
      if (this.user) {
        try {
          await DeleteUserChannels(id)
        } catch (err) {
          this.$toast.fail('删除失败,请稍后重试')
        }
      } else {
        setItem('TOUTIAO_CHANNELS', this.channels)

      }
    }

  },
  computed: {
    recommend () {
      return this.allChannels.filter(channel => {
        // 数组的 find 方法: 遍历数组,把符合条件的元素返回
        return !this.channels.find(myChannel => {
          return myChannel.id === channel.id
        })
      })

    },
    ...mapState(['user'])
  },

}
</script>
<style lang="less" scoped>
.edit {
  padding: 85px 0;
  .Mytitle {
    color: #333;
    font-size: 32px;
  }
  .Editbtn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/ .editgrid {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .Mytext {
        font-size: 28px;
        color: #222;
        margin: unset;
      }

      .active {
        color: red;
      }
    }
  }
  //我的推荐盒子 横向排列
  /deep/.recommen_grid {
    .editgrid {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }

  /deep/.Mycell {
    .van-grid-item__content {
      .van-grid-item__icon-wrapper {
        position: absolute;
        right: -10px;
        top: -10px;
        color: #cacaca;
        z-index: 2;
        font-size: 30px;
      }
    }
  }
}
</style>
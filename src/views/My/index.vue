<template>
  <div>
    <!-- 头部 -->
    <div class="header login"
         @click="$router.push('/login')"
         v-if="!user">
      <div class="login-btn">
        <img src="../../assets/mobile.png"
             alt=""
             class="mobile-login" />
        <span class="text">登录/注册</span>
      </div>
    </div>
    <!-- 用户栏 -->
    <div class="header user_info"
         v-else>
      <div class="base_info">
        <div class="left">
          <van-image class="avatar"
                     :src="userInfo.photo"
                     round
                     cover
                     fit="cover" />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button size="mini"
                      to="user/info"
                      round>编辑资料</van-button>
        </div>
      </div>
      <div class="data_stats">
        <div class="data_item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data_item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data_item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data_item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 导航 -->
    <van-grid class="grid_nav"
              :column-num="2"
              clickable>
      <van-grid-item class="grid_item">
        <i slot="icon"
           class="toutiao icon-shoucang"></i>
        <span slot="text"
              class="text1">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid_item">
        <i slot="icon"
           class="toutiao icon-lishi"></i>
        <span slot="text"
              class="text1">历史 </span>
      </van-grid-item>
    </van-grid>
    <!-- 消息 退出登录 -->
    <van-cell-group class="cell">
      <van-cell title="消息通知"
                is-link />
      <van-cell title="小智同学"
                is-link />
    </van-cell-group>
    <van-button type="default"
                block
                class="leavebtn"
                v-if="user"
                @click="leave">退出登录</van-button>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import { getUserInfo } from "@/api/user";
import { getUserInfo } from "@/api/user";
export default {
  nameL: "myindex",
  data () {
    return {
      userInfo: "",
    };
  },
  created () {
    if (this.user) {
      this.loadUserInfo();
    }
  },
  methods: {
    leave () {
      this.$dialog
        .confirm({
          title: "退出",
          message: "您确认退出吗",
        })
        .then(() => {
          this.$store.commit("setUser", null);
        })
        .catch(() => {
          // on cancel
        });
    },
    //获取用户数据
    async loadUserInfo () {
      try {
        const { data } = await getUserInfo();
        this.userInfo = data.data;
        console.log(this.userInfo);
      } catch (err) {
        this.$toast.fail("获取用户数据失败,请稍后再试");
      }
    },
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style scoped lang='less'>
.header {
  height: 361px;
  background: url("../../assets/banner.png");
  background-size: cover;
}
.login {
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.mobile-login {
  width: 132px;
  height: 132px;
}
.text {
  font-size: 28px;
  margin-top: 15px;
  color: #fff;
}
.user_info {
  .base_info {
    display: flex;
    align-items: center;
    height: 231px;
    padding: 76px 32px 23px;
    box-sizing: border-box;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      .avatar {
        width: 132px;
        height: 132px;
        border: 1px solid #ccc;
      }
      .name {
        color: #fff;
        margin-left: 23px;
        font-size: 30px;
      }
    }
  }
  .data_stats {
    height: 130px;

    display: flex;
    justify-content: space-around;
    .data_item {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      color: #fff;
      .count {
        font-size: 36px;
      }
      .text {
        font-size: 23px;
      }
    }
  }
}
.grid_nav {
  .grid_item {
    height: 141px;
    i.toutiao {
      font-size: 45px;
    }
    .icon-shoucang {
      color: #eb5253;
    }
    .icon-lishi {
      color: #ff9d1d;
    }
    .text1 {
      font-size: 28px;
    }
  }
}
.cell {
  margin-top: 8px;
}
.leavebtn {
  color: red;
  margin-top: 7px;
}
</style>>

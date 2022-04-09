<template>
  <div class="login-container">
    <!--    头部登录-->
    <van-nav-bar class="page-nav-bar" title="登录">
      <van-icon
        name="arrow-left"
        slot="left"
        @click="$router.back()"
        size="20"
      />
    </van-nav-bar>
    <!--    表单-->
    <!--    手机号-->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        name="mobile"
        v-model="user.mobile"
        placeholder="请输入手机号"
        :rules="userForMater.mobile"
      >
        <i slot="left-icon" class="toutiao icon-shouji"></i>
      </van-field>
      <!--      验证码-->
      <van-field v-model="user.code" name="code" placeholder="请输入验证码">
        <i slot="left-icon" class="toutiao icon-yanzhengma"></i>
        <template #button>
          <!--          倒计时-->
          <van-count-down
            :time="100 * 5"
            format="ss s"
            v-if="isCount"
            @finish="isCount = false"
          />
          <!--          发送验证码-->
          <van-button
            size="small"
            type="defalut"
            round
            class="send-sms-btn"
            native-type="button"
            @click="sendCode"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px" class="login-btn-wrap">
        <van-button block type="info" native-type="submit" class="login-btn"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, code } from "@/api/user";
export default {
  name: "LoginPage",
  components: {},
  props: {},
  data() {
    return {
      isCount: false,
      user: {
        mobile: "",
        code: "",
      },
      // 检验规则
      userForMater: {
        mobile: [
          { required: true, message: "请输入手机号" },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: "手机格式错误" },
        ],
        code: [
          { required: true, message: "请输入验证码" },
          { pattern: /\d{6}/, message: "验证码格式错误" },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 提交
    async onSubmit() {
      this.$toast.loading({
        duration: 0, // 持续时间，0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: "登录中...", // 提示消息
      });
      try {
        // eslint-disable-next-line no-unused-vars
        const { data } = await login(this.user);
        this.$store.commit("setUser", data.data);
        this.$toast.success("登录成功");
      } catch (err) {
        if (err.response.status === 400) {
          return this.$toast.fail("登录失败");
        }
      }
    },
    async sendCode() {
      // 验证手机号
      try {
        await this.$refs.loginForm.validate("mobile");
        console.log(111);
      } catch (err) {
        return console.log(err);
      }
      // 发送验证码
      try {
        await code(this.user.mobile);
      } catch (err) {
        if (err.response.status === 429) {
          return this.$toast("请求频繁");
        } else {
          return this.$toast("请稍后再试");
        }
      }
    },
  },
};
</script>
<style scoped lang="less">
.toutiao {
  font-size: 37px;
}
.send-sms-btn {
  padding: 0; // 原有button 带有 padding 需要清除
  width: 152px;
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  font-size: 22px;
  color: #666;
  border: none;
}
.login-btn-wrap {
  padding: 53px 33px;
  .login-btn {
    background-color: #6db4fb;
    border: none;
  }
}
</style>

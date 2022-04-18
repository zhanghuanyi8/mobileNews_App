<template>
  <div class="user-centent">
    <van-nav-bar title="个人信息">
      <van-icon name="cross"
                slot="left"
                @click="$router.back()" />
    </van-nav-bar>
    <input type="file"
           hidden
           ref="file"
           @change="filechange" />
    <van-cell title="头像">
      <van-image width="60"
                 round
                 height="60"
                 :src="user.photo"
                 @click="$refs.file.click()" />
    </van-cell>
    <van-cell title="昵称"
              :value="user.name"
              @click="isUsershow=true"></van-cell>
    <van-cell title="性别"
              @click="isGendershow=true"
              :value="user.gender==0? '女':'男'"></van-cell>
    <van-cell title="生日"
              :value="user.birthday"
              @click="isBirdayShow=true"></van-cell>
    <!-- 编辑名字弹层 -->
    <van-popup style="height: 100%"
               class="color"
               v-model="isUsershow"
               position="bottom">
      <!-- 编辑名字弹层 -->
      <upuser @close="isUsershow=false"
              v-model="user.name"
              @upname="upname"></upuser>
    </van-popup>
    <!-- 编辑性别 -->
    <van-popup class="color"
               v-model="isGendershow"
               position="bottom">
      <!-- 编辑名字弹层 -->
      <upgender @close="isGendershow=false"
                @upgender='user.gender=$event'></upgender>
    </van-popup>
    <!-- 修改生日 -->
    <van-popup class="color"
               v-model="isBirdayShow"
               position="bottom">
      <!-- 编辑名字弹层 -->
      <upbirthday v-model="user.birthday"
                  v-if="isBirdayShow"
                  @close="isBirdayShow=false"></upbirthday>
    </van-popup>
    <!-- 编辑头像 -->
    <van-popup class="color"
               v-model="isphotoShow"
               style="hetght :100%"
               position="bottom">
      <!-- 编辑头像弹层 -->
      <photo :img=img
             @close="isphotoShow=false"
             @updatephoto="user.photo = $event"></photo>
    </van-popup>
  </div>
</template>

<script>
import { getUser } from '@/api/user'
import upuser from "./components/upuser.vue"
import upgender from './components/upgender.vue'
import upbirthday from './components/upbirthdy.vue'
import photo from './components/photo.vue'
export default {
  components: { upuser, upgender, upbirthday, photo },
  data () {
    return {
      user: {},
      isUsershow: false, // 控制用户名字显示
      isGendershow: false, // 控制 性别显示
      isBirdayShow: false,  // 控制生日显示
      isphotoShow: false,  //控制头像涂层
      img: null
    }
  },
  created () {
    this.loadUser()
  },
  methods: {
    async loadUser () {
      try {
        const { data: { data } } = await getUser()
        this.user = data
      } catch (err) {
        console.log(err);
      }
    },
    upname (name) {
      console.log(name);
      this.user.name = name
    },
    filechange () {
      const file = this.$refs.file.files[0]
      this.img = window.URL.createObjectURL(file)
      this.isphotoShow = true
      this.$refs.file.value = ''
    }
  },


}
</script>

<style lang="less" scoped>
.color {
  background-color: #f5f7f9;
}
</style>
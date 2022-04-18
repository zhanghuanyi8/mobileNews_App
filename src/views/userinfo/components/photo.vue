<template>
  <div class="photo-centent">
    <img :src="img"
         class="img"
         ref="img">
    <div class="tobar">
      <div class="cancel"
           @click="$emit('close')">取消</div>
      <div class="confirm"
           @click=confirm>完成</div>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { upphoto } from "@/api/user"
export default {
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  data () {
    return {
      cropper: null
    }
  },
  mounted () {
    const image = this.$refs.img
    const cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      // autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false
    })
    this.cropper = cropper
  },
  methods: {
    confirm () {
      this.cropper.getCroppedCanvas().toBlob(blob => {
        this.updatephoto(blob)
      })
    },
    async updatephoto (blob) {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })
      const formData = new FormData()
      formData.append('photo', blob)

      try {
        const { data } = await upphoto(formData)
        this.$toast.success("更新成功")
        this.$emit('close')
        this.$emit("updatephoto", data.data.photo)
      } catch (err) {
        console.log(err);
        this.$toast.fail("更新失败")
      }
    }
  }

}
</script>
<style lang="less" scoped>
.photo-centent {
  background-color: #000;
  height: 100%;
}
.img {
  width: 100%;
}
.tobar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  .cancel,
  .confirm {
    color: #fff;
    width: 90px;
    height: 90px;
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
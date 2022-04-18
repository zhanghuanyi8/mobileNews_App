<template>
  <div>
    <van-picker title="性别"
                show-toolbar
                :columns="columns"
                @cancel="$emit('close')"
                @confirm="onConfirm" />
  </div>
</template>

<script>
import { updateUser } from "@/api/user"
export default {
  data () {
    return {
      columns: ['男', '女'],
    };
  },
  methods: {
    async onConfirm (value) {
      const xy = value == '男' ? 1 : 0

      try {
        const { data } = await updateUser({
          gender: xy
        })
        this.$emit('upgender', value)
        this.$emit('close')
      } catch (err) {
        this.$toast.fail('更改失败')
      }
    }


  },
};
</script>

<style>
</style>
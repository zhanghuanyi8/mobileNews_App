<template>
  <div>
    <van-datetime-picker v-model="currentDate"
                         type="date"
                         title="选择年月日"
                         :min-date="minDate"
                         :max-date="maxDate"
                         @cancel="$emit('close')"
                         @confirm="onfirm" />
  </div>
</template>

<script>
import { updateUser } from "@/api/user"
import dayjs from 'dayjs'
export default {

  props: {
    value: {
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value),

    };
  },
  methods: {
    async onfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true,
        duration: 0
      })
      try {
        const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
        const { data } = await updateUser({
          birthday: currentDate
        })
        console.log(data);
        this.$emit("input", currentDate)
        this.$toast.success('更新成功')
        this.$emit('close')
      } catch (err) {
        console.log(err);
      }
    }
  }

};
</script>

<style>
</style>
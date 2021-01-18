<template>
    <div>
        <button @click="isShowModal=true" >添加图片</button>
        <up-pic-2 :isShowModal="isShowModal"/>
    </div>
</template>

<script>
import UpPic2 from './UpPic2.vue'
export default {
  components: { UpPic2 },
  data () {
    return {
      isShowModal: false
    }
  }
}
</script>

<style lang="less" scoped>

</style>

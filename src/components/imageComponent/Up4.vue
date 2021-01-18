<template>
    <div class="pic-box">
        <img class="pic" :src="localBase64" alt="">
    </div>
</template>

<script>
import picHttpInstance from './../../http/picHttp'
export default {
  props: ['file'],
  data () {
    return {
      localBase64: ''
    }
  },
  async created () {
    //   上传前预览
    // 文件读取器
    let fileReader = new FileReader()
    // 用纯文本格式读取文件
    fileReader.readAsDataURL(this.file)
    // 加载文件
    fileReader.onload = (e) => {
      this.localBase64 = e.currentTarget.result
    }
    // 创建虚拟表单
    let form = new FormData()
    // 添加一个表单项，pic只能是一张图片，不认数组
    form.append('pic', this.file)
    const {data: res} = await picHttpInstance.upData(form)
    this.$emit('add', res)
  }
}
</script>

<style lang="less" scoped>
.pic-box{
    width: 100px;
    height: 100px;
    position: relative;
    .pic{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%)  translateY(-50%) ;
        max-width: 100px;
        max-height: 100px;
    }
}

</style>

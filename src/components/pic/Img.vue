<template>
    <div>
        <div class="boxpic">
        <img v-if="localBase64!==''" :src="localBase64" alt="">
        </div>
    </div>
</template>

<script>
export default {
  props: ['file'],
  data () {
    return {
      localBase64: ''
    }
  },
  created () {
    // 文件读取器
    let fileReader = new FileReader()
    // 用纯文本格式读取文件
    fileReader.readAsDataURL(this.file)
    // 加载文件
    fileReader.onload = (e) => {
      this.localBase64 = e.currentTarget.result
      console.log(e)
    }
  }

}
</script>

<style lang="less" scoped>
.boxpic{
  float: left;
  width: 300px;
  height: 200px;
  border: 1px solid #ccc;
  margin: 10px;
  img{
    width: 100%;
    height: 100%;
  }
}
</style>

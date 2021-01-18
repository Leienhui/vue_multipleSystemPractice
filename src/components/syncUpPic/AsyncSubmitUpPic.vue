<template>
    <div>
        <input type="file" name="pic" ref="box" multiple @change="filesChangeHandler">
        <button @click="submitInfo">提交</button>
        <div class="boxpic" v-if="isShow"><img :src="localBase64" alt=""></div>
        <!-- 开了静态，所以这里可以直接访问 -->
        <!-- <img v-if="isShow" :src="'http://127.0.0.1:3000/'+picName" alt=""> -->
    </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      picName: '',
      isShow: false,
      localBase64: ''
    }
  },
  methods: {
    async submitInfo () {
      // 创建虚拟表单
      let form = new FormData()
      let file = this.$refs.box.files[0]
      // 添加一个表单项，pic只能是一张图片，不认数组
      form.append('pic', file)
      const {data: res} = await axios.post('http://127.0.0.1:3000/upPic', form)
      // 上传后预览，得到的图片名称是上传后的名称
      // this.picName = res
      // this.isShow = true
      this.isShow = false
      console.log(res)
      console.log('上传成功')
    },
    filesChangeHandler (e) {
      this.isShow = true
      const file = this.$refs.box.files[0]
      // 文件读取器
      let fileReader = new FileReader()
      // 用纯文本格式读取文件
      fileReader.readAsDataURL(file)
      // 加载文件
      fileReader.onload = (e) => {
        this.localBase64 = e.currentTarget.result
        console.log(e)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.boxpic{
  width: 500px;
  height: 400px;
  img{
    width: 100%;
    height: 100%;
  }
}

</style>

<template>
    <div>
        <input type="file" name="pic" ref="box" multiple @change="filesChangeHandler">
        <button @click="submitInfo">提交</button>
          <Img v-for="(item,index) in filesArr" :key="index" :file="item"/>
    </div>
</template>

<script>
import axios from 'axios'
import Img from './Img.vue'
export default {
  data () {
    return {
      // picName: '',
      // 存储文件类型的file对象
      filesArr: []
    }
  },
  components: {
    Img
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
      console.log(res)
      this.filesArr = []
      console.log('上传成功')
    },
    filesChangeHandler (e) {
      this.isShow = true
      // 获取当前当前的文件
      const files = this.$refs.box.files
      // 将上传的图片与已经有的进行合并
      this.filesArr = [...this.filesArr, ...files]
    }
  }
}
</script>

<style lang="less" scoped>
</style>

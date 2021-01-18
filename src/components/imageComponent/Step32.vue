<template>
    <div style="overflow:hidden">
        <input type="file" hidden multiple ref="fileInput" @change="fileChangeHandler">
        <div class="up-box" v-for="(item,index) in files" :key="index">
            <Up4 :file="item" @add="upNumAndPic($event)"/>
        </div>
        <div>
          <p>将图片上传到文件夹:{{nowUpPicNum}}</p>
          <p>{{alreadyUpPicName}}-{{nowFolderName}}</p>
        <Select v-model="nowFolderName" style="width:200px">
        <Option v-for="(item,index) in folderName" :value="item" :key="index">{{ item }}</Option>
        </Select>
        </div>
        <vuedraggable v-model="chooseArr" @start="dragg=true" @end="dragg=false">
            <transition-group>
            <div v-for="item in chooseArr" :key="item" class="choose-img">
            <img :src="baseURL+item" alt="" >
            </div>
          </transition-group>
        </vuedraggable>
    </div>
</template>

<script>
import Up4 from './Up4'
import vuedraggable from 'vuedraggable'
import picHttpInstance from './../../http/picHttp'
export default {
  props: ['chooseArr'],
  created () {
    this.getFolderName()
  },
  // 上树之后，不能是created，因为created的时候还没有input框。
  mounted () {
    // 得到input框
    const fileInput = this.$refs.fileInput
    // 创建一个模拟点击。MouseEvents表示鼠标事件
    const e = document.createEvent('MouseEvents')
    // 初始化为点击事件
    e.initEvent('click', true, true)
    // 让这个框发出模拟点击
    fileInput.dispatchEvent(e)
  },
  data () {
    return {
      files: [],
      baseURL: 'http://127.0.0.1:3000/',
      dragg: false,
      folderName: [],
      nowFolderName: '',
      // 当前上传的图片数量
      nowUpPicNum: 0,
      alreadyUpPicName: []
    }
  },
  components: {
    Up4,
    vuedraggable
  },
  methods: {
    fileChangeHandler (e) {
      this.files = e.target.files
    },
    // 获得文件夹的名字
    async getFolderName () {
      let { data: res } = await picHttpInstance.getFolderName()
      this.folderName = res
    },
    // 上传的图片与名称
    upNumAndPic (upFileName) {
      this.nowUpPicNum++
      this.alreadyUpPicName.push(upFileName.base)
    }
  }
}
</script>

<style lang="less" scoped>
.up-box {
  width: 100px;
  height: 100px;
  float: left;
  border: 1px solid #ddd;
  margin: 0px 10px 10px 0;
}
.choose-img {
  width: 100px;
  height: 100px;
  float: left;
  border: 1px solid #ddd;
  margin: 0px 10px 10px 0;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>

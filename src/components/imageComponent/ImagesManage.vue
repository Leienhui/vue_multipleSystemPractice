<template>
  <div>
    <div v-if="nowOpen === '未分类图片'">
      <div v-for="item in folder" :key="item">
        <div class="grid" v-if="item !== '未分类图片'" @click="nowOpen = item">
          <img src="./../../../img/floder.png" alt="" />
          <p @click.stop=""><span>{{ item }}</span></p>
        </div>
      </div>
      <div class="grid" v-for="item in imagesArr" :key="item.title">
        <img :src="baseURL + item.fileName" alt="" />
        <p @click="modify(item)">{{ item.title }}</p>
      </div>
    </div>
    <div v-else>
        <div class="grid" v-for="item in imagesArr" :key="item.title">
          <img :src="baseURL + item.fileName" alt="" />
          <p @click="modify(item)">{{ item.title }}</p>
      </div>
          <button @click="nowOpen ='未分类图片'" >返回上一层</button>
    </div>
     <Modal
        v-model="isShowModel"
        title="修改文件名字"
        @on-ok="ok()"
        @on-cancel="cancel">
        <i-input v-model="title"/>
    </Modal>
  </div>
</template>

<script>
import picHttpInstance from './../../http/picHttp'
export default {
  props: ['folder'],
  created () {
    this.getSameFolderFileName()
  },
  data () {
    return {
      baseURL: 'http://127.0.0.1:3000/',
      nowOpen: '未分类图片',
      imagesArr: [],
      isShowModel: false,
      nowFileName: '',
      defeatTitle: '',
      title: ''
    }
  },
  methods: {
    // 获得对应文件夹中的图片
    async getSameFolderFileName () {
      let { data: res } = await picHttpInstance.getSameFolderFileName({directory: this.nowOpen})
      this.imagesArr = res
    },
    modify (item) {
      console.log(item)
      this.isShowModel = true
      this.nowFileName = item.fileName
      this.title = item.title
      this.defeatTitle = item.title
    },
    async ok () {
      await picHttpInstance.resetPicName({'title': this.title, filename: this.nowFileName})
      let { data: res } = await picHttpInstance.getSameFolderFileName({directory: this.nowOpen})
      this.imagesArr = res
    },
    cancel () {
      this.title = this.defeatTitle
    }
  },
  watch: {
    async nowOpen (v) {
      let { data: res } = await picHttpInstance.getSameFolderFileName({directory: v})
      this.imagesArr = res
    }
  }
}
</script>

<style lang="less" scoped>
.grid {
  width: 130px;
  height: 130px;
  float: left;
  position: relative;
  margin: 0 20px 40px 0;
  font-size: 13px;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 100%;
    height: 100%;

  }
  p {
    position: absolute;
    bottom: -25px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>

<template>
  <div class="app">
    <div v-if="!isShowCropPage">
      <div class="box" v-for="item in imagesArr" :key="item.title" @click="toCropPage(item.fileName)">
          <img
            :src="baseURL + item.fileName"
            alt=""
          />
      </div>
    </div>
    <div v-else>
        <CropPage :nowCropImage="nowCropImage" @success="success"/>
    </div>

  </div>
</template>

<script>
import picHttpInstance from './../../http/picHttp'
import CropPage from './CropPage.vue'
export default {
  props: ['folder'],
  created () {
    this.getSameFolderFileName()
  },
  data () {
    return {
      baseURL: 'http://127.0.0.1:3000/',
      imagesArr: [],
      isShowModel: false,
      nowFileName: '',
      defeatTitle: '',
      title: '',
      isShowCropPage: false,
      nowCropImage: ''
    }
  },
  components: {
    CropPage
  },
  methods: {
    async getSameFolderFileName () {
      let { data: res } = await picHttpInstance.getFilesData()
      this.imagesArr = res
    },
    toCropPage (fileName) {
      this.isShowCropPage = true
      this.nowCropImage = fileName
    },
    success () {
      this.isShowCropPage = false
      window.location.reload()
    }
  }
}
</script>

<style lang="less" scoped>
.app{
  width: 100%;
  height: 100%;
}
.box{
  width: 200px;
  height: 150px;
  margin: 10px;
  float: left;
  img{
   max-width: 200px;
   max-height: 150px;
  }
}

</style>

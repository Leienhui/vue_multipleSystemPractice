<template>
  <div class="box0">
    <div v-if="!isShowImagesManage">
    <div >
      <Button
        icon="md-arrow-round-up"
        type="primary"
        @click="$emit('toStepTwo', 2)"
        >没有图片，请点击这里</Button
      >
        <Button
        type="primary"
        @click="toImagesManage"
        >
        管理图片
        </Button
      >
    </div>
    <div class="box">
      <Row>
        <i-col :span="5">
          <ul>
            <li
              v-for="(item, index) in folder"
              :key="index"
              @click="nowOpen = item"
              :class="nowOpen === item ? 'cur' : ''"
            >
              {{ item }}
            </li>
          </ul>
        </i-col>
        <i-col :span="19">
          <div class="grid" v-for="(item, index) in imagesArr" :key="index">
            <Checkbox
              class="myCheckbox"
              @on-change="chooseNowPic($event, item.fileName)"
              :value="chooseArrP.includes(item.fileName)"
            ></Checkbox>
            <img :src="baseURL + item.fileName" alt="" />
          </div>
        </i-col>
      </Row>
    </div>
    </div>
    <ImagesManage v-if="isShowImagesManage" :folder="folder" />
  </div>
</template>

<script>
import ImagesManage from './ImagesManage'
import picHttpInstance from './../../http/picHttp'
export default {
  props: ['chooseArrP'],
  created () {
    this.getFilesData()
    this.getFolderName()
    this.getSameFolderFileName()
  },
  components: {
    ImagesManage

  },
  data () {
    return {
      imagesArr: [],
      baseURL: 'http://127.0.0.1:3000/',
      chooseArr: [],
      // 文件夹
      folder: [],
      nowOpen: '未分类图片',
      isShowImagesManage: false
    }
  },
  methods: {
    chooseNowPic (event, fileName) {
      if (event) {
        this.chooseArr.push(fileName)
      } else {
        this.chooseArr = this.chooseArr.filter((item) => item !== fileName)
      }
      this.$emit('chooseImg', this.chooseArr)
    },
    // 获得文件中的数据
    async getFilesData () {
      const { data: res } = await picHttpInstance.getFilesData()
      this.imagesArr = res
    },
    // 获得文件夹的名字
    async getFolderName () {
      let { data: res } = await picHttpInstance.getFolderName()
      this.folder = res
    },
    // 获得对应文件夹中的图片
    async getSameFolderFileName () {
      let { data: res } = await picHttpInstance.getSameFolderFileName({directory: this.nowOpen})
      this.imagesArr = res
    },
    toImagesManage () {
      this.isShowImagesManage = true
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
.box0{
  float: left;
}
.box {
  overflow: hidden;
  overflow-y: scroll;
  .grid {
    width: 140px;
    height: 140px;
    text-align: center;
    margin: 20px;
    padding: 20px;
    position: relative;
    float: left;
    border: 1px solid #ccc;

    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      max-width: 140px;
      max-height: 140px;
    }
    .myCheckbox {
      top: -2px;
      right: 0;
      position: absolute;
    }
    p {
      font-size: 12px;
      position: absolute;
      bottom: 0;
      text-align: center;
    }
  }
  ul {
    list-style: none;
    li {
      cursor: pointer;
      position: relative;
      padding-left: 24px;
      &.cur {
        color: red;
      }
      &::before {
        width: 18px;
        height: 18px;
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        background-image: url('./../../../img/close.png');
        background-size: 100% 100%;
      }
      &.cur::before {
        background-image: url('./../../../img/open.png');
      }
    }
  }
}
</style>

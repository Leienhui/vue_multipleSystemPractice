<template>
  <div>
    <Modal :value="isShowModal" :mask-closable="false">
      <div slot="header">1</div>
      <div slot="footer">
        <div v-if="step === 1">
          <Button>取消</Button>
          <Button type="primary" @click="toStep2ShowImg">确认</Button>
        </div>
        <div v-if="step === 2">
          <Button @click="step =1">返回</Button>
          <Button type="primary" @click="addFilesToFloder">确认</Button>
        </div>
      </div>
      <div>
        <step-31 v-if="step === 1" @toStepTwo="step = $event" @chooseImg="chooseArr=$event" :chooseArrP="chooseArr"/>
        <step-32 v-if="step === 2" ref="step32" :chooseArr="chooseArr"/>
      </div>
      <div>
      </div>
    </Modal>
  </div>
</template>

<script>
import Step31 from './Step31.vue'
import Step32 from './Step32.vue'
import picHttpInstance from './../../http/picHttp'
export default {
  props: ['isShowModal'],
  created () {
  },
  data () {
    return {
      // 步骤  1：表示查看媒体库  2：表示上传图片
      step: 1,
      chooseArr: []

    }
  },
  components: {
    Step31,
    Step32
  },
  methods: {
    toStep2ShowImg () {
      this.step = 2
    },
    // 添加文件到文件夹
    async addFilesToFloder () {
      this.step = 1
      const {data: res} = await picHttpInstance.addFilesToFloder({'directory': this.$refs.step32.nowFolderName, 'filenamearr': this.$refs.step32.alreadyUpPicName})
      console.log(res)
    }
  }
}
</script>
<style lang="less" scoped>
</style>

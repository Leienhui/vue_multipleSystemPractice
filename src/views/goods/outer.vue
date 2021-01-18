<template>
    <div>
    <Button type="primary" @click="modal1 = true">Display dialog box</Button>
    <Modal
        v-model="modal1"
        title="Common Modal dialog box title"
        @on-ok="ok"
        @on-cancel="cancel">
        <inner :obj="obj" ref="inner"/>
    </Modal>
        <p>{{obj}}</p>
    </div>
</template>

<script>
import inner from './inner'
export default {
  components: {
    inner
  },
  data () {
    return {
      obj: {a: 20, b: 30},
      modal1: false
    }
  },
  methods: {
    ok (e) {
      this.obj.a = this.$refs.inner.objClone.a
    //   注意，这里不能直接将this.obj=this.$refs.inner.objClone,如果这样无论点击什么结果都是修改，那么深克隆就没用了
    },
    cancel () {
    }

  }

}

</script>

<style lang="less" scoped>

</style>

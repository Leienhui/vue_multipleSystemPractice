<template>
    <div>
        <p>{{factoryArr}}</p>
        <Row :gutter="16">
            <i-col :span="4">
                <img class="myImg" :src="'http://www.aiqianduan.com:56506/images/productpics/'+nowItem.pic" alt="">
            </i-col>
            <i-col :span="20">
                <div v-for="(item,index) in factoryArr" :key="index">
                    <span>{{item.factory_name}}工厂:</span>
                    <i-input type="number" v-model.number="item.count"/>
                </div>
            </i-col>
        </Row>

    </div>
</template>

<script>
import * as _ from 'lodash'
export default {
  props: ['nowItem'],
  data () {
    return {
      // 工厂的数据
      factoryArr: []

    }
  },
  computed: {
    shipList () {
      return this.$store.state.productStore.shipList
    }
  },
  created () {
    //   读取store，看是否有同名
    let arr = this.shipList.filter(item => item.name === this.nowItem.name)
    if (arr.length === 0) {
      this.factoryArr = this.nowItem.factory.map((item) => {
        return {factory_name: item, count: 0}
      })
    } else {
      // 进行深克隆，否则点击取消无法成功
      for (let i = 0; i < arr.length; i++) {
        this.factoryArr = _.cloneDeep(arr[i].factory)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.myImg{
width: 100%;
height: 100%;
}

</style>

<template>
  <div>
    <Tabs value="name">
      <TabPane v-for="(v, k) in products" :key="k" :label="k" :name="k">
        <Row :gutter="16">
          <i-col  v-for="(item, index) in v" :key="index" >
            <Badge
              style="margin: 0 20px 20px 0; float: left; height: 260px"
              :count="calcFactoryCount(item.name)"
            >
              <Card>
                <p class="img" @click="clickCardHandler(item)">
                  <img
                    :src="'http://www.aiqianduan.com:56506/images/productpics/'+ item.pic"
                    alt=""
                  />
                </p>
                <p class="text">{{ item.name }}</p>
              </Card>
            </Badge>
          </i-col>
        </Row>
      </TabPane>
    </Tabs>
    <Modal v-model="isShowModel" title="进货" :mask-closable="false" @on-cancel="cancelModelHandler">
      <span>进货单价:</span>
      <Inner v-if="isShowModel" :nowItem="nowItem" ref="inner"/>
              <!-- 插槽 -->
        <div slot="footer" class="btn">
            <Button @click="cancelModelHandler">取消</Button>
            <Button type="primary" @click="okModelHandler">确认</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
import Inner from './InputMedol'
export default {
  components: { Inner },
  created () {
    this.getProduct()
  },
  data () {
    return {
      isShowModel: false,
      // 记录当前点击的是哪个
      nowItem: {}
    }
  },
  computed: {
    products () {
      return this.$store.state.productStore.products
    },
    shipList () {
      return this.$store.state.productStore.shipList
    }
  },
  methods: {
    getProduct () {
      this.$store.dispatch('productStore/GETPRODUCTASYNC')
    },
    clickCardHandler (e) {
      this.isShowModel = true
      this.nowItem = e
    },
    okModelHandler () {
      this.isShowModel = false
      let factoryArr = this.$refs.inner.factoryArr
      this.$store.dispatch('productStore/CHANGFACTORYARRDATAASYNC', {factoryArr, productName: this.nowItem.name})
      console.log(factoryArr)
    },
    cancelModelHandler () {
      this.isShowModel = false
      this.$Message.info('Clicked cancel')
    },
    goodsInfo (e) {
      this.modal1 = true
      this.$store.commit('productStore/GOODSINFO', e)
    },
    calcFactoryCount (name) {
      // 过滤shipList中有name的每一项数据item.name===e.name
      let arr = this.shipList.filter(item => item.name === name)
      if (arr.length !== 0) {
        for (let i = 0; i < arr.length; i++) {
          let sum = 0
          let factoryObj = arr[i].factory
          for (let j = 0; j < factoryObj.length; j++) {
            sum += factoryObj[j].count
          }
          return sum
        }
      }
      return 0
    }
  }
}
</script>

<style lang="less" scoped>
.text {
  width: 180px;
  text-align: center;
}
p {
  margin-bottom: 10px;
}
.btn{
    margin-top: 10px;
}
</style>

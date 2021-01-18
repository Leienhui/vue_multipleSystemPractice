import productHttpInstance from './../http/productHttp'
export default{
  // 表示可以被拆分
  //   命名控件，在组件中使用它的state就是$store.state.productStore.XX
  namespaced: true,
  state: {
    products: {},
    shipList: [
      {
        'name': '每日坚果',
        'factory': [
          { 'factory_name': 'A', 'count': 8 }
        ]
      },
      {
        'name': '混合果仁小包装零食大礼包送礼',
        'factory': [
          { 'factory_name': 'B', 'count': 3 },
          { 'factory_name': 'C', 'count': 43 },
          { 'factory_name': 'F', 'count': 5 },
          { 'factory_name': 'G', 'count': 2 }
        ]
      }
    ]
  },
  mutations: {
    GETPRODUCT (state, res) {
      state.products = res.products
    },
    // 向shipList添加一项
    ADD (state, {factoryArr, productName}) {
      state.shipList.push({
        name: productName,
        factory: factoryArr
      })
    },
    MODIFY (state, {factoryArr, productName}) {
      console.log(factoryArr)
      state.shipList.map((item) => {
        if (item.name === productName) {
          item.name = productName
          item.factory = factoryArr
        }
      })
    }
  },
  actions: {
    async GETPRODUCTASYNC ({commit}) {
      const {data: res} = await productHttpInstance.getProductData()
      commit('GETPRODUCT', res)
    },
    CHANGFACTORYARRDATAASYNC ({commit, state}, res) {
      // 判断名字相同的shipList中有没有
      let arr = state.shipList.filter(item => item.name === res.productName)
      if (arr.length !== 0) {
        commit('MODIFY', res)
      } else {
        commit('ADD', res)
      }
    },
    async SUBMITINFO (fileName) {
      let req = await productHttpInstance.submitInfo(fileName)
      console.log(req)
    }

  }

}

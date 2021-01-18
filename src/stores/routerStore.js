// import axios from 'axios'
export default{
  // 表示可以被拆分
//   命名控件，在组件中使用它的state就是$store.state.routerStore.XX
  namespaced: true,
  state: {
    belong: '',
    belongChinese: '',
    selfChinese: ''
  },
  mutations: {
    CHANGEBELONG (state, payloads) {
      state.belong = payloads.metaInfo.belong
      state.belongChinese = payloads.metaInfo.belongChinese
      state.selfChinese = payloads.metaInfo.selfChinese
    }
  },
  actions: {}

}

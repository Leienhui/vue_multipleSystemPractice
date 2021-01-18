// import axios from 'axios'
import routerStore from './routerStore'
import carStore from './carStore'
import productStore from './productStore'
export default{
  // 导入别的store
  modules: {
    // 管理路由的store
    routerStore,
    // 管理车辆数据的store
    carStore,
    productStore
  }

}

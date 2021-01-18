import axios from 'axios'
const carHttpInstance = axios.create({
  baseURL: 'http://www.aiqianduan.com:56506/',
  timeout: 1000
})
// 具体的请求要封装到这里
export default {
  // 加载汽车信息
  loadCarInfo ({params}) {
  // 返回的promise数据可以被async与 await监控
    return carHttpInstance.get('/cars', {params: params})
  },
  // 获得车系
  getCarSeries () {
    return carHttpInstance.get('/allbs')
  }
}

import axios from 'axios'
const pcasHttpInstance = axios.create({
  baseURL: 'http://www.aiqianduan.com:56506/',
  timeout: 1000
})
// 具体的请求要封装到这里
export default {
  getAllAddressInfo () {
    return pcasHttpInstance.get('/pcas')
  }
}

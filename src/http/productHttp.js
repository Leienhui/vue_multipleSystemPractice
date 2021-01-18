import axios from 'axios'
const productHttpInstance = axios.create({
  baseURL: 'http://www.aiqianduan.com:56506/',
  timeout: 1000
})
const submitHttpInstance = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 1000
})
// 具体的请求要封装到这里
export default {
  getProductData () {
    return productHttpInstance.get('/product')
  },
  submitInfo (fileName) {
    return submitHttpInstance.post('/upPic', fileName)
  }
}

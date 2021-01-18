import axios from 'axios'
const picHttpInstance = axios.create({
  baseURL: '/api/',
  timeout: 1000
})
// 具体的请求要封装到这里
export default {
  getSameFolderFileName (params) {
    return picHttpInstance.get('/folderPic', {params})
  },
  resetPicName (params) {
    return picHttpInstance.post('/resetPicName', {params})
  },
  // 获得文件中的数据
  getFilesData () {
    return picHttpInstance.get('/getdb')
  },
  // 获得文件夹的名字
  getFolderName () {
    return picHttpInstance.get('/folderName')
  },
  //   上传表单（图片）
  upData (params) {
    return picHttpInstance.post('/up', params)
  },
  // 添加文件到文件夹
  addFilesToFloder (params) {
    return picHttpInstance.post('/addToDb', params)
  },
  //   切割图片的数据
  cutPic (params) {
    return picHttpInstance.get('/cutPic', {params})
  }
}

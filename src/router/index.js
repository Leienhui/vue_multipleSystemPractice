const BuyCar = () => import('./../views/car/BuyCar.vue')
const SaleCar = () => import('./../views/car/SaleCar.vue')
const Shipments = () => import('./../views/goods/Shipments.vue')
const CheckboxBar = () => import('./../views/car/CheckboxBar.vue')
const Product = () => import('./../views/goods/Product.vue')
const UpPic = () => import('./../components/pic/UpPic.vue')
const outer = () => import('./../views/goods/outer.vue')
const SubmitPicSync = () => import('./../components/syncUpPic/SubmitPicSync.vue')
const SubmitPicAsync = () => import('./../components/syncUpPic/AsyncSubmitUpPic.vue')
const AddNewPic = () => import('./../components/imageComponent/AddNew1.vue')
const CropImage = () => import('./../components/cropImage/CropImage.vue')
const Compare = () => import('./../views/car/Compare.vue')

export default{
  routes: [
    {
      path: '/compare',
      components: Compare,
      meta: {
        belong: 'compare',
        // 面包屑导航上的信息
        belongChinese: '车辆对比',
        selfChinese: '车辆对比'
      }
    },
    {
      path: '/buycar',
      // 多个组件必须在组件中引用的时候指定name
      components: {BuyCar, CheckboxBar},
      // meta是额外信息
      meta: {
        belong: 'car',
        // 面包屑导航上的信息
        belongChinese: '汽车买卖',
        selfChinese: '买车'
      }
    },
    {
      path: '/salecar',
      component: SaleCar,
      // meta是额外信息
      meta: {
        belong: 'car',
        // 面包屑导航上的信息
        belongChinese: '汽车买卖',
        selfChinese: '卖车'
      }
    },
    {
      path: '/shipments',
      component: Shipments,
      // meta是额外信息
      meta: {
        belong: 'goods',
        // 面包屑导航上的信息
        belongChinese: '货物管理',
        selfChinese: '发货'
      }
    },
    {
      path: '/product',
      component: Product,
      // meta是额外信息
      meta: {
        belong: 'goods',
        // 面包屑导航上的信息
        belongChinese: '货物管理',
        selfChinese: '商品选购'
      }
    },
    {
      path: '/upPic',
      component: UpPic,
      // meta是额外信息
      meta: {
        belong: 'goods',
        // 面包屑导航上的信息
        belongChinese: '添加商品',
        selfChinese: '上传图片信息'
      }
    },
    {
      path: '/addNewPic',
      component: AddNewPic,
      // meta是额外信息
      meta: {
        belong: 'goods',
        // 面包屑导航上的信息
        belongChinese: '新添加商品',
        selfChinese: '上传图片信息'
      }
    },
    {
      path: '/outer',
      // 多个组件必须在组件中引用的时候指定name
      component: outer
    },
    {
      path: '/syncUpPic',
      // 多个组件必须在组件中引用的时候指定name
      component: SubmitPicSync
    },
    {
      path: '/asyncUpPic',
      // 多个组件必须在组件中引用的时候指定name
      component: SubmitPicAsync
    },
    {
      path: '/cropPic',
      component: CropImage,
      // meta是额外信息
      meta: {
        belong: 'cropPic',
        // 面包屑导航上的信息
        belongChinese: '图片裁剪',
        selfChinese: '图片裁剪'
      }
    }
  ]
}

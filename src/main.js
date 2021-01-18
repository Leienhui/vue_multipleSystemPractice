// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ViewDesign from 'view-design'
import Vuex from 'vuex'
import axios from 'axios'
import VueRouter from 'vue-router'
import App from './App.vue'
import storeConfig from './stores/store.js'
import routerConfig from './router/index.js'
import PCAS from './components/pcas/PCAS.vue'
Vue.use(ViewDesign)
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.prototype.$http = axios
const router = new VueRouter(routerConfig)
const store = new Vuex.Store(storeConfig)
// 全局后置钩子，可以注册全局后置钩子，然而和守卫不同的是，这些钩子不会接受 next 函数也不会改变导航本身：
router.afterEach((to) => {
  // 现在能显示组件数据变化了，没有起到守卫的作用
  // 通过vuex就能通知组件路由改变了,多的‘/’就是被差分了有命名空间
  store.commit('routerStore/CHANGEBELONG', {'metaInfo': to.meta})
})
/* eslint-disable no-new */

// 这里的组件是通用组件(通用组件，组件内部不能使用Vuex)
Vue.component('PCAS', PCAS)
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

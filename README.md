# 小知识
## 组件要获得外部事件的更改
* 用生命周期去监控
* 路由守卫
## 定义全局组件的方法（通用组件）
```
<!-- 在main.js中的Vue实例上 -->
new Vue({
  el: '#app',
  router,
  store,
  // 这里的组件是通用组件
  components: { App },
  template: '<App/>'
})



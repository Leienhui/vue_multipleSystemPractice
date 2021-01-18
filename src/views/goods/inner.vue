<template>
    <div>
        <i-input type="text" v-model="objClone.a"/>
    </div>
</template>

<script>
// 导入lodash这个库
// 将loadash种的所有的数据取出来添加一个命名空间_
import * as _ from 'lodash'
export default {
  props: ['obj'],
  created () {
    //   在这里进行深克隆,实现模态框点击取消按钮不修改数据的功能
    this.objClone = _.cloneDeep(this.obj)
  }
}
</script>

<style lang="less" scoped>

</style>

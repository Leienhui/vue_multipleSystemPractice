<template>
  <div>
        <Dropdown trigger="click">
        <div>

          <span v-if="checkedTowm===''">请选择区/镇<Icon type="ios-arrow-down"></Icon></span>
          <span v-else>{{checkedTowm}}</span>
        </div>
        <DropdownMenu slot="list">
           <ul>
             <li v-for="(k,v) in town" :key="v" @click="$emit('doneTown',v)">{{v}}</li>
           </ul>
        </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
export default {
  props: ['town', 'checkedTowm']
}
</script>

<style lang="less" scoped>
span{
  margin-right: 20px;
  border: 1px solid #ccc;
}
ul{
  list-style: none;
  height: 300px;
  overflow-y: scroll;
  li{
    cursor: pointer;
    padding-left: 10px;
  }
}

</style>

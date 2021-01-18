<template>
  <div>
        <Dropdown trigger="click">
        <div>

          <span v-if="checkedCity===''">请选择城市<Icon type="ios-arrow-down"></Icon></span>
          <span v-else>{{checkedCity}}</span>
        </div>
        <DropdownMenu slot="list">
           <ul>
             <li v-for="(k,v) in cities" :key="v" @click="$emit('doneCity',v)">{{v}}</li>
           </ul>
        </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
export default {
  props: ['cities', 'checkedCity']
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

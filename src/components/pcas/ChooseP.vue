<template>
  <div>
        <Dropdown trigger="click">
        <div>

          <span v-if="checkedProvince===''">请选择省份<Icon type="ios-arrow-down"></Icon></span>
          <span v-else>{{checkedProvince}}</span>
        </div>
        <DropdownMenu slot="list">
           <ul>
             <li v-for="(k,v) in province" :key="v" @click="$emit('doneProvince',v)">{{v}}</li>
           </ul>
        </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
export default {
  props: ['province', 'checkedProvince']
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

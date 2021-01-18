<template>
  <div>
        <Dropdown trigger="click">
        <div>
          <span v-if="checkedCountryside===''">请选择街道/乡/村<Icon type="ios-arrow-down"></Icon></span>
          <span v-else>{{checkedCountryside}}</span>
        </div>
        <DropdownMenu slot="list">
           <ul>
             <li v-for="(k,v) in countryside" :key="v" @click="$emit('doneCountryside',k)" >{{k}}</li>
           </ul>
        </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
export default {
  props: ['countryside', 'checkedCountryside']
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
  li{
    cursor: pointer;
    padding-left: 10px;
  }
}

</style>

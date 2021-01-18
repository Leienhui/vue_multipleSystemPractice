<template>
    <div>
        <div class="carInfo" v-for="item in nowCompareCars" :key="item">
              <img :src="`http://aiqianduan.com:56506/images/carimages_small/${item.id}/view/${item.img}`" alt="">
        </div>
    </div>
</template>

<script>
export default {
  props: ['nowCompareCars']
}
</script>

<style lang="less" scoped>

</style>

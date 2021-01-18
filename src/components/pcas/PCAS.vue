<template>
  <div>
    <p ><ChooseP :province="allAddressInfo" :checkedProvince="checkedProvince"  @doneProvince="checkedProvinceHandler($event)"/></p>
    <p><ChooseC :cities="allAddressInfo[checkedProvince]" v-if="checkedProvince!==''"   :checkedCity="checkedCity"  @doneCity="checkedCityHandler($event)" /></p>
    <p><ChooseA :town="allAddressInfo[checkedProvince][checkedCity]" v-if="checkedCity!==''" :checkedTowm="checkedTowm" @doneTown="checkedTowmHandler($event)"/></p>
    <p><ChooseS :countryside="allAddressInfo[checkedProvince][checkedCity][checkedTowm]" v-if="checkedTowm!==''" :checkedCountryside="checkedCountryside" @doneCountryside="checkedCountrysideHandler($event)"/></p>
  </div>
</template>

<script>
import pcasHttpInstance from './../../http/pcasHttp'
import ChooseP from './ChooseP'
import ChooseC from './ChooseC'
import ChooseA from './ChooseA'
import ChooseS from './ChooseS'
export default {
  created () {
    this.getAllAddressInfo()
  },
  data () {
    return {
      allAddressInfo: {},
      checkedProvince: '',
      checkedCity: '',
      checkedTowm: '',
      checkedCountryside: ''
    }
  },
  components: {
    ChooseP,
    ChooseC,
    ChooseA,
    ChooseS
  },
  methods: {
    async getAllAddressInfo () {
      const {data: res} = await pcasHttpInstance.getAllAddressInfo()
      this.allAddressInfo = res
    },
    checkedProvinceHandler (province) {
      if (this.checkedProvince === '') {
        this.checkedProvince = province
      } else {
        this.checkedProvince = ''
        this.checkedCity = ''
        this.checkedTowm = ''
        this.checkedCountryside = ''
      }
    },
    checkedCityHandler (city) {
      if (this.checkedCity === '') {
        this.checkedCity = city
      } else {
        this.checkedCity = ''
        this.checkedTowm = ''
        this.checkedCountryside = ''
      }
    },
    checkedTowmHandler (town) {
      if (this.checkedTowm === '') {
        this.checkedTowm = town
      } else {
        this.checkedTowm = ''
        this.checkedCountryside = ''
      }
    },
    checkedCountrysideHandler (countryside) {
      this.checkedCountryside = countryside
    }
  }
}
</script>

<style lang="less" scoped>
p{
float: left;
}
</style>

<template>
  <div class="shaixuan">
    <div>
      车系类别：
      <Tabs value="name" type="card" @on-click="getCarsSeries">
        <TabPane
          :name="item"
          v-for="(item, index) in tabLabel"
          :key="index"
          :label="item"
        >
          <span>品牌：</span>
          <Button
            v-for="(item, index) in carsType"
            :key="index"
            class="btn"
            @click="getOneCarsBrand(item)"
          >
            {{ item }}</Button
          >
          <!-- <Row :gutter="16" class="row">
            <i-col :span="2">车系：<span v-if="isShow === false">不限</span
            ></i-col>
            <i-col>
              <CheckboxGroup
              class="span"
              v-if="isShow === true"
              @on-change="checkboxGroupChangeHandler('series', $event)"
              :value="$store.state.carStore.checkedSeries"
              >
                <Checkbox
                :label="item"
                v-for="(item, index) in carSeriesList"
                :key="index"
                />
              </CheckboxGroup>
            </i-col>
          </Row> -->
          <p class="series">
            车系：<span v-if="isShow === false">不限</span
            ><Button
              class="span"
              v-else
              v-for="(item, index) in carSeriesList"
              :key="index"
              @click="getOneCarsSeries(item)"
              >{{ item }}</Button
            >
          </p>
        </TabPane>
      </Tabs>
    </div>
    <Row :gutter="16" class="row">
      <i-col :span="2">颜色：</i-col>
      <i-col>
        <CheckboxGroup
          @on-change="checkboxGroupChangeHandler('color', $event)"
          :value="$store.state.carStore.checkedColor"
        >
          <Checkbox
            v-for="(item, index) in $store.state.carStore.colorArr"
            :key="index"
            :label="item"
          />
        </CheckboxGroup>
      </i-col>
    </Row>
    <Row :gutter="16" class="row">
      <i-col :span="2">品牌</i-col>
      <i-col>
        <CheckboxGroup
          @on-change="checkboxGroupChangeHandler('brand', $event)"
          :value="$store.state.carStore.checkedBrand"
        >
          <Checkbox
            v-for="(item, index) in $store.state.carStore.brandArr"
            :key="index"
            :label="item"
          />
        </CheckboxGroup>
      </i-col>
    </Row>
    <Row :gutter="16" class="row">
      <i-col :span="2">尾气：</i-col>
      <i-col>
        <CheckboxGroup
          @on-change="checkboxGroupChangeHandler('exhaust', $event)"
          :value="$store.state.carStore.checkedExhaust"
        >
          <Checkbox
            v-for="(item, index) in $store.state.carStore.exhaustArr"
            :key="index"
            :label="item"
          />
        </CheckboxGroup>
      </i-col>
    </Row>
    <Row :gutter="16" class="row">
      <i-col :span="2">燃料：</i-col>
      <i-col>
        <CheckboxGroup
          @on-change="checkboxGroupChangeHandler('fuel', $event)"
          :value="$store.state.carStore.checkedFuel"
        >
          <Checkbox
            v-for="(item, index) in $store.state.carStore.fuelArr"
            :key="index"
            :label="item"
          />
        </CheckboxGroup>
      </i-col>
    </Row>
    <Row class="row">
      <i-col :span="2">价格:</i-col>
      <i-col :span="20">
        <Slider
          v-model="$store.state.carStore.checkPrice"
          range
          :marks="marks1"
          :min="min1"
          :max="max1"
          @on-change="checkboxGroupChangeHandler('price', $event)"
        />
      </i-col>
    </Row>
    <Row class="row">
      <i-col :span="2">公里数:</i-col>
      <i-col :span="20">
        <Slider
          v-model="$store.state.carStore.checkedKm"
          range
          :min="min2"
          :max="max2"
          :marks="marks2"
          @on-change="checkboxGroupChangeHandler('km', $event)"
        />
      </i-col>
    </Row>
    <Row class="row">
      <i-col :span="2">购买日期:</i-col>
      <i-col :span="20">
        <DatePicker
          type="daterange"
          placeholder="选择日期"
          style="width: 400px"
          @on-change="checkboxGroupChangeHandler('buydate', $event)"
        ></DatePicker>
      </i-col>
    </Row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShow: false,
      min1: 0,
      max1: 120,
      marks1: {
        0: '0',
        30: '30',
        60: '60',
        90: '90',
        120: '120'
      },
      min2: 1000,
      max2: 2000000,
      marks2: {
        1000: '1000',
        500000: '500000',
        1200000: '1200000',
        2000000: '2000000'
      },
      tabLabel: [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z'
      ]
    }
  },
  methods: {
    // 复选框数据获取
    checkboxGroupChangeHandler (k, v) {
      console.log(v)
      console.log(111)
      if (k === 'brand' && v.length === 0) {
        this.isShow = false
      }
      this.$store.dispatch('carStore/CHECKBOXGROUPCHANGEHANDLERASYC', { k, v })
    },
    // 改变车系
    getCarsSeries (carsType) {
      this.isShow = false
      this.$store.dispatch('carStore/GETCARSSERIESASYNC', carsType)
    },
    // 获得品牌
    getOneCarsBrand (brand) {
      console.log(brand)
      let brand1 = []
      this.isShow = true
      brand1.push(brand)
      this.$store.commit('carStore/GETONECARSERES', brand)
      this.checkboxGroupChangeHandler('brand', brand1)
    },
    // 获得一类车的车系
    getOneCarsSeries (series) {
      console.log(series)
      let series1 = []
      this.isShow = true
      series1.push(series)
      this.$store.commit('carStore/GETONECARSERES', series)
      this.checkboxGroupChangeHandler('series', series1)
    }
  },
  computed: {
    carsType () {
      return this.$store.state.carStore.carsType
    },
    // 真正的车系列表
    carSeriesList () {
      return this.$store.state.carStore.carSeriesList
    }
  }
}
</script>

<style lang="less" scoped>
.shaixuan {
  padding-bottom: 30px;
}
.row {
  margin-top: 15px;
}
.btn {
  margin-right: 10px;
}
.span {
  margin-right: 20px;
}
.series {
  margin-top: 20px;
}
</style>

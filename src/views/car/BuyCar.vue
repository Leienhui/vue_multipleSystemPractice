<template>
    <div>
        <Table :columns="columns" :data="this.$store.state.carStore.carsList" @on-select="selectHandler"></Table>
         <Page :total="this.$store.state.carStore.total" :current="this.$store.state.carStore.queryParams.page"  :page-size="this.$store.state.carStore.queryParams.pagesize" :page-size-opts="[2,5,10,15,20]" show-elevator show-sizer show-total @on-change="changePageNum" @on-page-size-change="changePageSize"/>
        <div class="compare" @click="isShowDrawer=true">对比{{nowCompareCars.length}}量车</div>
        <Drawer title="对比车辆" :closable="false" v-model="isShowDrawer">
          <Row>
            <i-col v-for="item in nowCompareCars" :key="item">
              <div class="comparePic">
              <img :src="`http://aiqianduan.com:56506/images/carimages_small/${item.id}/view/${item.img}`" alt="">
              <p class="cha">X</p>
              </div>
            </i-col>
              <button :disabled="nowCompareCars.length===1"  @click="toComparePage(nowCompareCars)">对比他们</button>
              <button @click="$store.commit('carStore/CLEARCOMPAREDCARS')">清空他们</button>
          </Row>
        <button @click="isShowDrawer=false" style="bottom:30%;right:10px;position:absolute;">关闭</button>
    </Drawer>
    </div>
</template>

<script>
export default {
  created () {
    //   1、
    //   注意：这个是有拆分的vuex方法的调用
    this.$store.dispatch('carStore/GETCARSLISTASYNC')
  },
  data () {
    const self = this
    return {
      isShowCompare: false,
      isShowDrawer: false,
      columns: [
        {
          width: 30,
          title: '对比',
          align: 'center',
          render (h, rowData) {
            // h函数返回的是一个虚拟do'm
            return h('div', [h('Checkbox', {
              attrs: {
                // value的值用于保证换页回来的时候勾上的数据还是勾上的
                value: self.nowCompareCars.filter(item => item.id === rowData.row.id).length !== 0,
                // 当选中4项后不允许继续勾选，但是选中的可以去掉勾
                disabled: self.nowCompareCars.length >= 4 && self.nowCompareCars.filter(item => item.id === rowData.row.id).length === 0
              },
              // 监听
              on: {
                'on-change': (e) => {
                  if (e) { self.$store.commit('carStore/ADDCOMPAREDCARS', rowData.row) } else {
                    self.$store.commit('carStore/DELETECOMPAREDCARS', rowData.row)
                  }
                }
              }
            })])
          }
        },
        {
          title: '图片',
          key: 'img',
          render (h, rowData) {
            // h函数返回的是一个虚拟do
            return h('img', {
              attrs: {
                src: `http://aiqianduan.com:56506/images/carimages_small/${rowData.row.id}/view/${rowData.row.img}`,
                width: 100 + '%'
              }
            })
          }

        },
        {
          title: '编号',
          key: 'id'
        },
        {
          title: '品牌',
          key: 'brand'
        },
        {
          title: '售价',
          key: 'price'
        },
        {
          title: '车系',
          key: 'series'
        },
        {
          title: '颜色',
          key: 'color'
        },
        {
          title: '排量',
          key: 'engine'
        },
        {
          title: '尾气',
          key: 'exhaust'
        },
        {
          title: '燃料',
          key: 'fuel'
        },
        {
          title: '公里数',
          key: 'km'
        },
        {
          title: '购买日期',
          render (h, rowData) {
            let time = new Date(rowData.row.buydate)
            let y = time.getFullYear()
            let m = (time.getMonth() + 1).toString().padStart(2, '0')
            let d = time.getDate().toString().padStart(2, '0')
            return h('div', `${y}-${m}-${d}`)
          }
        }
      ]

    }
  },
  methods: {
    //   改变页码
    changePageNum (pagenum) {
      this.$store.dispatch('carStore/CHANGEPAGENUMASYNC', pagenum)
    },
    // 改变每页显示数量
    changePageSize (pagesize) {
      console.log(pagesize)
      this.$store.dispatch('carStore/CHANGEPAGESIZEASYNC', pagesize)
    },
    selectHandler (e) {
      console.log(e)
    },
    toComparePage (nowCompareCars) {
      if (this.nowCompareCars.length > 1) {
      }
    }
  },
  computed: {
    nowCompareCars () {
      return this.$store.state.carStore.nowCompareCars
    }
  }
}
</script>

<style lang="less" scoped>
.compare{
  position: absolute;
  width: 100px;
  height: 40px;
  background-color: rgb(51, 73, 99);
  top: 460px;
  right: 0;
  border-radius: 10px;
  opacity: 0.8;
  color: red;

}
.comparePic{
  width: 100%;
  height: 100%;
  position: relative;
  .cha{
    width: 20px;
    height: 16px;
    position: absolute;
    top: -10px;
    right: 60px;
    text-align: center;
  }
}
</style>

import carHttp from './../http/carHttp'
export default{
  namespaced: true,
  state: {
    carsList: [],
    total: 0,
    colorArr: ['红', '橙', '黄', '绿', '青', '蓝', '紫', '灰', '黑', '白'],
    brandArr: ['大众', '奥迪', '宝马', '奔驰', '标志', '丰田', '雪佛兰', '路虎', '日产', '五菱', '特斯拉', 'MINI'],
    exhaustArr: ['国一', '国二', '国三', '国四', '国五', '国六'],
    fuelArr: ['油电混合', '汽油', '柴油', '纯电动'],
    checkedColor: [],
    checkedBrand: [],
    checkedExhaust: [],
    checkedFuel: [],
    checkPrice: [0, 120],
    checkedTime: [''],
    checkedKm: [1000, 2000000],
    buydate: '',
    queryParams: {
      page: 1,
      pagesize: 5
    },
    // 获得所有车系信息
    getCarsSeriesInfo: {},
    // 当前类型
    nowCarType: '',
    // 车类型
    carsType: [],
    // 车系列表
    carSeriesList: [],
    // 被选中的车系
    checkedSeries: [''],
    nowCompareCars: []
  },
  mutations: {
    //   3、
    UPDATECARSLIST (state, res) {
      state.carsList = res.results
      state.total = res.total
      for (let k in state.queryParams) {
        if (k === '') {
          delete state.queryParams[k]
        }
      }
    },
    // 更新页码
    CHANGEPAGENUM (state, pagenum) {
      state.queryParams.page = pagenum
    },
    // 更新每页条数
    CHANGEPAGESIZE (state, pagesize) {
      state.queryParams.pagesize = pagesize
      state.queryParams.page = 1
    },
    // 复选框值变化
    CHECKBOXGROUPCHANGEHANDLER (state, valueobj) {
      const {k, v} = valueobj
      if (!v.includes('')) {
        if (k === 'color') {
          state.checkedColor = v
          state.queryParams.color = state.checkedColor.join('v')
        }
        if (k === 'series') {
          state.checkedSeries = v
          state.queryParams.series = state.checkedSeries.join('v')
        }
        if (k === 'brand') {
          state.queryParams.series = ''
          state.checkedBrand = v
          state.queryParams.brand = state.checkedBrand.join('v')
        }
        if (k === 'exhaust') {
          state.checkedExhaust = v
          state.queryParams.exhaust = state.checkedExhaust.join('v')
        }
        if (k === 'fuel') {
          state.checkedFuel = v
          state.queryParams.fuel = state.checkedFuel.join('v')
        }
        if (k === 'price') {
          state.queryParams[k] = state.checkPrice.join('to')
        }
        if (k === 'km') {
          state.queryParams[k] = state.checkedKm.join('to')
        }
        if (k === 'buydate') {
          state.checkedTime = v
          state.buydate = new Date(state.checkedTime[0]).getTime() + 'to' + new Date(state.checkedTime[1]).getTime()
          state.queryParams.buydate = new Date(state.checkedTime[0]).getTime() + 'to' + new Date(state.checkedTime[1]).getTime()
        }
      } else {
        state.queryParams[k] = ''
      }
    },
    // 获得车系
    GETCARSSERIES (state, {res, carsType}) {
      state.getCarsSeriesInfo = res
      state.carsType = []
      state.nowCarType = carsType
      for (let k in res[carsType]) {
        state.carsType.push(k)
      }
    },
    // 获得当前车的车系
    GETONECARSERES (state, carsSeries) {
      state.carSeriesList = state.getCarsSeriesInfo[state.nowCarType][carsSeries]
    },
    // 添加对比车辆
    ADDCOMPAREDCARS (state, row) {
      state.nowCompareCars.push(row)
    },
    // 删除对比车辆
    DELETECOMPAREDCARS (state, row) {
      state.nowCompareCars = state.nowCompareCars.filter(item => item !== row)
    },
    // 清空对比车辆
    CLEARCOMPAREDCARS (state) {
      state.nowCompareCars = []
    }

  },
  actions: {
    //   2、
    //   获得车的列表
    // context相当于new出来的store
    // 一般这里的第一个参数就是context,里面包含vuex的所有方法
    async GETCARSLISTASYNC (context) {
      const {data: res} = await carHttp.loadCarInfo({params: context.state.queryParams})
      //   让mutations修改数据
      context.commit('UPDATECARSLIST', res)
    },
    // 获得车系
    async GETCARSSERIESASYNC ({commit}, carsType) {
      const {data: res} = await carHttp.getCarSeries()
      commit('GETCARSSERIES', {res, carsType})
    },
    CHANGEPAGENUMASYNC ({commit, dispatch}, pagenum) {
      // 让mutations修改页码
      commit('CHANGEPAGENUM', pagenum)
      // 刷新列表
      dispatch('GETCARSLISTASYNC')
    },
    CHANGEPAGESIZEASYNC ({commit, dispatch}, pagesize) {
      commit('CHANGEPAGESIZE', pagesize)
      // 刷新列表
      dispatch('GETCARSLISTASYNC')
    },
    // 复选框的改变
    CHECKBOXGROUPCHANGEHANDLERASYC ({commit, dispatch}, valueobj) {
      commit('CHECKBOXGROUPCHANGEHANDLER', valueobj)
      dispatch('GETCARSLISTASYNC')
    }
  },
  getters: {
  }

}

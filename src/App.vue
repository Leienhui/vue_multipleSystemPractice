<template>
    <div class="layout" @click="isShowMenu=false">
        <Layout :style="{minHeight: '100vh'}">
            <Sider collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu :active-name="this.$store.state.routerStore.belong" theme="dark" width="auto" :class="menuitemClasses" @on-select="selectMenuHandlerEvent">
                    <MenuItem name="car" >
                        <span>汽车买卖</span>
                    </MenuItem>
                    <MenuItem name="goods">
                        <span>货物管理</span>
                    </MenuItem>
                    <MenuItem name="cropPic">
                        <span>图片裁剪</span>
                    </MenuItem>
                </Menu>
            </Sider>
            <!-- 点击显示的菜单 -->
            <div class="menu-box" v-show="isShowMenu" @click.stop="">
                <ul>
                    <li v-for="item in menus[nowShowMenuName]" :key="item.title" @click="navigateTo(item.link)">{{item.title}}</li>
                </ul>
            </div>
            <Layout>
                <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"></Header>
                <Content :style="{padding: '0 16px 16px'}">
                    <Breadcrumb :style="{margin: '16px 0'}">
                        <BreadcrumbItem>首页</BreadcrumbItem>
                        <BreadcrumbItem> {{this.$store.state.routerStore.belongChinese}}</BreadcrumbItem>
                        <BreadcrumbItem>{{this.$store.state.routerStore.selfChinese}}</BreadcrumbItem>
                    </Breadcrumb>
                    <Card>
                        <div>
                            <router-view  name="CheckboxBar"/>
                            <router-view  name="BuyCar"/>
                            <router-view/>
                        </div>
                    </Card>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
export default {
  data () {
    return {
      isCollapsed: false,
      //   是否显示右边的菜单栏
      isShowMenu: false,
      //   当前蒸菜显示的menu
      nowShowMenuName: '',
      //   menu菜单项
      menus: {
        'car': [
          {
            'title': '卖车',
            'link': 'salecar'
          },
          {
            'title': '买车',
            'link': 'buycar'
          }
        ],
        'goods': [
          {
            'title': '发货',
            'link': 'shipments'
          },
          {
            'title': '选购',
            'link': 'product'
          },
          {
            'title': '添加商品',
            'link': 'upPic'
          },
          {
            'title': '新的添加商品',
            'link': 'addNewPic'
          }
        ],
        'cropPic': [
          {
            'title': '图片裁剪',
            'link': 'cropPic'
          }
        ]
      }
    }
  },
  computed: {
    menuitemClasses: () => {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    },
    getActiveName: () => {

    }
  },
  methods: {
    selectMenuHandlerEvent (itemName) {
      this.isShowMenu = true
      this.nowShowMenuName = itemName
    },
    navigateTo (link) {
      console.log(link)
      this.$router.push(link)
      this.isShowMenu = false
    }
  }
}
</script>
<style lang="less" scoped>
    .layout-con{
        height: 100%;
        width: 100%;
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
    .menu-box{
        position: fixed;
        left: 200px;
        width: 140px;
        height: 100%;
        background-color: rgb(211, 208, 200);
        z-index: 999;
        top: 45px;
        box-shadow: 3px 3px 3px rgba(0,0,0,.5);
        ul{
            @liheight:60px;
            list-style: none;
            li{
                height: @liheight;
                line-height: @liheight;
                padding-left: 30px;
                font-size: 20xp;
                cursor: pointer;
                // &:hover表示li与hover之间没有空格，:hover表示li与hover之间有空格
                &:hover{
                    color: orange;
                }
            }
        }
    }
</style>

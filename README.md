# nav-menu

> vue 菜单组件 nav-menu  (持续更新中....)

## install 

``` bash
# install dependencies
npm i nav-menu --save

```
## 预览
![预览](https://github.com/micro-plat/login-with-up/blob/dev/menu.png?raw=true)

##use
```vue
<template>
  <div>
    <nav-menu
      :menus="menus"
      :copyright="copyright"
      :appAsideClass="appAsideClass"
      :navbarHeaderClass="navbarHeaderClass"
      :navbarCollapseClass="navbarCollapseClass"
      :systemList="systemList"
      :logo="logo"
      ref="childCall"
    >
      <router-view/>
    </nav-menu>

  </div>
</template>

<script>
  import navMenu from 'nav-menu'; // 引入
  export default {
    name: 'app',
    data () {
      return {
        logo:"http://sso2.100bm.cn:6888/static/img/d879a953c0dc59a7564a861000aaeac3.png",
        navbarHeaderClass:"bg-danger",  //顶部右侧背景颜色
        navbarCollapseClass:"bg-info",  //顶部左侧背景颜色
        appAsideClass:"bg-dark",        //右边菜单背景颜色
        systemList:[{
          "ident": "sso",
          "index_url": "/user/index",
          "name": "用户权限系统",
          "sys_id": "0"
        }, {
          "ident": "esim",
          "index_url": "http://admin0.hulianyt.com:8080/card/info",
          "name": "物联网esim平台",
          "sys_id": "193"
        }, {
          "ident": "coupon",
          "index_url": "http://coupon2.100bm.cn:6060/trade/order/info",
          "name": "电子优惠券系统",
          "sys_id": "221"
        }],
        copyright:"2018 四川千行你我科技有限公司",
        menus:[{
          "children": [{
            "children": [{
              "create_time": "2018-09-13 15:17:05",
              "icon": " ",
              "id": "10568",
              "is_open": "0",
              "level_id": "3",
              "name": "核销订单",
              "parent": "10564",
              "path": "/user/bind",
              "sortrank": "10568",
              "sys_id": "221"
            }],
            "create_time": "2018-09-13 15:14:19",
            "icon": "fa fa-line-chart text-danger",
            "id": "10564",
            "is_open": "1",
            "level_id": "2",
            "name": "电子券订单",
            "parent": "10563",
            "path": "-",
            "sortrank": "1",
            "sys_id": "221"
          }, {
            "children": [{
              "create_time": "2018-09-13 15:28:00",
              "icon": " ",
              "id": "10579",
              "is_open": "0",
              "level_id": "3",
              "name": "券发布",
              "parent": "10577",
              "path": "/repository/product",
              "sortrank": "2",
              "sys_id": "221"
            }],
            "create_time": "2018-09-13 15:27:18",
            "icon": "fa fa-tags text-info",
            "id": "10577",
            "is_open": "1",
            "level_id": "2",
            "name": "制券管理",
            "parent": "10563",
            "path": "-",
            "sortrank": "2",
            "sys_id": "221"
          }, {
            "children": [{
              "create_time": "2018-09-13 15:22:26",
              "icon": " ",
              "id": "10573",
              "is_open": "0",
              "level_id": "3",
              "name": "商户管理",
              "parent": "10572",
              "path": "/merchant/merchant/info",
              "sortrank": "10573",
              "sys_id": "221"
            }],
            "create_time": "2018-09-13 15:22:01",
            "icon": "fa fa-tags text-success",
            "id": "10572",
            "is_open": "1",
            "level_id": "2",
            "name": "下游商户",
            "parent": "10563",
            "path": "-",
            "sortrank": "3",
            "sys_id": "221"
          }, {
            "children": [{
              "create_time": "2018-09-13 15:41:12",
              "icon": " ",
              "id": "10597",
              "is_open": "0",
              "level_id": "3",
              "name": "资金流水",
              "parent": "10595",
              "path": "/supplier/fund",
              "sortrank": "4",
              "sys_id": "221"
            }],
            "create_time": "2018-09-13 15:40:37",
            "icon": "fa fa-paper-plane-o text-primary",
            "id": "10595",
            "is_open": "0",
            "level_id": "2",
            "name": "供应商",
            "parent": "10563",
            "path": "-",
            "sortrank": "4",
            "sys_id": "221"
          }],
          "create_time": "2018-09-13 15:13:39",
          "icon": " ",
          "id": "10563",
          "is_open": "0",
          "level_id": "1",
          "name": "交易承载",
          "parent": "0",
          "path": "-",
          "sortrank": "1",
          "sys_id": "221"
        }, {
          "children": [{
            "children": [ {
              "create_time": "2018-10-17 10:58:23",
              "icon": " ",
              "id": "10722",
              "is_open": "",
              "level_id": "3",
              "name": "商户数据",
              "parent": "10600",
              "path": "/report/channel",
              "sortrank": "10722",
              "sys_id": "221"
            }],
            "create_time": "2018-09-13 15:50:28",
            "icon": "fa fa-bar-chart text-danger",
            "id": "10600",
            "is_open": "1",
            "level_id": "2",
            "name": "业务数据统计",
            "parent": "10562",
            "path": "-",
            "sortrank": "10600",
            "sys_id": "221"
          }, {
            "children": [{
              "create_time": "2018-09-13 15:54:06",
              "icon": " ",
              "id": "10606",
              "is_open": "0",
              "level_id": "3",
              "name": "代发费统计",
              "parent": "10602",
              "path": "/report/consume/substituting",
              "sortrank": "10606",
              "sys_id": "221"
            },{
              "create_time": "2018-10-17 10:53:21",
              "icon": " ",
              "id": "10720",
              "is_open": "",
              "level_id": "3",
              "name": "油站班结记录",
              "parent": "10602",
              "path": "/report/workend",
              "sortrank": "10720",
              "sys_id": "221"
            }],
            "create_time": "2018-09-13 15:51:19",
            "icon": "fa fa-bar-chart text-danger",
            "id": "10602",
            "is_open": "1",
            "level_id": "2",
            "name": "加油券财务对账",
            "parent": "10562",
            "path": "-",
            "sortrank": "10602",
            "sys_id": "221"
          }, {
            "children": [{
              "create_time": "2018-09-13 15:57:37",
              "icon": " ",
              "id": "10614",
              "is_open": "0",
              "level_id": "3",
              "name": "销券分析",
              "parent": "10612",
              "path": "/report/analyse/consume",
              "sortrank": "10614",
              "sys_id": "221"
            }],
            "create_time": "2018-09-13 15:56:55",
            "icon": "fa fa-bar-chart text-danger",
            "id": "10612",
            "is_open": "1",
            "level_id": "2",
            "name": "运营分析",
            "parent": "10562",
            "path": "-",
            "sortrank": "10612",
            "sys_id": "221"
          }],
          "create_time": "2018-09-13 15:13:11",
          "icon": " ",
          "id": "10562",
          "is_open": "0",
          "level_id": "1",
          "name": "数据中心",
          "parent": "0",
          "path": "-",
          "sortrank": "2",
          "sys_id": "221"
        }, {
          "children": [{
            "children": [ {
              "create_time": "2018-09-13 15:37:22",
              "icon": " ",
              "id": "10593",
              "is_open": "0",
              "level_id": "3",
              "name": "POS机",
              "parent": "10590",
              "path": "/device",
              "sortrank": "10593",
              "sys_id": "221"
            }],
            "create_time": "2018-09-13 15:36:44",
            "icon": "fa fa-cog text-danger",
            "id": "10590",
            "is_open": "1",
            "level_id": "2",
            "name": "基础配置",
            "parent": "10586",
            "path": "-",
            "sortrank": "10590",
            "sys_id": "221"
          }],
          "create_time": "2018-09-13 15:33:52",
          "icon": " ",
          "id": "10586",
          "is_open": "0",
          "level_id": "1",
          "name": "基础配置",
          "parent": "0",
          "path": "-",
          "sortrank": "3",
          "sys_id": "221"
        }]
      }
    },
    components:{ //注册插件
      navMenu
    },
    mounted(){
      //向组件添加一个自定义标签，点击标签会路由到一个页面
      this.$refs.childCall.call({name:"测试标签",path:"/hello"});   //调用组件方法
    },
    methods:{

    }
  }
</script>

<style scoped>

</style>

```

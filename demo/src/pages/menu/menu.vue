<template>
  <div>
    <nav-menu
      :menus="menus"
      ref="menu"
      :userinfo="userinfo"
      :systemName="systemName"
      :copyright="copyright"
      :themes="themes"
      :logo="logo"
      :items="items"
      :dialog="showDialog"
    >
    </nav-menu>

  </div>
</template>
<script>

  //mock一些数据
  import Menus from './menus'
  // import navMenu from 'nav-menu'; // 引入
  import navMenu from '../../../../src/myPlugin/navMenu/nav-menu'
  export default {
    name: 'app',
    data () {
      return {
        menus:Menus,  //菜单数据
        systemName:"实惠生活管理系统",  //系统名称
        logo:"http://sso.sinopecscsy.com/static/img/43612a9fe1f92658cc3bc6e3edc0766e.png",
        copyright:"2018 四川千行你我科技有限公司", //版权信息
        themes:"bg-primary|bg-primary|bg-dark dark-primary", //顶部左侧背景颜色,顶部右侧背景颜色,右边菜单背景颜色
        userinfo:{ name: "张三", role: "管理员" },
        items: [
          {
            name: "核销订单",
            path: "/user/bind",
            type: "blank"
          },
          {
            name: "核销订单",
            path: "/user/bind",
            type: "self"
          },
          {
            name: "修改用户信息",
            type: "dialog"
          },
          {
            name: "选择其他系统",
            items: 
            [
              {
                name: "短信系统",
                path: "/msg",
              },
              {
                name: "大象车生活",
                type: "self",
                path: "/user/bind",
              },
              {
                name: "---"
              },
              {
                name: "分销系统",
                type: "self",
                path: "http://www.baidu.com",
              },
              {
                name: "卡券系统",
                path: "/carlife",
              },
              {
                name: "---"
              },
              {
                name: "芯片卡系统",
                path: "/carlife",
              }
            ]

          }
        ],

      }
    },
    components:{ //注册插件
      navMenu
    },
    mounted(){     
      //向组件添加一个自定义标签，点击标签会路由到一个页面
      this.$refs.menu.open("核销订单", "/user/bind");   //设置默认页面
    },
    methods:{
      getMenu(){
        // 这里获取菜单数据
        this.$post("/sso/menu/get")
          .then(res => {
            return res
            this.menus = res;
          })
          .catch(err => {
            console.log(err)
          });
      },
      showDialog(){
        console.log("8888888888888888888888");
        
      }
    }
  }
</script>

<style scoped>

</style>

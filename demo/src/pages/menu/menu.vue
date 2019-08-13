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
    >
    </nav-menu>

  </div>
</template>

<script>

  //mock一些数据
  import Menus from './menus'
  import navMenu from 'nav-menu'; // 引入
  // import navMenu from '../../../../src/myPlugin/navMenu/nav-menu'
  export default {
    name: 'app',
    data () {
      return {
        menus:Menus,  //菜单数据
        systemName:"实惠生活管理系统",  //系统名称
        logo:"http://sso.sinopecscsy.com/static/img/43612a9fe1f92658cc3bc6e3edc0766e.png",
        copyright:"2018 四川千行你我科技有限公司", //版权信息
        themes:"bg-info|bg-danger|bg-dark", //顶部左侧背景颜色,顶部右侧背景颜色,右边菜单背景颜色
        userinfo:{ name: "张三", role: "管理员" }
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
    }
  }
</script>

<style scoped>

</style>

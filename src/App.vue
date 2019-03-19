<template>
  <div>
    <nav-menu
      :menus="menus"
      :pwd="pwd"
      ref="NewTap"
    >
      <router-view  @addTab="addTab" @closeTab="closeTab" @setTab="setTab" />
    </nav-menu>
  </div>
</template>

<script>
  import menus from './menus'
  import navMenu from '../src/myPlugin/navMenu/nav-menu'; // 引入
  export default {
    name: 'app',
    data () {
      return {
        menus:[{}],  //菜单数据
      }
    },
    components:{ //注册插件
      navMenu
    },
    mounted(){
      this.getMenu();
      //向组件添加一个自定义标签，点击标签会路由到一个页面
      this.$refs.NewTap.add("资金流水","/hello",{});   //设置默认页面
    },
    methods:{
      getMenu(){
            this.menus = menus;
      },
      pwd(val){
        console.log(val)
      },
      //@name 标签名称
      //@path 路由
      //@obj  路由参数 类型：Object
      addTab(name,path,obj){
        console.log(name,path,obj);
        this.$refs.NewTap.add(name,path,obj);   //调用组件方法，添加一个页面
      },
      setTab(name,path,obj){
        console.log("outer",name,path,obj);
        this.$refs.NewTap.set(name,path,obj);
      },
      closeTab(name,path){
        console.log(name,path);
        this.$refs.NewTap.closeTab({name:name,path:path});   //调用组件方法，添加一个页面
      }
    }
  }
</script>

<style scoped>

</style>

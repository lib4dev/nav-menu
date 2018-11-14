<template>
  <div class="app app-header-fixed" id="app">
    <!-- navbar -->
    <div class="app-header navbar">
      <!-- navbar header -->
      <div class="navbar-header bg-dark" :class="[navbarHeaderClass?navbarHeaderClass:'bg-info']">
        <button class="pull-right visible-xs dk" data-toggle="class:show" data-target=".navbar-collapse">
          <i class="glyphicon glyphicon-cog"></i>
        </button>
        <button class="pull-right visible-xs" data-toggle="class:off-screen" data-target=".app-aside" ui-scroll="app">
          <i class="glyphicon glyphicon-align-justify"></i>
        </button>
        <!-- brand -->
        <a href="#" class="navbar-brand text-lt">

          <img :src="logo" alt="." class="hide">
          <span class="hidden-folded m-l-xs">
            <img :src="logo" alt=".">
            <!--Micro-plat-->
          </span>
        </a>
        <!-- / brand -->
      </div>
      <!-- / navbar header -->
      <!-- navbar collapse -->
      <div class="collapse pos-rlt navbar-collapse box-shadow" :class="[navbarCollapseClass?navbarCollapseClass:'bg-info']">
        <!-- buttons ok-->
        <div class="nav navbar-nav hidden-xs">
          <a href="#" class="btn no-shadow navbar-btn" data-toggle="class:app-aside-folded" data-target=".app">
            <i class="fa fa-dedent fa-fw text"></i>
            <i class="fa fa-indent fa-fw text-active"></i>
          </a>
        </div>
        <div class="title">{{systemName}}</div>
        <!-- / buttons -->
        <!-- nabar right -->
        <ul class="nav navbar-nav navbar-right">
          <li class="dropdown" v-for="(v,k) in menus">
            <a href="#" class="dropdown-toggle" @click="changeShowMenu(v.name)">
              <i class="fa fa-fw fa-plus visible-xs-inline-block"></i>
              <span>{{v.name}}</span>
            </a>
          </li>
          <li class="dropdown">
            <a href="#" data-toggle="class:show" class="dropdown-toggle" data-target="#menu">
              <i class="fa fa-fw fa-plus visible-xs-inline-block"></i>
              <span>报警消息</span> <span class="caret"></span>
            </a>
            <ul class="dropdown-menu" role="menu" id="menu">
              <li>
                <a @click="goto('历史消息','/notify_records')">
                  <span class="badge bg-info pull-right">5</span>
                  <span>历史消息</span>
                </a>
              </li>
              <li class="divider"></li>
              <li>

                  <a @click="goto('消息设置','/notify_settings')">
                    <span class="badge bg-danger pull-right">4</span>
                    <span >消息设置</span>
                  </a>


              </li>
            </ul>
          </li>
          <li class="dropdown">
            <a href="#" data-toggle="class:show" class="dropdown-toggle clear" data-target="#user">
                            <span class="thumb-sm avatar pull-right m-t-n-sm m-b-n-sm m-l-sm">
                <img :src="headpic" alt=".">
                <i class="on md b-white bottom"></i>
              </span>
            </a>
            <!-- dropdown -->
            <ul class="dropdown-menu animated fadeInRight w" id="user">
              <li class="wrapper b-b m-b-sm bg-light m-t-n-xs">
                <div>
                  <p>用户名--角色</p>
                </div>
              </li>
              <li>
                <a  @click="goto('个人资料','/userinfo')">
                  <span class="badge bg-danger pull-right">30%</span>
                  <span>个人资料</span>
                </a>
              </li>
              <li>
                <a @click="goto('修改密码','/password')">修改密码</a>
              </li>
              <li>
                <a @click="goto('退出','/login')">
                  <span class="label bg-info pull-right">NEW</span>
                  退出
                </a>
              </li>
              <!--<li class="divider"></li>-->
              <!--<li v-for="(v,k) in systemList">-->
                <!--<a>{{v.name}}</a>-->
              <!--</li>-->
            </ul>
            <!-- / dropdown -->
          </li>
        </ul>
        <!-- / navbar right -->
      </div>
      <!-- / navbar collapse -->
    </div>
    <!-- navbar-->

    <!-- menu -->
    <div class="app-aside hidden-xs" :class="[appAsideClass?appAsideClass:'']">
      <div class="aside-wrap">
        <div class="navi-wrap">
          <!-- nav -->
          <nav ui-nav class="navi">
            <ul class="nav" v-for="(v,k) in menus" v-if="showMenu == v.name">
              <!--菜单单元-->
              <li class="hidden-folded padder m-t m-b-sm text-muted text-xs" >
                <span>{{v.name}}</span>
              </li>
              <li  v-for="(v1,k1) in v.children" :class="[v1.is_open==1 ? 'active' : '']">
                <a href class="auto">
                  <span class="pull-right text-muted">
                    <i class="fa fa-fw fa-angle-right text"></i>
                    <i class="fa fa-fw fa-angle-down text-active"></i>
                  </span>
                  <i :class="v1.icon"></i>
                  <span class="font-bold">{{v1.name}}</span>
                </a>
                <ul class="nav nav-sub dk">
                  <li v-for="(v2,k2) in v1.children" :class="[v2.path==v2Path ? 'active' : '']">
                    <a @click="changeMenu(v2)" >
                      <span>{{v2.name}}</span>
                    </a>
                  </li>
                </ul>
              </li>
              <!--菜单单元-->
            </ul>
          </nav>
          <!-- nav -->
        </div>
      </div>
    </div>
    <!-- / menu -->
    <!-- content -->
    <div class="app-content">
      <div ui-butterbar></div>
      <a href class="off-screen-toggle hide" data-toggle="class:off-screen" data-target=".app-aside"></a>
      <div class="app-content-body fade-in-up">
        <ul class="nav nav-tabs">
          <li role="presentation" v-for="(v,k) in topTab" :class="[v.path==activeTab ? 'active tabs-activ':'']">
            <a class="tabs-close-a" @click="topChangeMenu(v.path)" >
              {{v.name}}
              <transition name="fade">
                <i class="iconfont icon-chahao tabs-close" @click.stop="closeTab(v)"></i>
              </transition>
            </a>
          </li>
        </ul>

       <slot></slot>

      </div>
    </div>
    <!-- /content -->

    <!-- footer -->
    <div class="app-footer wrapper b-t bg-light">
      <span class="pull-right">1.0.0
        <a href="#" class="m-l-sm text-muted">
          <i class="fa fa-long-arrow-up"></i>
        </a>
      </span> &copy; {{copyright}}
    </div>
    <!-- / footer -->
  </div>
</template>
<script>
  import toggle from './toggle';
  toggle();
  export default({
    name:'navMenu',
    props:{
      menus: {
        type: Array,
        required:true,
        default:[{}]
      },
      systemName:{
        type:String,
        required: true
      },
      logo: {
        type:String,
        required: true
      },
      copyright: {
        type:String,
        required: true
      },
      themes: {
        type:String,
        required: true
      },
      headpic:{
        type:String
      }
    },
    data() {
      return{
        topTab:[],
        showMenu:this.menus[0].name,
        activeTab:"",
        v2Path:"",
        v1Name:"",
      }
    },
    computed: {

      navbarHeaderClass: function () {

        return this.themes.split('|')[0]
      },
      navbarCollapseClass: function () {

        return this.themes.split('|')[1]
      },
      appAsideClass: function () {
        return this.themes.split('|')[2]
      },

    },
    mounted() {

    },
    watch: {
      menus(newName, oldName) {

        this.showMenu=this.menus[0].name;
      },
    },
    methods:{
      goto(name,path){
        this.changeMenu({name: name,path:path})
      },
      add(name,path,obj) {
        let e = {name:name,path:path,params:obj};
        this.changeMenu(e)
      },
      closeTab(v){
        if (this.topTab.length == 1){
          return
        }
        let newArr = [];
        let path;
        this.topTab.forEach((tab, index) => {
          if(tab.name == v.name){
            if(index-1 < 0){
              path = this.topTab[index+1].path
            }else{
              path = this.topTab[index-1].path
            }
          }else{
            newArr.push(tab)
          }
        });
        this.topTab = newArr;
        if(this.activeTab == v.path){
          this.topChangeMenu(path)
        }
        this.lightThirdMenu(path);
      },
      changeShowMenu(name){
        this.showMenu = name
      },
      changeMenu(v2){
        this.activeTab = v2.path;

        let isEx = false;
        this.topTab.forEach((tab, index) => {
            if(tab.name == v2.name){
              isEx = true
            }
        });
        if(!isEx){
          this.topTab.push(v2);
        }
        this.lightThirdMenu(v2.path);
        this.$router.push({path:v2.path,query:v2.params})
      },
      topChangeMenu(path){
        this.activeTab = path;
        this.$router.push(path);
        this.lightFirstMenu(path);
        this.lightThirdMenu(path);
      },
      lightFirstMenu(path){
        this.menus.forEach((item,index)=>{
            item.children.forEach((item1,index1)=>{
                item1.children.forEach((item2,index2)=>{
                    if(path == item2.path){
                      this.showMenu = item.name;
                    }
                })
            })
        })
      },
      lightThirdMenu(path){  //点亮第三级菜单
        this.v2Path = path;
      }
    }
  })
</script>
<style scoped>
  @import url('../../assets/css/bootstrap.css');
  @import url('../../assets/css/animate.css');
  @import url('../../assets/css/font-awesome.min.css');
  @import url('../../assets/css/simple-line-icons.css');
  @import url('../../assets/css/font.css');
  @import url('../../assets/css/app.css');


  @font-face {font-family: "iconfont";
    src: url('//at.alicdn.com/t/font_889851_f8z0n45901.eot?t=1540798098997'); /* IE9*/
    src: url('//at.alicdn.com/t/font_889851_f8z0n45901.eot?t=1540798098997#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('data:application/x-font-woff;charset=utf-8;base64,d09GRgABAAAAAAQcAAsAAAAABmgAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAADMAAABCsP6z7U9TLzIAAAE8AAAARAAAAFY8jUgJY21hcAAAAYAAAABLAAABcOc/te9nbHlmAAABzAAAAGwAAAB0yC1qoWhlYWQAAAI4AAAALQAAADYTF/LzaGhlYQAAAmgAAAAcAAAAJAfeA4NobXR4AAAChAAAAAgAAAAICAAAAGxvY2EAAAKMAAAABgAAAAYAOgAAbWF4cAAAApQAAAAeAAAAIAEOACluYW1lAAACtAAAAUUAAAJtPlT+fXBvc3QAAAP8AAAAHwAAADDF6GJweJxjYGRgYOBikGPQYWB0cfMJYeBgYGGAAJAMY05meiJQDMoDyrGAaQ4gZoOIAgCKIwNPAHicY2BkYWCcwMDKwMHUyXSGgYGhH0IzvmYwYuRgYGBiYGVmwAoC0lxTGByeiT8TZ27438AQw9zA0AAUZgTJAQDgvQwReJxjYGBgZWBgYAZiHSBmYWBgDGFgZAABP6AoI1icmYELLM7CoARWwwISfyb+/z+MBPJZwCQDIxvDKOABkzJQHjisIJiBEQBhKAnFAHicFY0xDoQwDAS9OQlk05pEIlQUXHcFQtwzeBQ/5BcQ3mDhbLM70khLgTyfPZyUaSRibOs8tYx5ajQxGo3LnxGXbf0i/BBFs9htTzf0ArW7MiKSZGW7cKD3JVa8q1msVHbzcu6Q/O0FNL8W8XicY2BkYGAA4svRHivi+W2+MnCzMIDA9T/XJyHTLAxMl4AUBwMTiAcASwsLKQAAAHicY2BkYGBu+N/AEMPCAAJAkpEBFTABAEcIAmsEAAAABAAAAAAAAAAAOgAAeJxjYGRgYGBikAViBjCLgYELCBkY/oP5DAALgwE4AAB4nGWPTU7DMBCFX/oHpBKqqGCH5AViASj9EatuWFRq911036ZOmyqJI8et1ANwHo7ACTgC3IA78EgnmzaWx9+8eWNPANzgBx6O3y33kT1cMjtyDRe4F65TfxBukF+Em2jjVbhF/U3YxzOmwm10YXmD17hi9oR3YQ8dfAjXcI1P4Tr1L+EG+Vu4iTv8CrfQ8erCPuZeV7iNRy/2x1YvnF6p5UHFockikzm/gple75KFrdLqnGtbxCZTg6BfSVOdaVvdU+zXQ+ciFVmTqgmrOkmMyq3Z6tAFG+fyUa8XiR6EJuVYY/62xgKOcQWFJQ6MMUIYZIjK6Og7VWb0r7FDwl57Vj3N53RbFNT/c4UBAvTPXFO6stJ5Ok+BPV8bUnV0K27LnpQ0kV7NSRKyQl7WtlRC6gE2ZVeOEXpc0Yk/KGdI/wAJWm7IAAAAeJxjYGKAAC4G7ICJkYmRmYEtOSMxIzGfgQEAD8wCgAA=') format('woff'),
    url('//at.alicdn.com/t/font_889851_f8z0n45901.ttf?t=1540798098997') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
    url('//at.alicdn.com/t/font_889851_f8z0n45901.svg?t=1540798098997#iconfont') format('svg'); /* iOS 4.1- */
  }

  .iconfont {
    font-family:"iconfont" !important;
    font-size:16px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-chahao:before { content: "\e617"; }

  .app-aside {
    position: fixed;
    bottom: 0px;
    top: 50px;
  }
  .app-footer {
    position: fixed;
  }
  .tabs-close-a{min-width: 108px;text-align: center;}
  .nav a.tabs-close-a:hover{color: #23b7e5;}
  .tabs-close{display: none; margin-left: 1px;font-size:12px; padding:0 2px;}
  .nav a:hover .tabs-close{display: inline-block;}
  i.tabs-close:hover{background: #999;color: #fff;border-radius: 10px;text-align: center;}
  .nav-tabs > li.tabs-activ > a{color: #23b7e5;}
  .tabs-activ a .tabs-close{display: inline-block;}

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .aside-wrap{
    position: fixed;
    top: 50px;
    bottom: 0;
    left: 0;
    z-index: 1000;
    width: 200px;
    overflow: hidden;
  }
  .navi-wrap{
    position: relative;
    width: 217px;
    height: 100%;
    overflow-x: hidden;
    overflow: hidden;
    overflow-y: scroll;
  }
</style>

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

          <img :src="logo || logoc" alt="." class="hide">
          <span class="hidden-folded m-l-xs">
            <img :src="logo || logoc" alt=".">
            <!--Micro-plat-->
          </span>
        </a>
        <!-- / brand -->
      </div>
      <!-- / navbar header -->
      <!-- navbar collapse -->
      <div class="collapse pos-rlt navbar-collapse box-shadow"
           :class="[navbarCollapseClass?navbarCollapseClass:'bg-info']">
        <!-- buttons ok-->
        <div class="nav navbar-nav hidden-xs">
          <a href="#" class="btn no-shadow navbar-btn" data-toggle="class:app-aside-folded" data-target=".app">
            <i class="fa fa-dedent fa-fw text"></i>
            <i class="fa fa-indent fa-fw text-active"></i>
          </a>
        </div>
        <div class="title">{{systemName || systemNamec}}</div>
        <!-- / buttons -->
        <!-- nabar right -->
        <ul class="nav navbar-nav navbar-right">
          <li class="dropdown" v-for="(v,k) in menus" v-if="menus.length > 1">
            <a href="#" class="dropdown-toggle" @click="changeShowMenu(v.name)">
              <i class="fa fa-fw fa-plus visible-xs-inline-block"></i>
              <span>{{v.name}}</span>
            </a>
          </li>

          <li class="dropdown">
            <a href="#" data-toggle="class:show" class="dropdown-toggle clear" data-target="#user">
                            <span class="thumb-sm avatar pull-right m-t-n-sm m-b-n-sm m-l-sm">
                <img :src="headpic || headpicc" alt=".">
                <i class="on md b-white bottom"></i>
              </span>
            </a>
            <!-- dropdown -->
            <ul class="dropdown-menu animated fadeInRight w" id="user">
              <li class="wrapper b-b m-b-sm bg-light m-t-n-xs">
                <div>
                  <p>{{userinfo.name || username}}--{{userinfo.role || userrole}}</p>
                </div>
              </li>

              <li>
                <a @click="changePwd">修改密码</a>
              </li>
              <li>
                <a @click="goto('退出','/login')">
                  <span class="label bg-info pull-right"></span>
                  退出
                </a>
              </li>
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
      <div class="aside-wrap ">
        <div class="navi-wrap">
          <!-- nav -->
          <nav ui-nav class="navi">
            <ul class="nav" v-for="(v,k) in menus" v-if="showMenu == v.name">
              <!--菜单单元-->
              <li class="hidden-folded padder m-t m-b-sm text-muted text-xs">
                <span>{{v.name}}</span>
              </li>
              <!--:class="[v1.is_open==1 ? 'active' : '']-->
              <li v-for="(v1,k1) in v.children" :class="[v1.active==1 ? 'active' : '',v1.is_open==1 ? 'active' : '']"  >
                <a href class="auto">
                  <span class="pull-right text-muted">
                    <i class="fa fa-fw fa-angle-right text"></i>
                    <i class="fa fa-fw fa-angle-down text-active"></i>
                  </span>
                  <i :class="v1.icon"></i>
                  <span class="font-bold">{{v1.name}}</span>
                </a>
                <ul class="nav nav-sub dk">
                  <li v-for="(v2,k2) in v1.children" :class="[v2.path==v2Path ? 'select' : '']">
                    <a @click="changeMenu(v2)" class="third-hover">
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
            <a class="tabs-close-a" @click="topChangeMenu(v)">
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
      <span class="pull-right">
        <a href="#" class="m-l-sm text-muted">
          <!--<i class="fa fa-long-arrow-up"></i>-->
        </a>
      </span> &copy; {{copyright || copyrightc}}
    </div>
    <!-- / footer -->
  </div>
</template>
<script>
  import toggle from './toggle';

  toggle();
  export default ({
    name: 'navMenu',
    props: {
      menus: {
        type: Array,
        required: true,
        default: [{}]
      },
      systemName: {
        type: String,
        required: false
      },
      logo: {
        type: String,
        required: false
      },
      copyright: {
        type: String,
        required: false
      },
      themes: {
        type: String,
        required: false
      },
      headpic: {
        type: String
      },
      sessionKey:{
        type:String,
        default:"systeminfo"
      },
      sessionUserKey:{
        type:String,
        default:"userinfo"
      },
      userinfo: {
        type: Object,
        default: ()=>{
          return {name:'系统用户',role:'管理员'}
        },
      },
      pwd: Function,
    },
    data() {
      return {
        topTab: [],
        showMenu: this.menus[0].name,
        activeTab: "",
        oldTab:"",
        v2Path: "",
        v1Name: "",
        userinfos: JSON.parse(sessionStorage.getItem(this.sessionUserKey)),
        systeminfos: JSON.parse(sessionStorage.getItem(this.sessionKey))
      }
    },
    computed: {
      username() {
        return this.userinfos ? this.userinfos.name : '系统用户'
      },
      userrole() {
        return this.userinfos ? this.userinfos.role : '管理员'
      },
      systemNamec() {
        return this.systeminfos ? this.systeminfos.name : "菜单系统"
      },
      logoc() {
        return this.systeminfos ? this.systeminfos.logo : "https://imgx.0w0.tn/images/2019/03/19/aYU5GkLBw6qYexV4.png"
      },
      copyrightc() {
        return this.systeminfos ? this.systeminfos.copyright : "版权信息"
      },

      headpicc() {
        return this.systeminfos ? this.systeminfos.headpic : "https://imgx.0w0.tn/images/2019/03/19/jJ66VqK0hkDuBd4l.jpg"
      },
      navbarHeaderClass: function () {

        return　this.themes ? this.themes.split('|')[0] : this.themesc().split('|')[0]
      },
      navbarCollapseClass: function () {

        return　this.themes ? this.themes.split('|')[1] : this.themesc().split('|')[1]
      },
      appAsideClass: function () {
        return　this.themes ? this.themes.split('|')[2] : this.themesc().split('|')[2]
      },

    },
    mounted() {

    },
    watch: {
      menus(newName, oldName) {

        this.showMenu = this.menus[0].name;
      },
    },
    methods: {
      themesc() {
        return this.systeminfos ? this.systeminfos.themes : "bg-danger|bg-danger|bg-dark light-danger"
      },
      changePwd() {
        this.pwd(true)
      },
      goto(name, path) {
        this.changeMenu({name: name, path: path})
      },
      add(name, path, obj) {
        let e = {name: name, path: path, params: obj};
        let arr = Object.keys(obj);
        if (arr.length != 0) {
          let q = "?";
          for (var i in obj) {
            q += i + "=" + obj[i] + "&"
          }
          e.path = e.path + q;
        }
        e.params_len = arr.length != 0;
        this.changeMenu(e)
      },
      set(name,path,obj){
        let newArr = [];
        let e = {name: name, path: path, params: obj};
        let arr = Object.keys(obj);
        if (arr.length != 0) {
          let q = "?";
          for (var i in obj) {
            q += i + "=" + obj[i] + "&"
          }
          e.path = e.path + q;
        }
        e.params_len = arr.length != 0;
        this.topTab.forEach((tab, index) => {
          if (tab.name == name) {

          } else {
            newArr.push(tab)
          }
        });

        newArr.push(e);
        this.topTab = newArr

      },
      closeTab(v){
        if (this.topTab.length == 1) {
          return
        }
        let newArr = [];
        let path;
        let obj;
        this.topTab.forEach((tab, index) => {
          if (tab.name == v.name) {
            if (index - 1 < 0) {
              path = this.topTab[index + 1].path;
              obj = this.topTab[index + 1]
            } else {
              path = this.topTab[index - 1].path;
              obj = this.topTab[index - 1]
            }
          } else {
            newArr.push(tab)
          }
        });
        this.topTab = newArr;
        if (this.activeTab == v.path) {
          this.topChangeMenu(obj)
        }
        if(v.params_len){
          return
        }
        this.lightThirdMenu(path);
      },
      changeShowMenu(name) {
        this.showMenu = name
      },
      changeMenu(v2) {
        this.activeTab = v2.path;

        let isEx = false;
        this.topTab.forEach((tab, index) => {
          if (tab.name == v2.name) {
            isEx = true
          }
        });
        if (!isEx) {
          this.topTab.push(v2);
        }
        if (!v2.params_len) {
          this.lightThirdMenu(v2.path);
        }
        this.$router.push({path: v2.path, query: v2.params})
      },
      topChangeMenu(v) {
        this.activeTab = v.path;
        this.$router.push(v.path);
        if(v.params_len){
          return
        }
        this.lightFirstMenu(v.path);
        this.lightSecondMenu(v.path);
        this.lightThirdMenu(v.path);
      },
      lightFirstMenu(path) {
        this.menus.forEach((item, index) => {
          item.children.forEach((item1, index1) => {
            item1.children.forEach((item2, index2) => {
              if (path == item2.path) {
                this.showMenu = item.name;
              }
            })
          })
        })
      },
      lightSecondMenu(path) {
        this.menus.forEach((item, index) => {
          item.children.forEach((item1, index1) => {
            item1.active = 0;
            item1.is_open = 0;
            item1.children.forEach((item2, index2) => {
              if (path == item2.path) {
                item1.active = 1;
              }
            })
          })
        })
      },
      lightThirdMenu(path) {  //点亮第三级菜单
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

  @font-face {
    font-family: "iconfont";
    src: url('//at.alicdn.com/t/font_889851_f8z0n45901.eot?t=1540798098997'); /* IE9*/
    src: url('//at.alicdn.com/t/font_889851_f8z0n45901.eot?t=1540798098997#iefix') format('embedded-opentype'), /* IE6-IE8 */ url('data:application/x-font-woff;charset=utf-8;base64,d09GRgABAAAAAAQcAAsAAAAABmgAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAADMAAABCsP6z7U9TLzIAAAE8AAAARAAAAFY8jUgJY21hcAAAAYAAAABLAAABcOc/te9nbHlmAAABzAAAAGwAAAB0yC1qoWhlYWQAAAI4AAAALQAAADYTF/LzaGhlYQAAAmgAAAAcAAAAJAfeA4NobXR4AAAChAAAAAgAAAAICAAAAGxvY2EAAAKMAAAABgAAAAYAOgAAbWF4cAAAApQAAAAeAAAAIAEOACluYW1lAAACtAAAAUUAAAJtPlT+fXBvc3QAAAP8AAAAHwAAADDF6GJweJxjYGRgYOBikGPQYWB0cfMJYeBgYGGAAJAMY05meiJQDMoDyrGAaQ4gZoOIAgCKIwNPAHicY2BkYWCcwMDKwMHUyXSGgYGhH0IzvmYwYuRgYGBiYGVmwAoC0lxTGByeiT8TZ27438AQw9zA0AAUZgTJAQDgvQwReJxjYGBgZWBgYAZiHSBmYWBgDGFgZAABP6AoI1icmYELLM7CoARWwwISfyb+/z+MBPJZwCQDIxvDKOABkzJQHjisIJiBEQBhKAnFAHicFY0xDoQwDAS9OQlk05pEIlQUXHcFQtwzeBQ/5BcQ3mDhbLM70khLgTyfPZyUaSRibOs8tYx5ajQxGo3LnxGXbf0i/BBFs9htTzf0ArW7MiKSZGW7cKD3JVa8q1msVHbzcu6Q/O0FNL8W8XicY2BkYGAA4svRHivi+W2+MnCzMIDA9T/XJyHTLAxMl4AUBwMTiAcASwsLKQAAAHicY2BkYGBu+N/AEMPCAAJAkpEBFTABAEcIAmsEAAAABAAAAAAAAAAAOgAAeJxjYGRgYGBikAViBjCLgYELCBkY/oP5DAALgwE4AAB4nGWPTU7DMBCFX/oHpBKqqGCH5AViASj9EatuWFRq911036ZOmyqJI8et1ANwHo7ACTgC3IA78EgnmzaWx9+8eWNPANzgBx6O3y33kT1cMjtyDRe4F65TfxBukF+Em2jjVbhF/U3YxzOmwm10YXmD17hi9oR3YQ8dfAjXcI1P4Tr1L+EG+Vu4iTv8CrfQ8erCPuZeV7iNRy/2x1YvnF6p5UHFockikzm/gple75KFrdLqnGtbxCZTg6BfSVOdaVvdU+zXQ+ciFVmTqgmrOkmMyq3Z6tAFG+fyUa8XiR6EJuVYY/62xgKOcQWFJQ6MMUIYZIjK6Og7VWb0r7FDwl57Vj3N53RbFNT/c4UBAvTPXFO6stJ5Ok+BPV8bUnV0K27LnpQ0kV7NSRKyQl7WtlRC6gE2ZVeOEXpc0Yk/KGdI/wAJWm7IAAAAeJxjYGKAAC4G7ICJkYmRmYEtOSMxIzGfgQEAD8wCgAA=') format('woff'),
    url('//at.alicdn.com/t/font_889851_f8z0n45901.ttf?t=1540798098997') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/ url('//at.alicdn.com/t/font_889851_f8z0n45901.svg?t=1540798098997#iconfont') format('svg'); /* iOS 4.1- */
  }

  .iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-chahao:before {
    content: "\e617";
  }

  .app-aside {
    position: fixed;
    bottom: 0px;
    top: 50px;
  }

  .app-footer {
    position: fixed;
  }

  .tabs-close-a {
    min-width: 108px;
    text-align: center;
  }

  .nav a.tabs-close-a:hover {
    color: #23b7e5;
  }

  .tabs-close {
    display: none;
    margin-left: 1px;
    font-size: 12px;
    padding: 0 2px;
  }

  .nav a:hover .tabs-close {
    display: inline-block;
  }

  i.tabs-close:hover {
    background: #999;
    color: #fff;
    border-radius: 10px;
    text-align: center;
  }

  .nav-tabs > li.tabs-activ > a {
    color: #23b7e5;
  }

  .tabs-activ a .tabs-close {
    display: inline-block;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }

  .aside-wrap {
    position: fixed;
    top: 50px;
    bottom: 0;
    left: 0;
    z-index: 1000;
    width: 200px;
    overflow: hidden;
  }

  .navi-wrap {
    position: relative;
    width: 217px;
    height: 100%;
    overflow-x: hidden;
    overflow: hidden;
    overflow-y: scroll;
  }

  .light-info .select, .light-info a.third-hover:hover {
    background: #23b7e5 !important;
  }

  .black-info .select, .black-info a.third-hover:hover {
    background: #23b7e5 !important;
  }

  .light-danger .select, .light-danger a.third-hover:hover {
    background: #f21b1b !important;
  }

  .dark-danger .select, .dark-danger a.third-hover:hover {
    background: #f21b1b !important;
  }

  .light-dark .select, .light-dark a.third-hover:hover {
    background: #3a3f51 !important;
  }

  .white-black .select, .white-black a.third-hover:hover {
    background: #3a3f51 !important;
  }

  .light-success .select, .light-success a.third-hover:hover {
    background: #27c24c !important;
  }

  .dark-success .select, .dark-success a.third-hover:hover {
    background: #27c24c !important;
  }

  .dark-primary .select, .dark-primary a.third-hover:hover {
    background: #7266ba !important;
  }

  .dark-primary .selectc, .dark-primary a.third-hover:hover {
    background: #7266ba !important;
  }

  .nav-sub .select a span {
    color: #fff !important;
  }

  .dark-danger .nav-sub a span {
    color: #a8a8a8;
  }
</style>

<template>
  <div id="app">
    <login-with-up
      :copyright="copyright"
      :systemName="systemName"
      :conf="conf"
      @loginCall="call"
      ref="loginItem"
    >

    </login-with-up>
  </div>
</template>

<script>
  import loginWithUp from 'login-with-up'; // 引入
  export default {
    name: 'login',
    data() {
      return {
        systemName: "电子优惠券系统",
        copyright: "四川千行你我科技有限公司Copyright© 2018 版权所有",
        conf: {loginNameType: "请输入邮箱或用户名", pwd: "输入密码"},   //输入框提示信息配置
      }
    },
    components: { //注册插件
      loginWithUp
    },
    methods: {
      call(e) {
        //在这里获取数据进行登录
        console.log(e);
        //如果登陆失败，发送错误信息
        this.$refs.loginItem.showMsg("登录中。。。。");

        //登录成功，跳转到首页
        setTimeout(()=>{
          this.$router.push("/")
        }, 1500);

      }
    }
  }
</script>

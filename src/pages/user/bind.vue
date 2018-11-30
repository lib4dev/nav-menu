<template>
    <div>
      <button @click="add">
        添加一个标签
      </button>
      <button @click="close">
        删除一个标签
      </button>

    </div>
</template>

<script>
    export default {
      name: "bind",
      data(){
        return {
          name:"hello",
          path:"/user/hello",
        }
      },
      methods:{
          add(){
            console.log(this.$router.path);
            this.$emit('addTab',this.name,this.path);
          },
          close(){

            this.$emit('closeTab',this.name,this.path);
          }
      }
    }
</script>

<style scoped>

</style>

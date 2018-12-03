<template>
    <div>
      <button @click="add(1)">
        添加1个标签
      </button>
      <button @click="add(2)">
        添加2个标签
      </button>
      <button @click="add(3)">
        添加3个标签
      </button>
      <button @click="add(4)">
        添加4个标签
      </button>
      <button @click="add(5)">
        添加5个标签
      </button>
      <button @click="add(6)">
        添加6个标签
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
          add(val){
            console.log(this.$router.path);
            this.$emit('addTab',this.name+val,this.path+val,{age:val});
          },
          close(){

            this.$emit('closeTab',this.name,this.path);
          }
      }
    }
</script>

<style scoped>

</style>

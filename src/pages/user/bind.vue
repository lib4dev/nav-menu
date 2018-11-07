<template>
    <div>
      <button @click="add">
        添加一个标签
      </button>

    </div>
</template>

<script>
    export default {
      name: "bind",
      data(){
        return {
          name:1,
          path:"/user",
        }
      },
      methods:{
          add(){
            this.$emit('addTab',this.name,this.path);
          }
      }
    }
</script>

<style scoped>

</style>

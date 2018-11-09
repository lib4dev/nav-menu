<template>
    <div>
      <h1>核销订单</h1>

      <button @click="addTab" class="btn btn-success" type="button">添加标签</button>
    </div>
</template>

<script>
    export default {
      name: "bind",
      data(){
        return {
          name:"新标签",
          path:"/"
        }
      },
      methods:{
          addTab(){
            this.$emit('addTab',this.name,this.path);
          }
      }
    }
</script>

<style scoped>

</style>

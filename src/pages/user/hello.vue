<template>
    <div>
      <button @click="close">
        删除一个标签
      </button>

    </div>
</template>

<script>
    export default {
      name: "hello",
      methods:{
        close(){
          this.$emit('closeTab',"hello","/user/hello");
        }
      }
    }
</script>

<style scoped>

</style>

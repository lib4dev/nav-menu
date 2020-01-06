<template>
    <div>
      <h1>
        资金流水
      </h1>
    </div>
</template>

<script>
    export default {
      data () {
        return {
          
        }
      },
      watch:{
        "$route.fullPath"(val) {
          console.log("----------", val);

        }
      },
      mounted(){

      }
    }
</script>

<style scoped>

</style>

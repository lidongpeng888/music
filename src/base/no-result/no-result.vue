<template>
    <div class="no-result">
      <div class="no-result-icon"></div>
      <p class="no-result-text">{{title}}</p>
    </div>
</template>

<script>
    export default {
        name: "no-result.vue",
        props:{
          title:String,
          default:''
        }
    }
</script>

<style scoped>

</style>

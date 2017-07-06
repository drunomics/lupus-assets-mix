<template>
    <div class="container">
      <h3>I'm an example component!</h3>
    </div>
</template>


<script>
    export default {
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>

<style lang="scss" scoped>
  .container {
    h3 {
      color: blue;
    }
  }
</style>

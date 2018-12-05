<template>
  <div id="app">
    <welcome/>
  </div>
</template>

<script>
import welcome from "./Welcome";

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
      welcome
  }
}
</script>

<style lang="scss">

</style>

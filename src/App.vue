<template>
  <div id="app">
    <auth/>
  </div>
</template>

<script>
import auth from "./Auth";

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
      auth
  }
}
</script>

<style lang="scss">

</style>

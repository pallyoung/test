<template>
  <app-header heading="首页"></app-header>
  <router-view></router-view>
</template>
<script>
import AppHeader from './Header'

export default {
  components: {
    AppHeader
  },
  events: {
    page: function (page) {
      console.log(page)
      this.$broadcast('page', page)
    }
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!'
    }
  }
}
</script>
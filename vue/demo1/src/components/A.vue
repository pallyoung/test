<template>
  <app-header></app-header>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import AppHeader from './Header'

export default {
  components: {
    AppHeader
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
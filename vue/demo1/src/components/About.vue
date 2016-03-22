<template>
	<app-header></app-header>
	<h1>
		{{content}}
	</h1>
</template>

<script>
import	AppHeader from './Header'

export default {
  components: {
    AppHeader
  },
  data () {
    return {
      content: 'about'
    }
  }
}
</script>
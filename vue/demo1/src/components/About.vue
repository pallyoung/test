<template>
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
  route: {
    data (transition) {
      console.log('data')
      this.$dispatch('page', '关于')
      transition.next()
    },
    activate (transition) {
      console.log('activate')
      transition.next()
    },
    deactivate (transition) {
      console.log('deactivate')
      transition.next()
    },
    canActivate (transition) {
      console.log('canActivate')
      transition.next()
    },
    canDeactivate (transition) {
      console.log('canDeactivate')
      transition.next()
    },
    canReuse (transition) {
      console.log('canReuse')
      transition.next()
    }
  },
  data () {
    return {
      content: 'about'
    }
  }
}
</script>
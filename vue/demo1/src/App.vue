<template>
  <router-view></router-view>
</template>

<script>
export default {
  events: {
    page: function (page) {
      console.log('page changed ' + page)
    }
  }
}
</script>

<style>
html {
  height: 100%;
}

body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-center;
  font-family: Helvetica, sans-serif;
  height: 100%;
}

#app {
  margin-top: -100px;
  max-width: 600px; 
  text-align: center;
}

.logo {
  width: 100px;
  height: 100px
}
</style>

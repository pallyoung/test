import Vue from 'vue'
import VueRouter from 'vue-router'
import RouterMap from './RouterMap'
import App from './App'

Vue.use(VueRouter)

let router = new VueRouter({
  hashbang: true,
  history: false,
  saveScrollPosition: true,
  transitionOnLoad: true,
  linkActiveClass: 'red'
})

router.map(RouterMap)

router.start(App, '#app')


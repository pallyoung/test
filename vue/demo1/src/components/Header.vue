<template>
	<h1>{{heading}}</h1>
	<ul id="header">
		<li><a href="#" v-link="{path:'/a/index'}">首页</a></li>
		<li><a href="#" v-link="{path:'/a/about'}">关于我们</a></li>
		<li><a href="#" v-link="{path:'/a/more'}">更多</a></li>
		<li><a href="#" v-link="{path:'/b/show'}">墙</a></li>
	</ul>
</template>
<style>
	#header:{
		height: 2rem;
		line-height: 2rem
	}
	#header>li{
		display: inline-block;
		height: 2rem;
		line-height: 2rem;
		width: 200px;
		text-align: center;
	}
</style>

<script>
export default {
  props: ['heading'],
  events: {
    page: function (page) {
      console.log('heading' + page)
      this.heading = page
    }
  },
  data () {
    return {}
  }
}
</script>
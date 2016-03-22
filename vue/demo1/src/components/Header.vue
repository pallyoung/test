<template>
	<ul id="header">
		<li><a href="#" v-link="{path:'/a'}">首页</a></li>
		<li><a href="#" v-link="{path:'/about'}">关于我们</a></li>
		<li><a href="#" v-link="{path:'/more'}">更多</a></li>
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
  data () {
    return {}
  }
}
</script>
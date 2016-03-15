//初速度为0的情况下模拟计算运动距离
//假设加速度a可以获取
(function() {
	 getA = function(t) {
		//获取当前a的方法
		return 2*t/1000;
	}

	getS = function(v,getA) {
		this.v = 0; //当前速度 默认单位是m/s
		this.delatV = 0; //前一时刻速度的增加值
		//this.t = t; //总时间  默认单位毫秒
		this.deltaT = 10; //10ms采样一次
		this.pt = 0; //流逝的时间
		if (v) {
			this.v = v;
		}
		this.s = 0;
		this.stop=false;
		this.getA=getA;
	}
	getS.prototype = {
		stop:function(){
			this.stop=true;
		},
		caluDeltaV: function() {
			this.delatV = this.deltaT / 1000 * this.getA(this.pt);
			return this.delatV;
		},
		updateV: function() {
			this.v += this.delatV;
			return this.v;
		},
		getS: function() {
			this.pt += this.deltaT;
			this.caluDeltaV();
			this.updateV();
			this.s = this.s + (2 * this.v - this.delatV) * this.deltaT / 2000;
			console.log("已经运动了"+this.s+"米");
			return this.s;

		},
		getSA: function() {
			var that = this;
			this.getS();
			if (/*!this.stop*/this.pt<14000) {
				setTimeout(function() {
					that.getSA.call(that);
				}, that.deltaT);
			}
		}
	}
	console.log(1223);
})()
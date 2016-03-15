fan6 = function(selector) {
	if (typeof selector == "string") {
		return new fan6.boxs.init(selector);
	} else {
		var a = new fan6.boxs.init();
		a.box = [selector];
		return a;
	}
};
//boxs对象构造函数，所有dom对象封装成在box数组里面
fan6.boxs = fan6.prototype = {
	box: [], //存储dom对象
	computedStyle: "", //计算后的样式
	constructor: fan6, //重新指回fan6
	init: function(selector) {
		if (selector == null) {
			return this;
		}
		var selectors = selector.split(/\s/);
		var l = selectors.length;
		var box = [document];
		for (var i = 0; i < l; i++) {
			var selector = selectors[i].replace(/\s/g, "");
			if (/^\./.test(selector)) {
				box = box[0].getElementsByClassName(selector.replace(/\./g, ""));
			} else if (/^#/.test(selector)) {
				var ibox = box[0].getElementById(selector.replace(/#/g, ""));
				box = [];
				box.push(ibox);
			} else {
				box = box[0].getElementsByTagName(selector);
			}
			if (!box[0]) {
				return this;
			}

		};
		this.box = Array.prototype.slice.call(box);
		this.computedStyle= document.defaultView.getComputedStyle(this.box[0], null) || this.box[0].currentStyle; //计算后的样式
	},
	//为fan6对象添加方法
	//和样式相关的方法
	//元素计算后的样式
	styleComputed: function(type) {
		return this.computedStyle[type];
	},
	styleValue: function(type) {
		if (this.box[0].style.getPropertyValue(type)) {
			return this.box[0].style.getPropertyValue(type);
		}
		return undefined;
	},
	styleAdd: function(type, style) {
		var l = this.box.length;
		for (var i = 0; i < l; i++) {
			this.box[i].style.setProperty(type, style);
		}
	},
	stylesAdd: function(style) {
		var l = this.box.length;
		var styles;
		for (var i = 0; i < l; i++) {
			if (this.box[i].getAttribute("style")) {
				if (/;$/.test(this.box[i].getAttribute("style"))) {
						styles = this.box[i].getAttribute("style") + style;
					}else {
						styles = this.box[i].getAttribute("style") + ";" + style;
					}; this.box[i].setAttribute("style", styles);
				} else {
					this.box[i].setAttribute("style", style);
				};
			};
		},
		//接受零个或者多个参数
	styleRemove: function() {
		var l = this.box.length;
		var al = arguments.length;
		for (var i = 0; i < l; i++) {
			if(al===0){
			this.box[i].removeAttribute("style");
			continue;
		}
		for (var j = 0; j < al; j++) {
				this.box[i].style.removeProperty(arguments[j]);
			}
		}
	},
	styleToggle: function(type, style1, style2) {
		var l = this.box.length;
		for (var i = 0; i < l; i++) {
			if (this.box[i].style.getPropertyValue(type) === style1) {
				this.box[i].style.setProperty(type, style2);
			} else {
				this.box[i].style.setProperty(type, style1);
			}
		}
	},
	//样式运动
	styleMove: function(type, fi, time) {
		if (parseFloat(fi).toString !== "NaN") {
			//var computedStyle = document.defaultView.getComputedStyle(this.box[0], null) || this.box[0].currentStyle;
			var reg = /\d([a-zA-Z]+)/
			var unit = "";
			if (reg.test(fi)) {
				unit = RegExp["$1"]
			}
			var start = parseFloat(this.computedStyle[type]);
			if (parseFloat(start).toString === "NaN") {
				start = 0;
			}
			var finalData = parseFloat(fi);
			var $type = type;
			var step = (finalData - start) * 10 / time; //设定每10ms运动一次
			var target = this.box[0];

			function process() {
				start += step;
				target.style.setProperty($type, start + unit);
				time = time - 10;
				if (time > 0) {
					setTimeout(process, 10);
				}
			}
			process();
		}

	},
	//和属性相关的方法
	//获取属性
	attr: function(attr) {
		return this.box[0].getAttribute(attr);
	},
	//设置属性，接受两个参数，第一个是属性类型，第二个是属性值
	attrSet: function(attr, value) {
		var l = this.box.length;
		for (var i = 0; i < l; i++) {
			this.box[i].setAttribute(attr, value);
		}
	},
	//添加属性,接受两个参数，第一个是属性类型，第二个是属性值
	//如果属性不存在则设置属性，如果属性存在则向后添加，
	//同样不能用来处理style
	//属性间用空格间隔
	attrAdd: function(attr, value) {
		var l = this.box.length;
		for (var i = 0; i < l; i++) {
			if (this.box[i].getAttribute(attr) != null) {
				var values = this.box[i].getAttribute(attr) + " " + value;
				this.box[i].setAttribute(attr, values);
			} else {
				this.box[i].setAttribute(attr, value);
			}
		}
	},
	//属性删除，接受多个个参数，第一个参数指定属性类型，后面的参数数指定需要删除的属性值
	//属性之间用空格间隔
	//主要是用来处理class属性的添加和删除
	//不能处理style属性
	attrRemove: function() {
		var l = this.box.length;
		var values, reg;
		for (var i = 0; i < l; i++) {
			if (arguments.length === 1) {
				this.box[i].removeAttribute(arguments[0]);
			} else {
				values = this.box[i].getAttribute(arguments[0]);
				reg = new RegExp("");
				for (var j = 1; j < arguments.length; j++) {
					reg = new RegExp("\\b" + arguments[j] + "\\b", "g");
					values = values.replace(reg, "").split(/\s+/).join(" ");
					this.box[i].setAttribute(arguments[0], values);
				}
			}
		}
	},
	//class属性相关的方法
	//获取
	classValue: function() {
		return this.box[0].className;
	},
	//添加 字符串
	classAdd: function(value) {
		var l = this.box.length;
		for (var i = 0; i < l; i++) {
			this.box[i].className = this.box[i].className + " " + value;
		}
	},
	//删除
	classRemove: function() {
		var l = this.box.length;
		for (var i = 0; i < l; i++) {
			if (arguments.length>0) {
				for(var j=0;j<arguments.length;j++){
					this.box[i].className = this.box[i].className.replace(new RegExp("\\b"+ arguments[j] + "\\b","g"), "");
				}
			} else {
				this.box[i].removeAttribute("class");
			}
		}
	},
	classToggle:function(class1){
		var l = this.box.length;
		var reg = new RegExp("\\b" + class1 + "\\b", "g");
		for (var i = 0; i < l; i++) {
			if (reg.test(this.box[i].className)) {
				this.box[i].className = this.box[i].className.replace(reg, "");
			} else {
				this.box[i].className = this.box[i].className + " " + class1;
			}
		}
	},
	//获取元素的序号
	index: function() {
		for (var i = 0; i < this.box[0].parentNode.children.length; i++) {
			if (this.box[0] === this.box[0].parentNode.children[i]) {
				return i;
			}
		};
	},
	//和事件相关的方法
	//事件添加
	eventAdd: function(type, fn) {
		var l = this.box.length;
		fan6.events.add(fn);
		for (var i = 0; i < l; i++) {
			this.box[i].addEventListener(type, fan6.events.gets(fn), false);
		}
	},
	//事件移除,事件移除之后，保存fan6.events里面的函数暂时不能删除，要当心内存泄露,如需要删除 需要调用fan6.events.del()
	eventRemove: function(type, fn) {
		var l = this.box.length;
		for (var i = 0; i < l; i++) {
			this.box[i].removeEventListener(type, fan6.events.gets(fn), false);
		}
	},
	//元素位置相关的方法
	//offset
	//offsetLeft
	offsetLeft: function() {
		var box = this.box[0];
		var offsetLeft = this.box[0].offsetLeft;
		while (this.box.offsetParent) {
			offsetLeft += this.box[0].offsetLeft;
			box = this.box.offsetParent
		}
		return offsetLeft;
	},
	//offsetRight
	offsetRight: function() {
		var box = this.box[0];
		var offsetRight = 0;
		var x = this.box[0].offsetWidth;
		var offsetLeft = this.box[0].offsetLeft;
		while (this.box.offsetParent) {
			offsetLeft += this.box[0].offsetLeft;
			box = this.box.offsetParent
		}
		offsetRight = document.documentElement.offsetWidth - offsetLeft - x;
		return offsetRight;
	},
	//offsetTop
	offsetTop: function() {
		var box = this.box[0];
		var offsetTop = this.box[0].offsetTop;
		while (this.box.offsetParent) {
			offsetTop += this.box[0].offsetTop;
			box = this.box.offsetParent
		}
		return offsetTop;
	},
	//offsetWidth
	offsetWidth: function() {
		return this.box[0].offsetWidth;
	},
	//offsetHeight
	offsetHeight: function() {
		return this.box[0].offsetHeight;
	},
	//scrollTop待扩展
	scrollTop: function() {
		return this.box[0].scrollTop;
	},
	//scrollLeft 待扩展
	scrollLeft: function() {
		return this.box[0].scrollLeft;
	},
}
fan6.boxs.init.prototype=fan6.boxs;
//存储所有事件的对象，用于事件添加和删除
fan6.events = function() {
	var events = {}
	return {
		add: function(fn) {
			var fu = fn;
			var fns =  fu.toString().replace(/\W+/g,"") ;
			if (!events[fns]) {
				events[fns] = fn;
			};
		},
		del: function(fn) {
			var fu = fn;
			var fns =  fu.toString().replace(/\W+/g,"") ;
			if (!events[fns]) {
				delete events[fns];
			}
		},
		gets: function(fn) {
			var fu = fn;
			var fns =  fu.toString().replace(/\W+/g,"") ;
			return events[fns];
		}
	}
}()

//工具类对象
//遮罩层
//构造函数接受三个参数，分别代表遮罩层，背景层和内容层
fan6.overlay = function(overlays, backs, forwards) {
	if(this===fan6){
		return null;
	};
	if(arguments.length!==3){
		return null;
	}
	this.overlay = overlays;
	this.back = backs;
	this.forward = forwards;
	var computedStyle = document.defaultView.getComputedStyle(this.forward, null) || this.forward.currentStyle;
	this.forwardX = parseInt(computedStyle.width);
	this.forwardY = parseInt(computedStyle.height);
}
//为遮罩层添加方法
//弹出方法
fan6.overlay.prototype = {
	show: function() {
		//获取窗口的高度和宽度
		var x = document.documentElement.clientWidth;
		var y = document.documentElement.clientHeight;
		//获取文档的高度
		var dx = (document.body.clientWidth >= document.documentElement.clientWidth) ? document.body.clientWidth : document.documentElement.clientWidth;
		var dy = (document.body.clientHeight >= document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
		//确定内容层的位置
		var l = (x - this.forwardX) / 2 + document.body.scrollLeft || document.documentElement.scrollLeft;
		var t = (y - this.forwardY) / 2 + document.body.scrollTop || document.documentElement.scrollTop;
		if (t < 0) {
			t = 0;
		};
		if (l < 0) {
			l = 0;
		};
		if (dx < this.forwardX) {
			dx = this.forwardX;
		};
		if (dy < this.forwardY) {
			dy = this.forwardY;
		};
		//条件允许的话 阻止页面滚动
		if (x >= this.forwardX && y >= this.forwardY) {
			document.body.style.overflow = "hidden";
			document.body.onmousewheel = function(e) {
				e.preventDefault();
				//ie下
				e.returnValue = false;
			}
		}
		this.overlay.style.display = "block";
		this.back.style.width = dx + "px";
		this.back.style.height = dy + "px";
		this.forward.style.top = t + "px";
		this.forward.style.left = l + "px";

	},
	//遮罩层隐藏
	hidden : function() {
		this.overlay.style.display = "none";
		document.body.style.overflow = "auto";
		document.body.onmousewheel = null;
	}
}
//拖拽对象
//不复制对象版本
fan6.dragBox = function(dom) {
	if(this===fan6){
		return null;
	};
	if(!dom){
		return null;
	}
	if (dom instanceof fan6.boxs.init) {
		this.dragBox = dom, this.style = dom.box[0].style;
	} else {
		this.dragBox = fan6(dom), this.style = dom.style;
	}
	this.mouseX;
	this.mouseY; //初始鼠标值
	this.eventOut; //控制对象移动间隔
	this.fn = function() {
		return true
	}; //控制是否执行拖拽的函数
	if (arguments.length > 1) {
		this.fn = arguments[1];
	}
	var that = this;
	this.dragBox.eventAdd("mousedown", function(e) {that.dragStart(e, that.fn)});
	this.dragBox.eventAdd("mouseup", function(e) {that.dragEnd(e)});
	this.dragBox.eventAdd("mouseout", function(e) {that.dragEnd(e)});
}
fan6.dragBox.prototype = {
	//拖拽开始
	dragStart: function(e, fn) {
		if (fn(event)) {
			this.mouseX = e.clientX, this.mouseY = e.clientY;
			this.style.position = "relative";
			if (!this.style.top) {
				this.style.top = "0";
			};
			if (!this.style.left) {
				this.style.left = "0";
			};
			this.top = parseInt(this.style.top);
			this.left = parseInt(this.style.left);
			var that = this;
			this.dragBox.eventAdd("mousemove", function(e) {that.draging(e)});
		};

	},
	//拖拽中
	draging: function(e) {
		clearTimeout(this.eventOut);
		var that = this;
		eventOut = setTimeout(drag, 20);

		function drag() {
			if (that.dragC) {
				that.style.top = that.top + e.clientY - that.mouseY + "px";
				that.style.left = that.left + e.clientX - that.mouseX + "px";
			};
		};
	},
	//拖拽结束
	dragEnd: function(e) {
		this.dragBox.eventRemove("mousemove", function(e) {that.draging(e)});
	},
	//析构函数 无法释放对象自身
	finalize : function() {
		this.dragBox.eventRemove("mousedown", function(e) {that.dragStart(e, that.fn)});
		this.dragBox.eventRemove("mouseup", function(e) {that.dragEnd(e)});
		this.dragBox.eventRemove("mouseout", function(e) {that.dragEnd(e)});
		fan6.events.del(function(e) {that.dragStart(e, that.fn)});
		fan6.events.del(function(e) {that.dragEnd(e)});
		fan6.events.del(function(e) {that.dragEnd(e)});
		//delete arguments.callee.caller;
	}
}
//选项卡切换对象
//构造tabBox对象
//tab为标签页，content为内容页，指定为fan6对象,fn指定选项卡切换时候的样式
fan6.tabBox=function(tab,content,type,fn){
	if(this===fan6){
		return;
	};
	this.tab=tab;
	this.content=content;
	this.fn=function(){};
	this.type=type;
	if(fn){
		this.fn=fn;
	};
	var that=this;
	this.stepX=0;
	this.stepY=0;   
	this.tab.eventAdd(this.type,function(e){that.switch(e);});

}
fan6.tabBox.prototype={
	//切换事件
	//
	switch:function(e){
       var target=e.srcElement;
       var index=fan6(target).index();
       var offsetWidth=this.content.offsetWidth(),//内容页的长宽
	       offsetHeight=this.content.offsetHeight(),
	       subOffsetWidth=fan6(this.content.box[0].children[0]).offsetWidth(),
	       subOffsetHeight=fan6(this.content.box[0].children[0]).offsetHeight(),
	       XL=(subOffsetWidth/offsetWidth===1)?0:subOffsetWidth/offsetWidth,
	       YL=(subOffsetHeight/offsetHeight===1)?0:subOffsetHeight/offsetHeight;
	   this.stepX= XL*offsetWidth;
	   this.stepY=YL*offsetHeight;   
       this.fn(e);
       this.content.styleAdd("right",index*this.stepX+"px");
       this.content.styleAdd("top",-index*this.stepY+"px");
	},
	//析构函数，取消dom和事件之间的关系
	finalize:function(){
		this.tab.eventRemove(this.type,function(e){that.switch(e)});
		fan6.events.del(function(e){that.mouseover(e)});
	}
}
//fan6静态方法
//表单相关
//cookies相关
fan6.cookieSet = function (sname, svalue, oexpires, spath, sdomain, bsecure) {
    var scookie = sname + "=" + encodeURIComponent(svalue);
    if (oexpires) {
        scookie += "; expires=" + oexpires.toGMTString();
    }
    if (spath) {
        scookie += "; path=" + spath;
    }
    if (sdomain) {
        scookie += "; domain=" + sdomain;
    }
    if (bsecure) {
        scookie += "; secure";
    }
    document.cookie = scookie;
}
fan6.cookieGet = function (s) {
    var sRE = "(?:; )?" + s + "=([^;]*);?"
    var oRE = new RegExp(sRE);
    if (oRE.test(document.cookie)) {
        return decodeURIComponent(RegExp["$1"]);
    }
    else {
        return null;
    }
}
fan6.cookieDelete = function (s) {
    document.cookie = (s, "", new Date(0));
}
//判断两个dom对象是否碰撞
fan6.crashIf = function(dom1, dom2) {
	var $dom1, $dom2;
	var $left = 0,
		$top = 0,
		$width = 0,
		$height = 0;
	if (dom1 instanceof fan6.boxs.init) {
		$dom1 = dom1;
	} else {
		$dom1 = fan6(dom1)
	};
	if (dom2 instanceof fan6.boxs.init) {
		$dom2 = dom2;
	} else {
		$dom2 = fan6(dom2)
	};
	$left = $dom1.offsetLeft() - $dom2.offsetLeft();
	$top = $dom1.offsetTop() - $dom2.offsetTop();
	if ($left >= 0) {
		$width = $dom2.offsetWidth();
	} else {
		$width = $dom1.offsetWidth();
		$left = -$left;
	};
	if ($top >= 0) {
		$height = $dom2.offsetHeight();
	} else {
		$height = $dom1.offsetHeight();
		$top = -$top;
	};
	return ($top <= $height) && ($left <= $width);
}


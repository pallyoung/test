/*命名规则*/
/*1:方法名及变量名采用首字母小写
2：
3：局部变量以$开头*/
fan6 = function(selector) {
    return new fan6.boxs.init(selector);
};
//boxs对象构造函数，所有dom对象封装成在box数组里面
fan6.boxs = fan6.prototype = {
    box: [], //存储dom对象
    computedStyle: "", //计算后的样式
    constructor: fan6, //重新指回fan6
    init: function (selector) {
        var selectors = [],
                l = 0,
                boxs = [],
                boxsTemp = [],
                selectorTemp = "",
                selectorCount = 0,
                bjl = 0,
                objN = null;
        if (selector instanceof Node) {
            this.box[0] = selector;
        }
        else if (selector instanceof NodeList) {
            this.box = Array.prototype.slice.call(selector);
        }
        else if (typeof selector === "string") {
            selectors = selector.split(/\s+/);
            l = selectors.length;
            //确保选择器不为空
            while (selectorTemp === "") {
                selectorTemp = selectors[selectorCount].replace(/\s/g, "");
                selectorCount = selectorCount + 1;
                if (selectorCount > l) {
                    return null;
                }
            }
            //做第一次选择
            if (/^\./.test(selectorTemp)) {
                boxs = Array.prototype.slice.call(document.getElementsByClassName(selectorTemp.replace(/\./, "")));
            } else if (/^#/.test(selectorTemp)) {
                boxs.push(document.getElementById(selectorTemp.replace(/#/, "")));
            } else {
                boxs = Array.prototype.slice.call(document.getElementsByTagName(selectorTemp));
            }
            //循环遍历子元素

            for (var i = selectorCount; i < l; i++) {
                if (!boxs[0]) {
                    return null
                }
                selectorTemp = selectors[i].replace(/\s/g, "");
                if (selectorTemp === "") {
                    continue;
                }
                for (var j = 0; j < boxs.length; j++) {
                    bjl = boxs[j].children.length;
                    if (/^\./.test(selectorTemp)) {
                        for (var k = 0; k < bjl; k++) {
                            if (new RegExp("\\b" +selectorTemp.replace(/\./, "").toUpperCase()+"\\b").test(boxs[j].children[k].className.toUpperCase())){
                                boxsTemp.push(boxs[j].children[k]);
                            }
                        }
                    } else if (/^#/.test(selectorTemp)) {
                        for (var k = 0; k < bjl; k++) {
                            if (boxs[j].children[k].id.toUpperCase() === selectorTemp.replace(/#/, "").toUpperCase()) {
                                boxsTemp.push(boxs[j].children[k]);
                            }
                        }
                    } else {
                        for (var k = 0; k < bjl; k++) {
                            if (boxs[j].children[k].tagName.toUpperCase() === selectorTemp.toUpperCase()) {
                                boxsTemp.push(boxs[j].children[k]);
                            }
                        }
                    }
                }
                boxs = boxsTemp;
                boxsTemp = [];
            };
            this.box = boxs;
        }
        else if(selector instanceof fan6){
        	return selector;

        } 
        else{
            return null;
        }
        if (!this.box[0]) {
            return null
        }
        this.computedStyle = window.getComputedStyle(this.box[0], null) || this.box[0].currentStyle; //计算后的样式
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
        if (al === 0) {
            for (var i = 0; i < l; i++) {			
                this.box[i].removeAttribute("style");
            }
        } else {
            for (var i = 0; i < l; i++) {
                for (var j = 0; j < al; j++) {
                    this.box[i].style.removeProperty(arguments[j]);
                }
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
            var step=[];
            var finalData = parseFloat(fi);
            var $type = type;
            var reg = /\d([a-zA-Z]+)/;
            var unit = "";
            if (reg.test(fi)) {
                unit = RegExp["$1"]
            }
            var start = [];
            var target = [];
            var $time = time;
            //var computedStyle = document.defaultView.getComputedStyle(this.box[0], null) || this.box[0].currentStyle;
            for (var i = 0; i < this.box.length; i++) {
                target.push(this.box[i]);
                start.push(parseFloat(fan6(target[i]).computedStyle[type]));
                if (parseFloat(start[i]).toString() === "NaN") {
                    start[i] = 0;
                }         
                step.push((finalData - start[i])*10 / $time);
                
            }

            //运动过程
            //设定每10ms运动一次
            
            function process() {
                $time = $time - 10;
                if ($time > 0) {
                    setTimeout(process, 10);
                }
                for (var i = 0; i < target.length; i++) {
                    start[i] += step[i];
                    target[i].style.setProperty($type, start[i] + unit);
                }
                
                
            }
            setTimeout(process, 10);
        }
    },
    //和属性相关的方法
    //设置或获取属性，接受一个或两个参数，第一个是属性类型，第二个是属性值
    attr: function (attr, value) {
        var l = this.box.length;
        if (arguments.length === 1) {
            return this.box[0].getAttribute(attr);
        } else {
            for (var i = 0; i < l; i++) {
                this.box[i].setAttribute(attr, value);
            }
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
    //属性删除，接受一个或者多个参数，第一个参数指定属性类型，后面的参数数指定需要删除的属性值
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
                    this.box[i].className = this.box[i].className.toLowerCase().replace(new RegExp("\\b"+ arguments[j].toLowerCase() + "\\b","g"), "");
                }
            } else {
                this.box[i].removeAttribute("class");
            }
        }
    },
	classToggle: function(class1, class2) {
		var l = this.box.length;
		var reg1 = new RegExp("\\b" + class1.toLowerCase() + "\\b", "g");
		var reg2="";
		var className = "";

		for (var i = 0; i < l; i++) {
		    className = this.box[i].className.toLowerCase();
			if (reg1.test(className)) {
				className = className.replace(reg1, "");
				if (arguments.length === 2) {
				    className = className.replace(/\s{2,}/g," ")+" " + class2;
				}
				this.box[i].className = className;
			} else {
			    if (arguments.length === 2) {
			        reg2 = new RegExp("\\b" + class2.toLowerCase() + "\\b", "g");
					className = className.replace(reg2, "");
				}
			    this.box[i].className = className.replace(/\s{2,}/g, " ") + " " + class1;

			}

		}
	},
    //获取第一个元素的序号
    index: function() {
        for (var i = 0; i < this.box[0].parentNode.children.length; i++) {
            if (this.box[0] === this.box[0].parentNode.children[i]) {
                return i;
            }
        };
    },
    //删除自己
    remove:function(){
        var l = this.box.length;
        for (var i = 0; i < l; i++) {
            this.box[i].parentElement.removeChild(this.box[i]);
        }
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
    //事件切换
    //事件一和事件二依次切换
    eventToggle: function (type, fn1, fn2) {
        var $fn1 = fn1;
        var $fn2 = fn2;
        var temp = function () { };
        function fu () {
            $fn1();
            temp = $fn1;
            $fn1 = $fn2;
            $fn2 = temp;
            
        }
        fan6.events.add(fu);
        this.eventAdd(type,fu);

    },
    //元素位置相关的方法
    //offset
    //offsetLeft
    offsetLeft: function() {
        var box = this.box[0];
        var offsetLeft = 0;
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
        var offsetLeft = 0;
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
        var offsetTop = 0;
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
        this.dragBox = fan6(dom), this.style = dom.box[0].style;
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
    this.stepY = 0;
    this.left = (parseInt(this.content.computedStyle["left"]).toString() !== "NaN") ?  parseInt(this.content.computedStyle["left"]) : 0;
    this.right = (parseInt(this.content.computedStyle["right"]).toString() !== "NaN") ?  parseInt(this.content.computedStyle["right"]) : 0;
    this.top = (parseInt(this.content.computedStyle["top"]).toString() !== "NaN") ?parseInt( this.content.computedStyle["top"]) : 0;
    this.bottom =(parseInt( this.content.computedStyle["bottom"]).toString() !== "NaN") ? parseInt(this.content.computedStyle["bottom"]) : 0;
    this.tab.eventAdd(this.type,function(e){that.switch(e);});

}
fan6.tabBox.prototype={
    //切换事件
    //
    switch:function(e){
        var target=e.target;
        var index = fan6(target).index();
        if (target === e.currentTarget) {
            return false;
        }
        var offsetWidth=this.content.offsetWidth(),//内容页的长宽
            offsetHeight=this.content.offsetHeight(),
            subOffsetWidth=fan6(this.content.box[0].children[0]).offsetWidth(),
            subOffsetHeight=fan6(this.content.box[0].children[0]).offsetHeight(),
            XL=(subOffsetWidth/offsetWidth===1)?0:subOffsetWidth/offsetWidth,
            YL=(subOffsetHeight/offsetHeight===1)?0:subOffsetHeight/offsetHeight;
        this.stepX= XL*offsetWidth;
        this.stepY=YL*offsetHeight;   
        this.fn(e);
        if (this.left === 0) {
            this.content.styleAdd("right", index * this.stepX + this.right + "px");
        } else {
            this.content.styleAdd("left", -index * this.stepX + this.left+ "px");
        }
        if (this.bottom === 0) {
            this.content.styleAdd("top", -index * this.stepY + this.top + "px");
        } else {
            this.content.styleAdd("bottom", index * this.stepY + this.bottom + "px");
        }
    },
    //析构函数，取消dom和事件之间的关系
    finalize:function(){
        this.tab.eventRemove(this.type,function(e){that.switch(e)});
        fan6.events.del(function(e){that.mouseover(e)});
    }
}
//永远保持在顶部的dom对象
fan6.keepTopBox = function (dom) {
    this.dom = fan6(dom).box[0];
    this.offsetTop =0;
    this.offsetLeft = 0;
    this.windowOffsetWidth=document.documentElement.offsetWidth;
    this.getOffset();
    this.run = null;
}
fan6.keepTopBox.prototype = {
    init: function () {
        var that = this;
        function scroll() {
            if (that.whetherResize()) {
                that.getOffset();
            }
            if (document.body.scrollTop || document.documentElement.scrollTop > that.offsetTop) {
                that.dom.style.position = "fixed";
                that.dom.style.top = "0px";
                that.dom.style.left = that.offsetLeft.toString()+"px";
            } else {
                that.dom.style.position = "static";
            }
            that.run = setTimeout(scroll, 5);
        }
        scroll();
    },
    getOffset: function () {
        var $dom =this.dom;
        this.offsetTop =0;
        this.offsetLeft = 0;
        while ($dom.offsetParent) {
            this.offsetTop += $dom.offsetTop;
            this.offsetLeft += $dom.offsetLeft;
            $dom = $dom.offsetParent;
        }
    },
    whetherResize:function(){
        if (this.windowOffsetWidth === document.documentElement.offsetWidth) {
            return false;
        } else {
            this.windowOffsetWidth = document.documentElement.offsetWidth;
            return true;
        }
    },
    finalize: function () {
        clearTimeout(this.run);
        this.dom = null;
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
//queryString方法，获取或者设置url的get参数
fan6.queryString=function(wd){
    var $url=document.location.href;
    var $regString="[\\?&]"+wd+"=([^&]+)(&|\\b)";
    var $reg = new RegExp($regString);
    var temp = "";
    if ($reg.test($url)) {
        temp = RegExp["$1"];
        if (arguments.length == 1) {
            return temp;
        }
        else {            
            $url=$url.replace(new RegExp("=" + temp + "(\\b)"), "=" + encodeURIComponent(arguments[1]));
            document.location.href = $url;
        }
    } else {
        return undefined;
    }

}
//callJs异步加载js
fan6.callJs=function(s) {
    var xhr = new XMLHttpRequest();
    xhr.open("get", s, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.text = xhr.responseText;
                document.getElementsByTagName("head")[0].appendChild(script);
            }
        }
    }
    xhr.send();
}
//判断两个dom对象是否碰撞
fan6.crashIf = function(dom1, dom2) {
    var $left = 0,
		$top = 0,
		$width = 0,
		$height = 0;
        $dom1 = fan6(dom1)
        $dom2 = fan6(dom2)

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

//Modules.js
//公共方法
(function() {
	var Const = {
		IMPORTS: "@imports"
	}
	var File = function(url, cb) {
		this.text = "";
		this.loaded = false;
		this.load(this, url, cb);
	}
	File.prototype = {
		load: function(self, url, cb) {
			var iframe = document.createElement("iframe");
			iframe.onload = function(e) {
				var text = e.target.contentDocument.body.innerText;
				document.body.removeChild(e.target);
				self.text = text;
				this.loaded = true;
				cb(text);
			};
			iframe.onerror = function() {
				throw new Error(url + "加载失败");
			};
			iframe.src = url;
			iframe.style.display = "none";
			document.body.appendChild(iframe);
		}
	}
	var Imports = {
		importsCode: Const.IMPORTS,
		hasImports: function(content) {
			var classNameReg = new RegExp("[\\b]?\\/\\/" + Imports.importsCode + "\\s+([\\w\\.]+)[\\n\\s\\b]?");
			var className = "";
			if (classNameReg.test(content)) {
				className = RegExp["$1"];
				return className;
			} else {
				return null;
			}
		},
		parse: function(content) {

			var scriptContent = null;
			var classname = Imports.hasImports(content);
			if (classname !== null) {
				content=content.replace(Imports.importsCode, "");
				Imports.get(classname, function(newcontent) {
					content = newcontent +";\n\r"+ content;
					Imports.parse(content);
				});
			} else {
				scriptContent = document.createElement("script");
				scriptContent.innerHTML=";"+content+";";
				// scriptContent.type = "text/javascript";
				// scriptContent.innerHTML = content;
				document.body.appendChild(scriptContent);
			}
		},
		get: function(className, cb) {
			console.log(window[className]);
			try{
				if(eval(className)===undefined){
					new File(Modules.mainsrc + "/" + className + ".js", cb);
				}				
			}catch(e){
				new File(Modules.mainsrc + "/" + className + ".js", cb);
			}
			
		}
	};
	window.Modules = {
		//版本号
		version: "1.0",
		//标识路径
		mainsrc: "",
		imports: function(className) {
			Imports.get(className, Imports.parse);
		}

	}
})()
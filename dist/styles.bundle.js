webpackJsonp([2,4],{

/***/ 235:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),

/***/ 245:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ 397:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(678);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(245)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../node_modules/postcss-loader/index.js!./GridSheet.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../node_modules/postcss-loader/index.js!./GridSheet.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 398:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(679);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(245)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../node_modules/postcss-loader/index.js!./Zero.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../node_modules/postcss-loader/index.js!./Zero.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 399:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(680);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(245)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../node_modules/postcss-loader/index.js!./styles.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../node_modules/postcss-loader/index.js!./styles.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 678:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(235)();
// imports


// module
exports.push([module.i, ".container {\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n    max-width: calc(100% - 10px);\r\n    min-height: 100vh;\r\n    position:relative;\r\n    height:inherit;\r\n}\r\n.container-small{\r\n    min-height:inherit!important;\r\n}\r\n.container:after,.container-small:after{\r\n    content:'';\r\n    display:block;\r\n    clear:both;\r\n}\r\n.block-12{\r\n    width:calc( (100% / 12) * 12  - 20px );\r\n}\r\n.block-11 {\r\n    width: calc( (100% / 12) * 11 - 20px );\r\n}\r\n.block-10 {\r\n    width: calc( (100% / 12) * 10 - 20px );\r\n}\r\n.block-9 {\r\n    width: calc( (100% / 12) * 9 - 20px );\r\n}\r\n.block-8 {\r\n    width: calc( (100% / 12) * 8 - 20px );\r\n}\r\n.block-7 {\r\n    width: calc( (100% / 12) * 7 - 20px );\r\n}\r\n.block-6 {\r\n    width: calc( (100% / 12) * 6 - 20px );\r\n}\r\n.block-5 {\r\n    width: calc( (100% / 12) * 5 - 20px );\r\n}\r\n.block-4 {\r\n    width: calc( (100% / 12) * 4 - 20px );\r\n}\r\n.block-3 {\r\n    width: calc( (100% / 12) * 3 - 20px );\r\n}\r\n.block-2 {\r\n    width: calc( (100% / 12) * 2 - 20px );\r\n}\r\n.block-1 {\r\n    width: calc( (100% / 12) * 1 - 20px );\r\n}\r\n.block-1, .block-2, .block-3, .block-4, .block-5, .block-6, .block-7, .block-8, .block-9, .block-10, .block-11, .block-12 {\r\n    display: block;\r\n    float: left;\r\n    position: relative;\r\n    min-height: 1px;\r\n}\r\n.block-pad {\r\n    padding: 5px 10px;\r\n}\r\n.block-mar {\r\n    margin: 0px 10px;\r\n}\r\n.row:after\r\n{\r\n    display:block;\r\n    clear:both;\r\n    content:'';\r\n}\r\n\r\n.media-element {\r\n    display:inline-block;\r\n    vertical-align: text-top;\r\n    width: 100%;\r\n    height: auto;\r\n    margin: 0;\r\n    padding: 0;\r\n}\r\n.row{\r\n    display:block;\r\n    padding:2px 5px;\r\n    width:calc( 100% - 10px );\r\n}\r\n.slider{\r\n    width:100%;\r\n    height:100%;\r\n    display:block;\r\n    position:relative;\r\n    overflow:hidden;\r\n}\r\n.slider-child{\r\n    width:100%;\r\n    height:100%;\r\n    margin:0;\r\n    display:block;\r\n    position:relative;\r\n}\r\n.slider-child h3{\r\n    color:white;\r\n    font-weight:bold;\r\n    font-size:25px;\r\n    position:absolute;\r\n    bottom:25%;\r\n    left:20%;\r\n}\r\n.slider-child span\r\n{\r\n    color:white;\r\n    font-size:16px;\r\n    display:inline-block;\r\n    position:absolute;\r\n    bottom:15%;\r\n    left:25%;\r\n}\r\n.slider-child a{\r\n    color:inherit;\r\n    display:block;\r\n    position:absolute;\r\n    z-index:2;\r\n    width:100%;\r\n    height:100%;\r\n}\r\n.form{\r\n    width:inherit;\r\n    padding:4px;\r\n    position:relative;\r\n}\r\n.form-section{\r\n    display:block;\r\n    padding:3px 2px;\r\n}\r\n.form-section-header {\r\n    font-size: 26px;\r\n    font-weight: bold;\r\n    text-align:left;\r\n    text-indent:8px;\r\n    display:inline-block;\r\n    width:100%;\r\n    margin: 0 auto;\r\n    margin-bottom:8px;\r\n}\r\n.form-elem-ver,.form-elem-hor{\r\n    display:block;\r\n    width:100%;\r\n    margin:0;\r\n    float:right;\r\n    position:relative;\r\n    padding-top:10px;\r\n    padding-bottom:10px;\r\n    font-size:20px;\r\n}\r\n.form-elem-ver label,.form-elem-hor label{\r\n    font-size: 16px;\r\n}\r\n.form-elem-ver label {\r\n    display: block;\r\n    margin: 0;\r\n    margin-bottom: 15px;\r\n    width: 100%;\r\n    text-indent: 15px;\r\n}\r\n.form-elem-ver input, .form-elem-ver button, .form-elem-ver select,.form-elem-ver textarea {\r\n    border: 2px #addcff solid;\r\n    background-color: inherit;\r\n    border-radius: 5px;\r\n    padding: 4px;\r\n    font-size: 15px;\r\n    width: calc(100% - 12px);\r\n    display: block;\r\n    margin: 2px;\r\n}\r\n.form-elem-hor label {\r\n    display: inline-block;\r\n    margin: 2px;\r\n    margin-right:4px;\r\n    width: calc(40% - 10px);\r\n    text-indent: 1px;\r\n}\r\n.form-elem-hor input, .form-elem-hor button, .form-elem-hor select, .form-elem-hor textarea {\r\n    display: inline-block;\r\n    border: 2px #addcff solid;\r\n    background-color: inherit;\r\n    border-radius: 5px;\r\n    padding: 4px;\r\n    font-size: 15px;\r\n    width: calc(60% - 19px);\r\n    margin: 2px;\r\n}\r\n.form input[type=submit]\r\n{\r\n    display: block;\r\n    margin: 100px auto;\r\n    padding: 8px;\r\n    top: 30px;\r\n    position: relative;\r\n    font-size: 24px;\r\n    background-color: #ddeeff;\r\n    cursor:pointer;\r\n}\r\n.form input[type=file]{\r\n    border:none!important;\r\n}\r\n@media (max-width:445px) {\r\n    .block-1, .block-2, .block-3, .block-4, .block-5, .block-6, .block-7, .block-8, .block-9, .block-10, .block-11, .block-12 {\r\n        width: calc( (100% / 12) * 12 - 10px );\r\n        padding: 5px;\r\n        margin-top:5px;\r\n        margin-bottom:5px;\r\n    }\r\n}\r\n\r\n@media (min-width:570px) {\r\n    .container {\r\n        width: 540px;\r\n    }\r\n\r\n    .header, .footer {\r\n        min-height: 5vh;\r\n    }\r\n}\r\n\r\n@media (min-width:744px) {\r\n    .container {\r\n        width: 720px;\r\n    }\r\n}\r\n\r\n@media (min-width:990px) {\r\n    .container {\r\n        width: 960px;\r\n    }\r\n}\r\n\r\n@media (min-width:1200px) {\r\n    .container {\r\n        width: 1140px;\r\n    }\r\n}\r\n/*@media (min-width:1360px){\r\n    .container{\r\n        width:1320px;\r\n    }\r\n}\r\n@media (min-width:1500px) {\r\n    .container {\r\n        width: 1440px;\r\n    }\r\n}*/", ""]);

// exports


/***/ }),

/***/ 679:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(235)();
// imports


// module
exports.push([module.i, "html,body,div,section,nav,article,figure,header,footer,ul,ol,dl,dialog,details\r\n{\r\n    padding:0;\r\n    margin:0;\r\n    font-size:100%;\r\n    border:none;\r\n    width:auto;\r\n    height:auto;\r\n}\r\na,p,code,q,blockquote,em,param,pre,b,sub,sup,span,dd,li,br,abbr,mark,figcaption\r\n{\r\n    margin:0;\r\n    padding:0;\r\n    text-decoration:none;\r\n    font-style:normal;\r\n    font-weight:normal;\r\n    color:inherit;\r\n    font-size:100%;\r\n    text-indent:unset;\r\n}\r\nscript{\r\n    display:none!important;\r\n}\r\nul,ol\r\n{\r\n    list-style-type:none;\r\n    text-indent:0;\r\n}\r\nimg\r\n{\r\n    display:block;\r\n    width:initial;\r\n    height:initial;\r\n}\r\ninput[type=text],input[type=button],input[type=password],input[type=number],input[type=color],input[type=date],input[type=submit],input[type=email],input[type=tel],textarea{\r\n    border-radius:3px;\r\n    border:1px solid #addcff;\r\n    font-family:inherit;\r\n}", ""]);

// exports


/***/ }),

/***/ 680:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(235)();
// imports


// module
exports.push([module.i, "body {\n    font-family: 'Cabin';\n}\n.foot{\n    background: black;\n    position: relative;\n    padding: 35px 0px;\n}\n.sign {\n    text-align: center;\n    color: white;\n    font-size: 18px;\n    font-family: 'Lora';\n}", ""]);

// exports


/***/ }),

/***/ 730:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(399);
__webpack_require__(397);
module.exports = __webpack_require__(398);


/***/ })

},[730]);
//# sourceMappingURL=styles.bundle.map
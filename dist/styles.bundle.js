webpackJsonp([2,4],{

/***/ 241:
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

/***/ 252:
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

/***/ 402:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(685);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(252)(content, {});
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

/***/ 403:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(686);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(252)(content, {});
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

/***/ 404:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(687);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(252)(content, {});
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

/***/ 685:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(241)();
// imports


// module
exports.push([module.i, ".container {\n    margin-left: auto;\n    margin-right: auto;\n    max-width: calc(100% - 10px);\n    min-height: 100vh;\n    position:relative;\n    height:inherit;\n}\n.container-small{\n    min-height:inherit!important;\n}\n.container:after,.container-small:after{\n    content:'';\n    display:block;\n    clear:both;\n}\n.block-12{\n    width:calc( (100% / 12) * 12  - 20px );\n}\n.block-11 {\n    width: calc( (100% / 12) * 11 - 20px );\n}\n.block-10 {\n    width: calc( (100% / 12) * 10 - 20px );\n}\n.block-9 {\n    width: calc( (100% / 12) * 9 - 20px );\n}\n.block-8 {\n    width: calc( (100% / 12) * 8 - 20px );\n}\n.block-7 {\n    width: calc( (100% / 12) * 7 - 20px );\n}\n.block-6 {\n    width: calc( (100% / 12) * 6 - 20px );\n}\n.block-5 {\n    width: calc( (100% / 12) * 5 - 20px );\n}\n.block-4 {\n    width: calc( (100% / 12) * 4 - 20px );\n}\n.block-3 {\n    width: calc( (100% / 12) * 3 - 20px );\n}\n.block-2 {\n    width: calc( (100% / 12) * 2 - 20px );\n}\n.block-1 {\n    width: calc( (100% / 12) * 1 - 20px );\n}\n.block-1, .block-2, .block-3, .block-4, .block-5, .block-6, .block-7, .block-8, .block-9, .block-10, .block-11, .block-12 {\n    display: block;\n    float: left;\n    position: relative;\n    min-height: 1px;\n}\n.block-pad {\n    padding: 5px 10px;\n}\n.block-mar {\n    margin: 0px 10px;\n}\n.row:after\n{\n    display:block;\n    clear:both;\n    content:'';\n}\n\n.media-element {\n    display:inline-block;\n    vertical-align: text-top;\n    width: 100%;\n    height: auto;\n    margin: 0;\n    padding: 0;\n}\n.row{\n    display:block;\n    padding:2px 5px;\n    width:calc( 100% - 10px );\n}\n.slider{\n    width:100%;\n    height:100%;\n    display:block;\n    position:relative;\n    overflow:hidden;\n}\n.slider-child{\n    width:100%;\n    height:100%;\n    margin:0;\n    display:block;\n    position:relative;\n}\n.slider-child h3{\n    color:white;\n    font-weight:bold;\n    font-size:25px;\n    position:absolute;\n    bottom:25%;\n    left:20%;\n}\n.slider-child span\n{\n    color:white;\n    font-size:16px;\n    display:inline-block;\n    position:absolute;\n    bottom:15%;\n    left:25%;\n}\n.slider-child a{\n    color:inherit;\n    display:block;\n    position:absolute;\n    z-index:2;\n    width:100%;\n    height:100%;\n}\n.form{\n    width:inherit;\n    padding:4px;\n    position:relative;\n}\n.form-section{\n    display:block;\n    padding:3px 2px;\n}\n.form-section-header {\n    font-size: 26px;\n    font-weight: bold;\n    text-align:left;\n    text-indent:8px;\n    display:inline-block;\n    width:100%;\n    margin: 0 auto;\n    margin-bottom:8px;\n}\n.form-elem-ver,.form-elem-hor{\n    display:block;\n    width:100%;\n    margin:0;\n    float:right;\n    position:relative;\n    padding-top:10px;\n    padding-bottom:10px;\n    font-size:20px;\n}\n.form-elem-ver label,.form-elem-hor label{\n    font-size: 16px;\n}\n.form-elem-ver label {\n    display: block;\n    margin: 0;\n    margin-bottom: 15px;\n    width: 100%;\n    text-indent: 15px;\n}\n.form-elem-ver input, .form-elem-ver button, .form-elem-ver select,.form-elem-ver textarea {\n    border: 2px #addcff solid;\n    background-color: inherit;\n    border-radius: 5px;\n    padding: 4px;\n    font-size: 15px;\n    width: calc(100% - 12px);\n    display: block;\n    margin: 2px;\n}\n.form-elem-hor label {\n    display: inline-block;\n    margin: 2px;\n    margin-right:4px;\n    width: calc(40% - 10px);\n    text-indent: 1px;\n}\n.form-elem-hor input, .form-elem-hor button, .form-elem-hor select, .form-elem-hor textarea {\n    display: inline-block;\n    border: 2px #addcff solid;\n    background-color: inherit;\n    border-radius: 5px;\n    padding: 4px;\n    font-size: 15px;\n    width: calc(60% - 19px);\n    margin: 2px;\n}\n.form input[type=submit]\n{\n    display: block;\n    margin: 100px auto;\n    padding: 8px;\n    top: 30px;\n    position: relative;\n    font-size: 24px;\n    background-color: #ddeeff;\n    cursor:pointer;\n}\n.form input[type=file]{\n    border:none!important;\n}\n@media (max-width:445px) {\n    .block-1, .block-2, .block-3, .block-4, .block-5, .block-6, .block-7, .block-8, .block-9, .block-10, .block-11, .block-12 {\n        width: calc( (100% / 12) * 12 - 10px );\n        padding: 5px;\n        margin-top:5px;\n        margin-bottom:5px;\n    }\n}\n\n@media (min-width:570px) {\n    .container {\n        width: 540px;\n    }\n\n    .header, .footer {\n        min-height: 5vh;\n    }\n}\n\n@media (min-width:744px) {\n    .container {\n        width: 720px;\n    }\n}\n\n@media (min-width:990px) {\n    .container {\n        width: 960px;\n    }\n}\n\n@media (min-width:1200px) {\n    .container {\n        width: 1140px;\n    }\n}\n/*@media (min-width:1360px){\n    .container{\n        width:1320px;\n    }\n}\n@media (min-width:1500px) {\n    .container {\n        width: 1440px;\n    }\n}*/", ""]);

// exports


/***/ }),

/***/ 686:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(241)();
// imports


// module
exports.push([module.i, "html,body,div,section,nav,article,figure,header,footer,ul,ol,dl,dialog,details\n{\n    padding:0;\n    margin:0;\n    font-size:100%;\n    border:none;\n    width:auto;\n    height:auto;\n}\na,p,code,q,blockquote,em,param,pre,b,sub,sup,span,dd,li,br,abbr,mark,figcaption\n{\n    margin:0;\n    padding:0;\n    text-decoration:none;\n    font-style:normal;\n    font-weight:normal;\n    color:inherit;\n    font-size:100%;\n    text-indent:unset;\n}\nscript{\n    display:none!important;\n}\nul,ol\n{\n    list-style-type:none;\n    text-indent:0;\n}\nimg\n{\n    display:block;\n    width:initial;\n    height:initial;\n}\ninput[type=text],input[type=button],input[type=password],input[type=number],input[type=color],input[type=date],input[type=submit],input[type=email],input[type=tel],textarea{\n    border-radius:3px;\n    border:1px solid #addcff;\n    font-family:inherit;\n}", ""]);

// exports


/***/ }),

/***/ 687:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(241)();
// imports


// module
exports.push([module.i, "body {\n    font-family: 'Cabin';\n}\n.foot{\n    background: black;\n    position: relative;\n    padding: 35px 0px;\n}\n.sign {\n    text-align: center;\n    color: white;\n    font-size: 18px;\n    font-family: 'Lora';\n}", ""]);

// exports


/***/ }),

/***/ 739:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(404);
__webpack_require__(402);
module.exports = __webpack_require__(403);


/***/ })

},[739]);
//# sourceMappingURL=styles.bundle.map
var loader = require('html-tpl-loader');
window._ = require('lodash');
window.compile = function(){
	var js = document.getElementById('input-js').value;
	var tpl = document.getElementById('input-tpl').value;
	// Webpack Require Shim
	var require = function(url){
		if(url.indexOf('html-tpl') !== 0) {
			return;
		}
		var query = url.indexOf('?') > 0 ? url.replace(/^.+\?/, '?') : '';
		var module = {};
		eval(loader.call({query: query}, tpl));
		return module.exports;
	};
	// Execute js
	eval(js);
}
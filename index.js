// Ace Configuration
var ace = require('brace');
require('brace/mode/javascript');
require('brace/mode/html');
require('brace/theme/monokai');
var inputJs = ace.edit("input-js");
inputJs.setTheme("ace/theme/monokai");
inputJs.getSession().setMode("ace/mode/javascript");
var inputTpl = ace.edit("input-tpl");
inputTpl.setTheme("ace/theme/monokai");
inputTpl.getSession().setMode("ace/mode/html");

// Live demo
var loader = require('html-tpl-loader');
window._ = require('lodash');
window.compile = function () {
  var js = inputJs.getValue();
  var tpl = inputTpl.getValue();
  // Webpack Require Shim
  var require = function (url) {
    if (url.indexOf('html-tpl') !== 0) {
      return;
    }
    var query = url.indexOf('?') > 0 ? url.replace(/^.+\?/, '?') : '';
    var module = {};
    eval(loader.call({query: query}, tpl));
    return module.exports;
  };
  // Execute js
  eval(js);
};
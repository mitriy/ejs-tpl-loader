'use strict';
var _ = require('lodash');
var loaderUtils = require("loader-utils");
var htmlLoader = require('html-loader');

function inlineRequireStatements(javascript) {
  return javascript.replace(/(("(?:[^\\"]|\\.)*")|(require)\([^\)]+\))\s*\+?\s*/g,
      function(fullMatch, content, literal, submatch) {
        return submatch === 'require' ? '<%= ' + content + ' %>' : JSON.parse(content);
      });
}

module.exports = function (source) {
  var prefix = 'module.exports = ';

  var htmlLoaderResult = htmlLoader.apply(this, arguments);
  if (htmlLoaderResult.indexOf(prefix) !== 0) {
    throw new Error ('Invalid html-loader result');
  }
  var html = inlineRequireStatements(htmlLoaderResult.substr(prefix.length).replace(/;$/, ''));

  this.cacheable && this.cacheable();
  var options = loaderUtils.parseQuery(this.query);
  var template = _.template(html, options);
  return 'module.exports = ' + template;
};
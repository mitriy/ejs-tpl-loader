'use strict';
var _ = require('lodash');
var loaderUtils = require('loader-utils');
var htmlLoader = require('html-loader');

module.exports = function (source) {
  var prefix = 'module.exports = ';
  var query = _.extend({
    lodash: true,
    collapseWhitespace: false,
    removeOptionalTags: false
  }, loaderUtils.parseQuery(this.query));
  this.query = '?' + JSON.stringify(query);

  var htmlLoaderResult = htmlLoader.apply(this, arguments);
  if (htmlLoaderResult.indexOf(prefix) !== 0) {
    throw new Error ('Invalid html-loader result');
  }
  var html = inlineRequireStatements(htmlLoaderResult.substr(prefix.length).replace(/;$/, ''));

  var tplSettings = {};
  ['escape', 'interpolate', 'evaluate', 'variable'].forEach(function(tplSettingName) {
    if(typeof query[tplSettingName] === 'string') {
      tplSettings[tplSettingName] = new RegExp(query[tplSettingName], 'gm');
    }
  });

  var template = _.template(html, tplSettings);
  var jsSource = prefix + template;
  if (query.lodash) {
    jsSource = 'var _ = require(' + loaderUtils.stringifyRequest(this, require.resolve('lodash')) + ');\n' + jsSource;
  }
  return jsSource;
};

function inlineRequireStatements(javascript) {
  return javascript.replace(/(("(?:[^\\"]|\\.)*")|(require)\([^\)]+\))\s*\+?\s*/g,
    function(fullMatch, content, literal, submatch) {
      return submatch === 'require' ? '<%= ' + content + ' %>' : JSON.parse(content);
    });
}

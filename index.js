var _ = require('lodash');
var loaderUtils = require('loader-utils');
var htmlMinifier = require('html-minifier');

module.exports = function (source) {
  this.cacheable && this.cacheable();
  var query = loaderUtils.parseQuery(this.query);
  var minimize = query.minimize;
  if(typeof minimize === "boolean" ? minimize : this.minimize) {
    source = htmlMinifier.minify(source, {
      removeComments: query.removeComments !== false,
      collapseWhitespace: !!query.collapseWhitespace,
      collapseBooleanAttributes: query.collapseBooleanAttributes !== false,
      removeAttributeQuotes: query.removeAttributeQuotes !== false,
      removeRedundantAttributes: query.removeRedundantAttributes !== false,
      useShortDoctype: query.useShortDoctype !== false,
      removeEmptyAttributes: query.removeEmptyAttributes !== false,
      removeOptionalTags: !!query.removeOptionalTags
    });
  }

  var tplSettings = {};
  ['escape', 'interpolate', 'evaluate'].forEach(function(tplSettingName) {
    if(typeof query[tplSettingName] === "string") {
      tplSettings[tplSettingName] = new RegExp(query[tplSettingName], 'gm');
    }
  });

  var template = _.template(source, tplSettings);
  var jsSource = 'module.exports = ' + template;

  if (query.lodash) {
    jsSource = 'var _ = require("lodash");' + jsSource;
  }

  return jsSource;
};

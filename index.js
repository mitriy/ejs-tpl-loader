var _ = require('lodash');
var loaderUtils = require('loader-utils');
var htmlMinifier = require('html-minifier');

function parseBoolean(s) {
  return (s === 'true' || s === 'false') ? s === 'true' : s;
}

module.exports = function (source) {
  this.cacheable && this.cacheable();
  var query = loaderUtils.parseQuery(this.query);
  var minimize = parseBoolean(query.minimize);
  if(typeof minimize === "boolean" ? minimize : this.minimize) {
    source = htmlMinifier.minify(source, {
      removeComments: !!parseBoolean(query.removeComments),
      collapseWhitespace: !!parseBoolean(query.collapseWhitespace),
      collapseBooleanAttributes: !!parseBoolean(query.collapseBooleanAttributes),
      removeAttributeQuotes: !!parseBoolean(query.removeAttributeQuotes),
      removeRedundantAttributes: !!parseBoolean(query.removeRedundantAttributes),
      useShortDoctype: !!parseBoolean(query.useShortDoctype),
      removeEmptyAttributes: !!parseBoolean(query.removeEmptyAttributes),
      removeOptionalTags: !!parseBoolean(query.removeOptionalTags)
    });
  }

  var tplSettings = {};
  ['escape', 'interpolate', 'evaluate'].forEach(function(tplSettingName) {
    if(typeof query[tplSettingName] === "string") {
      tplSettings[tplSettingName] = new RegExp(query[tplSettingName], 'gm');
    }
  });

  var template = _.template(source, null, tplSettings);
  var jsSource = 'module.exports = ' + template;

  if (parseBoolean(query.lodash)) {
    jsSource = 'var _ = require("lodash");' + jsSource;
  }

  return jsSource;
};

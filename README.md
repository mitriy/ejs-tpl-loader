# Lodash html template for webpack

Combination of the html-loader and the underscore-loader for [webpack](http://webpack.github.io/). [Uses the `_.template` function](https://lodash.com/docs#template) to extract assets.

## Installation

`npm install webpack-ejs-loader --save-dev`

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

``` javascript
var template = require("html-tpl!./file.html");
// => returns the template function compiled with underscore (lodash) templating engine.

// And then use it somewhere in your code
template(data) // Pass object with data
```

Alternatively you can also define html-tpl in your webpack.config file:

``` javascript
  {
    module: {
      loaders: [
        { test: "\.tpl.html$", loader: "html-tpl" },
      ]}
  }
```

``` javascript
  var template = require('./file.tpl.html');
```

The html-tpl loader allows you to **minify** the html before compiling by setting a loader query string

``` javascript
  {
    module: {
      loaders: [
        { test: "\.tpl.html$", loader: "html-tpl?minimize=true" }
      ]
  }

```

The html-tpl loader allows you to not to add **lodash** before compiling by setting a loader query string

``` javascript
  {
    module: {
      loaders: [
        { test: "\.tpl.html$", loader: "html-tpl?lodash=false" }
      ]
  }
```

The html-tpl loader allows you to configure **lodash template settings** by setting a loader query string

``` javascript
  {
    module: {
      loaders: [
        { test: "\.tpl.html$", loader: "html-tpl?evaluate=\\{\\[([\\s\\S]+?)\\]\\}&interpolate=\\{\\{([\\s\\S]+?)\\}\\}" }
      ]
  }
```

## Tests

[![Build Status](https://secure.travis-ci.org/jantimon/html-tpl-loader.svg?branch=master)](http://travis-ci.org/jantimon/html-tpl-loader)

Run unit tests:

```
  npm install
  npm test
```

## Demo

http://jantimon.github.io/html-tpl-loader/

## License

MIT (http://www.opensource.org/licenses/mit-license.php)




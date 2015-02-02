# Lodash html template for webpack 
[![Build Status](https://secure.travis-ci.org/jantimon/html-tpl-loader.svg?branch=master)](http://travis-ci.org/jantimon/html-tpl-loader)  [![Dependency Status](https://david-dm.org/jantimon/html-tpl-loader.svg)](https://david-dm.org/jantimon/html-tpl-loader)

Fork of [tpl-loader](https://github.com/grassator/tpl-loader) from Andrey Okonetchnikov


Lodash html template loader for [webpack](http://webpack.github.io/). Uses `_.template` function to compile templates and allows minfification

## Installation

`npm install html-tpl-loader --save-dev`

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

``` javascript
var template = require("html-tpl!./file.html");
// => returns the template function compiled with undesrcore (lodash) templating engine.

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
The html-tpl loader allows you to require **lodash** before compiling by setting a loader query string

``` javascript
  {
    module: { 
      loaders: [
        { test: "\.tpl.html$", loader: "html-tpl?lodash=true" }
      ]
  }
```
  
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

# Tests

[![Build Status](https://secure.travis-ci.org/jantimon/html-tpl-loader.svg?branch=master)](http://travis-ci.org/jantimon/html-tpl-loader)

Run unit tests:

```
  npm install
  npm test
```



## License

MIT (http://www.opensource.org/licenses/mit-license.php)




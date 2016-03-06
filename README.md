# ejs-loader for webpack

EJS (Underscore/LoDash Templates) loader for [webpack](http://webpack.github.io/). Uses [lodash template](http://lodash.com/docs#template) function to compile templates.

If you are looking for the loader which uses [EJS templating engine](https://github.com/tj/ejs), there is [ejs-compiled-loader](https://github.com/bazilio91/ejs-compiled-loader)

## Installation

`npm install lodash-template-loader`

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

```javascript
var template = require("lodash-template!./file.ejs");
// => returns the template function compiled with undesrcore (lodash) templating engine.

// And then use it somewhere in your code
template(data) // Pass object with data
```

You also should provide a global `_` variable with the lodash/underscore runtime. You can do it with the following webpack plugin: https://github.com/webpack/docs/wiki/list-of-plugins#provideplugin

```javascript
plugins: [
    new webpack.ProvidePlugin({
        _: "underscore"
    })
]
```

### Compiler options

Query parameters allows to pass options for template compiller.

Config example:

```javascript
module.exports = {
  module: {
    loaders: [
      { test: /\.ejs$/, loader: "lodash-template?variable=data" },
    ]
  }
};
```
is equivalent to

```javascript
var template = _.template('<%= template %>', {variable: 'data'}); 
```

Also extra options may be passed to load static files, see [html-loader](https://github.com/webpack/html-loader#examples). 
This way any static files linked in templates will be included in final webpack bundle. Example:

```javascript
module.exports = {
  module: {
    loaders: [
      { test: /\.ejs$/, loader: "lodash-template?variable=data&attrs[]=img:src&attrs[]=source:src" },
    ]
  }
};
```

## Tests

Run unit tests:

```javascript
npm install
npm test
```


## License

MIT (http://www.opensource.org/licenses/mit-license.php)




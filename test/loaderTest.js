var should = require("should");
var loader = require("../");

function loadAndEval() {
	var module = {};
	eval(loader.call.apply(loader, arguments));
	return module.exports;
}

function loadFakeRequireAndEval() {
	var module = {};
	var require = function(path) {
		return 'loader(' + path + ')';
	}
	eval(loader.call.apply(loader, arguments));
	return module.exports;
}

describe("loader", function() {

	it("should allow to pass values", function() {
		loadAndEval({}, '<h1>Hello <%= name %></h1>')({name : 'Moon'}).should.be.eql(
			'<h1>Hello Moon</h1>'
		);
	});

		it("should convert to requires", function() {
			loadFakeRequireAndEval({}, '<h1>Hello World</h1><img src="test.png">')().should.be.eql(
				'<h1>Hello World</h1><img src=\"loader(./test.png)\">'
			);
		});

	it("should allow to minify html", function() {
		loadAndEval({
		   query: "?minimize=true"
		}, '<h1  >Hello <%= name %></h1>')({name : 'Moon'})
		.should.be.eql(
			'<h1>Hello Moon</h1>'
		);
	});

	it("should allow to minify html with data attributes", function() {
		loadAndEval({
		   query: "?minimize=true"
		}, '<h1 data-attr="<%= name %>">Hello</h1>')({name : 'Moon'})
		.should.be.eql(
			'<h1 data-attr="Moon">Hello</h1>'
		);
	});

	it("should allow to minify html and collapse whitespaces", function() {
		loadAndEval({
		   query: "?minimize=true&collapseWhitespace=true"
		}, '<div>\n<h1>Hello <span><%= name %></span></h1>\n</div>')({name : 'Moon'})
		.should.be.eql(
			'<div><h1>Hello <span>Moon</span></h1></div>'
		);
	});

	it("should allow to use bracket notation html", function() {
		loadAndEval({
		   query: "?evaluate=\\{\\[([\\s\\S]+?)\\]\\}&interpolate=\\{\\{([\\s\\S]+?)\\}\\}"
		}, '<h1>Hello {{ name }}</h1>')({name : 'Moon'})
		.should.be.eql(
			'<h1>Hello Moon</h1>'
		);
	});

	it("should allow to use lodash", function() {
		loadAndEval({}, '<% _.each(items, function(item){ %><%= item %><% }) %>')
		({items: [1, 2, 3, 4, 5]})
		.should.be.eql(
			'12345'
		);
	});

	it("should allow to use thhe lodash escape feature", function() {
		loadAndEval({}, '<%- "<>" %>')({})
		.should.be.eql(
			'&lt;&gt;'
		);
	});
});

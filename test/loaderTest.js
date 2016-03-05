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

});

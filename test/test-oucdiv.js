var assert = require('chai').assert,
	$ = require('jquery'),
    app = require('../src/js/oucdiv.js')
    ;

describe('oucdiv object', function() {

	var test = app.oucdiv();

	describe('oucdiv', function () {
		it('should set the source', function () {
			
			test.init("source15");
			assert.equal(test.source(), "source15");

		});

		it('should extract out the label of the div', function(){

			test.init('<ouc:div label="content-row-1-2" group="Everyone" button-text="Content Region">Hello World!<ouc:div>');
			assert.equal(test.label(), "content-row-1-2");
		});

	});
});
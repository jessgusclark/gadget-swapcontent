var jsdom = require("jsdom").jsdom;
global.window = jsdom().defaultView;
global.document = jsdom().defaultView;
global.jQuery = global.$ = require("jquery"); 

var assert = require('chai').assert,
	$ = require('jquery'),
    app = require('../dist/js/gadget.js')
    ;

describe('parser object', function() {

	// setup:
	var test = app.parser();

	// a standard ouc div:
	var string = '<ouc:div label="content-row-1-2" group="Everyone" button-text="Content Region"><ouc:editor csspath="/_resources/ou/editor/wysiwyg.css" cssmenu="/_resources/ou/editor/styles.txt" wysiwyg-class="left-content"/><p>Add content here</p></ouc:div>'

	describe('parser', function() {
		it('should remove extra content', function(){
			
			test.parse("Hello world!" + string + "whatever man!");
			test.equal()

		});
	});

});

(function () {

	var source;
	var label;

	var oucdiv = {
        create: function (s) {
        	this.source = s;
        	this.label = getLabelNameFromSource(s);

        }
    }

    // Extract the label tag:
    // <ouc:div label="content-row-4-2" group="Everyone" button-text="Content Region">
    function getLabelNameFromSource(s){

    	var start = s.indexOf('label="') + 7;
    	var end = s.substring(start).indexOf('"');

    	return s.substring(start, end + start);
    }


	// make the object available:
    window.oucdiv = oucdiv;

})();
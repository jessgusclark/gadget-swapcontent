module.exports.oucdiv = (function (s) {

	var _source;
	var _label;

    // Extract the label tag:
    // <ouc:div label="content-row-4-2" group="Everyone" button-text="Content Region">
    function getLabelNameFromSource(s){

    	var start = s.indexOf('label="') + 7;
    	var end = s.substring(start).indexOf('"');

    	return s.substring(start, end + start);
    }

    return {
        init: function(s){
            _source = s;
            _label = getLabelNameFromSource(s);
        },
        source: function(){
            return _source;
        },
        label: function(){
            return _label;
        }
    }
	// make the object available:
    //window.oucdiv = oucdiv;

});
module.exports.parser = (function (source) {
	
	var oucdiv = require("oucdiv");

	var _tagArray = [];

	// OU Pages aren't 100% XML and may fail when parsed, so the code below
	// uses regex. This also assumes that the editable regions are defined 
	// as <ouc:div></ouc:div>.
	return {
		
		parse: function(source){
			var str = source, re = re = /<ouc:div/g, match;
			while (match = re.exec(str)) {

				// start of the <ouc:div tag:
				var oucdiv_start = match.index;
				//var oucdiv_end = oucdiv_start + ( source.substring(oucdiv_start).indexOf(">")+1 );

			    // Close of the </ouc:div> tag:
			    var close_start = source.substring(oucdiv_start).indexOf("</ouc:div>");
			    
			    // Final character of the </ouc:div> tag:
			    var close_tag = oucdiv_start + close_start + 10;

			    // whole tag:
			    //console.log(oucdiv_start, close_tag);
			    //console.log(source.substring(oucdiv_start, close_tag));

			    // create object and push it to array:
			    /*var oucDiv = oucdiv.oucdiv();
			    oucDiv.create( source.substring(oucdiv_start, close_tag) )
			    _tagArray.push(
			    	
			    );*/
			}

			//console.log("Total Editable Regions: ", tagArray.length);
			//addRegionsToDropDowns();
		},
		allTags: function(){
			return _tagArray;
		}
	}

});

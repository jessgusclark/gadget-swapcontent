$(document).ready(function () {
	
	var apihost;
	var token;
	var site;
	var tagArray = [];

	gadget.ready().then(gadget.fetch).then(function () {

		apihost = gadget.get('apihost');
		token = gadget.get('token');
		site = gadget.get('site');

		console.log("Swap Gadget Ready!");

		//swap.init(apihost, token, site);
		
		// get current pages content:
		gadget.oucGetCurrentFileInfo().then(function (data) { 
			//console.log(data);
			getPageSource(data.stagingPath);
		});
	});

	function getPageSource(path){
		$.ajax({
    		type : 'GET', 
    		dataType : 'json', 
    		url : apihost + '/files/source', 
    		data : {
    			"authorization_token" : token,
    			site : 'www', 
    			path : path
    		},
    		success : function (data) {
    			parsePage(data.source);
    		},
    		error : function (data) {
    			console.log("Failed to get content", data, site);
    		}
        });
	}

	// OU Pages aren't 100% XML and may fail when parsed, so the code below
	// uses regex. This also assumes that the editable regions are defined 
	// as <ouc:div></ouc:div>.
	function parsePage(source){

		//console.log("parsing data:");

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
		    tagArray.push(
		    	new oucdiv.create( source.substring(oucdiv_start, close_tag) )
		    );
		}

		//console.log("Total Editable Regions: ", tagArray.length);
		addRegionsToDropDowns();
	}

	// global variable tagArray is looped through and the labels are
	// added to the source and destination dropdowns:
	function addRegionsToDropDowns(){
		for (i = 0; i < tagArray.length; i++) { 
    		$('#source').append( new Option( tagArray[i].label , i ) );
    		$('#destination').append( new Option( tagArray[i].label , i ) );
		}
	}

});

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

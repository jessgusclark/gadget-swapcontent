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
    			//parsePage(data.source);
    		},
    		error : function (data) {
    			console.log("Failed to get content", data, site);
    		}
        });
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

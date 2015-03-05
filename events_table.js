      window.onload = function() { init() };
      var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1RRZ_U3mcNJB3NpVmlW1F0KbIsJWkxmxMHgC8qYDchcs/pubhtml';
      function init() {
	$.get( "http://api.ieeeatuhm.com/events-mongo", function( data ) {
		console.log(JSON.stringify(data[0].events));
		showInfo(data);
	});
      }

      function render_table(data, headers){

      }

      function render_table_headers(headers){
        var table = "";
        var keys = Object.keys(headers);
	// Print the header
	table = table + "<thead>"
	table = table + "<tr>"
        for (key of keys){
            table = table + "<th>" + key + "</th>";
        }
	table = table + "</tr>"
	table = table + "</thead>"
        return table;
      }
      
      function render_table_row(headers, line){
        var table = "";
        var keys = Object.keys(headers);
	table = table + '<tr>';
	for (key of keys){
	    console.log(key);
	    table = table + '<td>' + line[headers[key]] + '</td>';
	}
	table = table + '</tr>';
        return table;
      }


      function showInfo(data) {
        console.log(data);
        // data comes through as a simple array since simpleSheet is turned on
        // alert("Successfully processed " + data.length + " rows!")
        // document.getElementById("Events").innerHTML = "<strong>Foods:</strong> " + [ data[1].eventname, data[2].eventname, data[3].eventname, data[4].eventname ]
        var table = "";
        var headers = {"Date":"date", "Event Name":"eventname", "Location":"location", "Description":"description"};
        
        table = render_table_headers(headers);

	// Print the upcoming events
        for (line of data){ 
            // console.log(JSON.stringify(line));
            if(line.final == "Y" && ( Date.parse(line.date) > Date.now() ) ){
                table = table + render_table_row(headers,line);
            }

        }

        document.getElementById("upcoming_events").innerHTML = table;

        table = render_table_headers(headers);

	// Print the data
        for (line of data){ 
            // console.log(JSON.stringify(line));
            if(line.final == "Y" && ( Date.parse(line.date) < Date.now() ) ){
                table = table + render_table_row(headers,line);
            }

        }

        document.getElementById("past_events").innerHTML = table;
        
	table = render_table_headers(headers);
        for (line of data){
             if(line.final == "N"){
                 table = table + render_table_row(headers,line);
             }
        }
        document.getElementById("unplanned_events").innerHTML = table;
       
        //console.log(JSON.stringify(data));
      }
      document.write("<br/>");
      document.write("<p>The published spreadsheet is located at <a target='_new' href='" + public_spreadsheet_url + "'>" + public_spreadsheet_url + "</a></p>");        

window.onload = function() { init() };

function init() {
    $.get( "http://api.ieeeatuhm.com/events", function( data ) {
        //console.log(JSON.stringify(data[0].events));
        showInfo(data);
    });
}

function render_table_headers(headers){
    var table = "";
    var keys = Object.keys(headers);

    table = table 
            + "<thead>"
            + "<tr>";

    table += keys.map(function(key){
        return "<th>" + key + "</th>";
    }).join("");

    table = table + "</tr>"
            + "</thead>";

    return table;
}
      
function render_table_row(headers, line){
    var table = "";
    var keys = Object.keys(headers);
    table = table + '<tr>';
    for (key of keys){
        //console.log(key);
        table = table + '<td>' + line[headers[key]] + '</td>';
    }
    table = table + '</tr>';
    return table;
}


function showInfo(data) {
    // console.log(data);
    // data comes through as a simple array since simpleSheet is turned on
    // alert("Successfully processed " + data.length + " rows!")

    var table = "";
    var headers = {"Date":"date", "Event Name":"eventname", "Location":"location", "Description":"description"};

    // Render the Upcoming Events
    table = render_table_headers(headers);
    table += data.filter(function(line){
                return (line.final == "Y" && ( Date.parse(line.date) > Date.now() ) );
            })
            .map(function(line){
                return render_table_row(headers,line);
            })
            .join("");
    document.getElementById("upcoming_events").innerHTML = table;


    // Render the Past Events
    table = render_table_headers(headers);
    table += data.filter(function(line){
                return (line.final == "Y" && ( Date.parse(line.date) < Date.now() ) );
            })
            .map(function(line){
                return render_table_row(headers,line);
            })
            .join("");
    document.getElementById("past_events").innerHTML = table;

    // Render the 'unplanned' events
    table = render_table_headers(headers);
    table += data.filter(function(row){
        return (row.final === "N")
        })
        .map(function(line){
            return render_table_row(headers,line);
        })
        .join("");
    document.getElementById("unplanned_events").innerHTML = table;

    //console.log(JSON.stringify(data));
}

document.write("<br/>");
document.write("<p>The published spreadsheet is located at <a target='_new' href='" + public_spreadsheet_url + "'>" + public_spreadsheet_url + "</a></p>");        

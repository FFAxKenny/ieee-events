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


function showInfo(eventsList) {
    var headers = {"Date":"date", "Event Name":"eventname", "Location":"location", "Description":"description"};

    function isBeforeToday(someEvent){
        return (someEvent.final === "Y") && (Date.parse(someEvent.date) > Date.now());
    }
    function isAfterToday(someEvent){
        return (someEvent.final ==="Y") && (Date.parse(someEvent.date) < Date.now());
    }
    function isUnplanned(someEvent){
        return (someEvent.final === "N");
    }
    function renderEvents(eventsList, headers, dateFilter ){
        return render_table_headers(headers) + 
        eventsList.filter(function(someEvent){
            return dateFilter(someEvent);
        })
        .map(function(someEvent){
            return render_table_row(headers,someEvent);
        })
        .join("");
    }

    // Render the Upcoming Events
    document.getElementById("upcoming_events").innerHTML = renderEvents(eventsList, headers, isBeforeToday);
    document.getElementById("past_events").innerHTML = renderEvents(eventsList, headers, isAfterToday);
    document.getElementById("unplanned_events").innerHTML = renderEvents(eventsList, headers, isUnplanned);
}

document.write("<br/>");
document.write("<p>The published spreadsheet is located at <a target='_new' href='" + public_spreadsheet_url + "'>" + public_spreadsheet_url + "</a></p>");        

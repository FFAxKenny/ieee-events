window.onload = function() { init() };

function init() {
    $.get( "http://api.ieeeatuhm.com/events", function( data ) {
        //console.log(JSON.stringify(data[0].events));
        showInfo(data);
    });
}

function render_table_headers(headers){
    var keys = Object.keys(headers);
    return "<thead>" 
            + "<tr>" 
            + keys.map(function(key){
                return "<th>" + key + "</th>";
              }).join("");
            + "</tr>"
            + "</thead>";
}
      
function render_table_row(headers, line){
    var keys = Object.keys(headers);
    return '<tr>' 
            + keys.map(function(key){
                return '<td>' + line[headers[key]] + '</td>';
            }).join("")
            + '</tr>';
}


function showInfo(eventsList) {
    var headers = {"Date":"date", "Event Name":"eventname", "Time":"starttime", "Location":"location", "Description":"description"};

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
        "<tbody>" + 
        eventsList.filter(function(someEvent){
            return dateFilter(someEvent);
        })
        .map(function(someEvent){
            return render_table_row(headers,someEvent);
        })
        .join("")
        "</tbody></table>";
    }

    // Render the Upcoming Events
    document.getElementById("upcoming_events").innerHTML = renderEvents(eventsList, headers, isBeforeToday);
    document.getElementById("past_events").innerHTML = renderEvents(eventsList, headers, isAfterToday);
    document.getElementById("unplanned_events").innerHTML = renderEvents(eventsList, headers, isUnplanned);
}

document.write("<br/>");

function CSVToArray(strData, strDelimiter) {
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");

    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
    );


    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [
        []
    ];

    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;


    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec(strData)) {

        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[1];

        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter
        ) {

            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push([]);

        }

        var strMatchedValue;

        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[2]) {

            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[2].replace(
                new RegExp("\"\"", "g"),
                "\""
            );

        } else {

            // We found a non-quoted value.
            strMatchedValue = arrMatches[3];

        }
        // Now that we have our value string, let's add
        // it to the data array.
        arrData[arrData.length - 1].push(strMatchedValue);
    }

    // Return the parsed data.
    return (arrData);
}

function initialize(address) {
    //var address = name + city
    //var address = (document.getElementById('my-address'));
    var autocomplete = new google.maps.places.Autocomplete(address);
    autocomplete.setTypes(['geocode']);
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            return;
        }

        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }
    });
}

function codeAddress(address) {
    geocoder = new google.maps.Geocoder();
    //var address = document.getElementById("my-address").value;
    var ret = [];
    geocoder.geocode({
        'address': address
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            console.log("Latitude: " + results[0].geometry.location.lat() + "Longitude: " + results[0].geometry.location.lng());
            ret[0] = results[0].geometry.location.lat();
            ret[1] = results[0].geometry.location.lng();
        } else {
            console.log("Geocode was not successful for the following reason: " + status);
        }
    });
    return ret;
}
/* 
    Shows the distance between two LatLng in Metre
*/
function Distance(p1, p2) {
    var dist = google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 100000;
    return dist;
}

function checkDeals() {
    var fs = require('fs');
    var value = fs.readFileSync('test');
    var data = CSVToArray(String(value));
    for (var i = 1; i <= data.length - 2; i++) {
        var temp = String(data[i][0] + data[i][4] + data[i][5]);
        window.alert(data[i][0]+ " " + data[i][4]+ " " +data[i][5]);
        /*temp = initialize(temp);
        var ret = codeAddress(temp);
        var p1 = new google.maps.LatLng(data[i][8], data[i][9]);
        var p2 = new google.maps.LatLng(ret[0], ret[1]);
        if (Distance(p1, p2) <= 50.0000) {
            window.alert("True");
        } else {
            window.alert("False");
        }*/
    }
}

//checkDeals();
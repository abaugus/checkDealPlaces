var retLatLng = [];
function CSVToArray(strData, strDelimiter) {
    strDelimiter = (strDelimiter || ",");
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

    var arrData = [
        []
    ];

    var arrMatches = null;
    while (arrMatches = objPattern.exec(strData)) {

        var strMatchedDelimiter = arrMatches[1];

        if (
            strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter
        ) {

            arrData.push([]);

        }

        var strMatchedValue;
        if (arrMatches[2]) {

            strMatchedValue = arrMatches[2].replace(
                new RegExp("\"\"", "g"),
                "\""
            );

        } else {

            strMatchedValue = arrMatches[3];

        }
        arrData[arrData.length - 1].push(strMatchedValue);
    }

    return (arrData);
}

function initialize() {
    var address = (document.getElementById('my-address'));
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
    geocoder.geocode({
        'address': address
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            window.alert("Latitude: " + results[0].geometry.location.lat() + " Longitude: " + results[0].geometry.location.lng());
            //retLatLng[0] = results[0].geometry.location.lat();
            //retLatLng[1] = results[0].geometry.location.lng();
            //window.alert("codeAddress " + ret);
        } 
        else 
        {
            window.alert("Geocode was not successful for the following reason: " + status);
        }
    });
}

function getAutoSuggestions(address) {
    //var address = (document.getElementById('my-address'));
    address = "KFC New Delhi";
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
    codeAddress(address);
}



function Distance(p1, p2) {
    var dist = google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 100000.0;
    return dist;
}

function checkDeals() {
    for (var i = 2; i <= data.length - 2; i++) {
        var temp = String(data[i][4]);
        //window.alert(temp);
        getAutoSuggestions(temp);
        /*var ret = codeAddress(val);
        
        window.alert(retLatLng);
        if (retLatLng.length > 0) {
            var p1 = new google.maps.LatLng(data[i][8], data[i][9]);
            var p2 = new google.maps.LatLng(retLatLng[0], retLatLng[1]);
            window.alert(Distance(p1, p2));
            if (Distance(p1, p2) <= 200.0000) {
                window.alert("True");
            } else {
                window.alert("False");
            }
        }
        */
    }
}

google.maps.event.addDomListener(window, 'load', initialize);
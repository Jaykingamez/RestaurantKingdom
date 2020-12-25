function fetchAmenityTable(){
    var request = new XMLHttpRequest();

    request.open('GET', amenity_url, true);

    //This command starts the calling of the restaurant amenity api
    request.onload = function() {
        var received_amenity_table = JSON.parse(request.responseText);
        for(var count = 0; count < received_amenity_table.length ; count++){
            amenity_table[received_amenity_table[count]["amenity_id"]] = received_amenity_table[count]["amenity"];
        }
    };

    request.send();
}
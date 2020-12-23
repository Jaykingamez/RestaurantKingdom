function fetchAmenityTable(){
    var request = new XMLHttpRequest();

    request.open('GET', amenity_url, true);

    //This command starts the calling of the restaurant amenity api
    request.onload = function() {
        amenity_table = JSON.parse(request.responseText);
    };

    request.send();
}
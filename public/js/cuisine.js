function fetchCuisineTable(){
    var request = new XMLHttpRequest();

    request.open('GET',cuisine_url, true);

    //This command starts the calling of the restaurant amenity api
    request.onload = function() {
        cuisine_table = JSON.parse(request.responseText);
    };

    request.send();

}
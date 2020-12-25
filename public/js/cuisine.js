function fetchCuisineTable(){
    var request = new XMLHttpRequest();

    request.open('GET',cuisine_url, true);

    //This command starts the calling of the restaurant amenity api
    request.onload = function() {
        var received_cuisine_table = JSON.parse(request.responseText);
        for (var count = 0; count < received_cuisine_table.length ; count++){
            cuisine_table[received_cuisine_table[count]["cuisine_id"]] = received_cuisine_table[count]["cuisine"];
        }
    };

    request.send();

}
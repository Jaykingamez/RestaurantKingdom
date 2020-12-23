function fetchRestaurants(){
    var request = new XMLHttpRequest();

    request.open('GET', restaurant_url, true);

    //This function will be called when data returns from the web api
    request.onload = function() {
    //get all the restaurant records into our restaurants array
    restaurant_array = JSON.parse(request.responseText);
    };
    //This command starts the calling of the restaurants web api
    request.send();
}

function fetchRestaurantAmenity(restaurantID){
    var request = new XMLHttpRequest();

    request.open('GET', restaurant_url + amenity_url + "/" + restaurantID, true);

    //This command starts the calling of the restaurant amenity api
    request.onload = function() {
        var restaurant_amenity = JSON.parse(request.responseText);
    };

    request.send();
}

function fetchRestaurantCuisine(restaurantID){
    var request = new XMLHttpRequest();

    request.open('GET', restaurant_url + cuisine_url + "/" + restaurantID, true);

    //This command starts the calling of the restaurant amenity api
    request.onload = function() {
        var restaurant_cuisine = JSON.parse(request.responseText);
    };

    request.send();

}
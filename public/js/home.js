

document.getElementById("welcomeUser").value = "Welcome" + username;

function fetchAccount(){
    var request = new XMLHttpRequest();

    request.open('GET', account_url + "/" + username, true);

    //This command starts the calling of the accounts api
    request.onload = function() {
    //get all the account information into our account variable
    account = JSON.parse(request.responseText);
    };

    request.send();
}

function fetchRestaurants(){
    var request = new XMLHttpRequest();

    request.open('GET', restaurant_url, true);

    //This command starts the calling of the restaurants api
    request.onload = function() {
    //get all the restaurants records into our restaurants array
    restaurant_array = JSON.parse(request.responseText);
    };

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
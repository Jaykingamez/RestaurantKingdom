function fetchRestaurants(){
    var request = new XMLHttpRequest();

    request.open('GET', restaurant_url, true);

    //This function will be called when data returns from the web api
    request.onload = function() {
    //get all the restaurant records into our restaurants array
    restaurant_array = JSON.parse(request.responseText);
    displayRestaurants();
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

function displayRestaurants(){
    var table = document.getElementById("restaurantsTable");
    table.innerHTML = "";    
    totalRestaurants = restaurant_array.length;    
    for (var count = 0; count < totalRestaurants; count++) {
        var restaurantPicture = restaurant_array[count]["restaurant_picture"];            
        var restaurantName = restaurant_array[count]["restaurant_name"];
        var cell = '<div class="col-md-3" style="float: none; margin: 0 auto;">' +                          
                        '<div >' + 
                            '<a id="movies" href="#" data-toggle="modal" data-target="#movieModal" item=' + count + '>'+
                                '<img width="500" height="250" src=' + restaurantPicture + ' />'+
                            '</a>'+
                        '</div>' +
                        '<h3 class="centered">' + restaurantName + '</h3>' +
                    '</div>'; 
        table.insertAdjacentHTML('beforeend', cell);      
    }            
}
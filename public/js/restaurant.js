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
        restaurant_amenity = JSON.parse(request.responseText);
    };

    request.send();
}

function fetchRestaurantCuisine(restaurantID){
    var request = new XMLHttpRequest();

    request.open('GET', restaurant_url + cuisine_url + "/" + restaurantID, true);

    //This command starts the calling of the restaurant amenity api
    request.onload = function() {
        restaurant_cuisine = JSON.parse(request.responseText);
    };

    request.send();

}

function displayRestaurants(){
    var table = document.getElementById("restaurantsTable");
    table.innerHTML = "";    
    totalRestaurants = restaurant_array.length;    
    for (var count = 0; count < totalRestaurants; count++) {
        var restaurantName = restaurant_array[count]["restaurant_name"];
        var restaurantPicture = restaurant_array[count]["restaurant_picture"];            
        var cell = '<div class="col-md-3" style="float: none; margin: 0 auto;">' +                          
                        '<div >' + 
                            '<a id="restaurants" href="#restaurantModal" data-toggle="modal" data-target="#restaurantModal" item=' + count + '>'+
                                '<img class="img-fluid" width="500" height="250" src=' + restaurantPicture + ' item=' + count + ' onclick="displayRestaurantDetails(this)" />'+
                            '</a>'+
                        '</div>' +
                        '<h3 class="centered">' + restaurantName + '</h3>' +
                    '</div>'; 
        table.insertAdjacentHTML('beforeend', cell);      
    }            
}

function displayRestaurantDetails(element){
    var item = element.getAttribute("item");
    document.getElementById("restaurantName").textContent = restaurant_array[item]["restaurant_name"];  
    document.getElementById("restaurantPicture").src = restaurant_array[item]["restaurant_picture"]e;    
    document.getElementById("restaurant-address").textContent = restaurant_array[item].address;
    document.getElementById("opening-time").textContent = restaurant_array[item]["opening_time"];
    document.getElementById("closing-time").textContent = restaurant_array[item]["closing_time"];
}
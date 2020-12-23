function initialize(){
    document.getElementById("welcomeUser").value = "Welcome" + username;
    fetchAccount();
    fetchRestaurants();
    fetchAmenityTable();
    fetchCuisineTable();
}

displayRestaurants(){
    var table = document.getElementById("restaurantsTable");
    table.innerHTML = "";    
    totalRestaurants = restaurant_array.length;    
    for (var count = 0; count < totalRestaurants; count++) {
        var restaurantPicture = restaurant_array[count]["restaurant_picture"];            
        var restaurantName = restaurant_array[count]["restaurant_name"];
        var cell = '<div class="col-md-3" style="float: none; margin: 0 auto;">' +                          
                        '<div >' + 
                            '<a id="movies" href="#" data-toggle="modal" data-target="#movieModal" item=' + count + '>'+
                                '<img class="img-fluid img-thumbnail" src=' + restuarantPicture + ' />'+
                            '</a>'+
                        '</div>' +
                        '<h6>' + restaurantName + '</h6>';
                    '</div>';      
    }            
}



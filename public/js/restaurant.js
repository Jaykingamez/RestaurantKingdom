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
    return new Promise( (resolve, reject) => {
        var request = new XMLHttpRequest();

        request.open('GET', restaurant_url + amenity_url + "/" + restaurantID, true);
    
        //This command starts the calling of the restaurant amenity api
        request.onload = function() {
           restaurant_amenity = JSON.parse(request.responseText);
        resolve();
        };
    
        request.send();
    });
   
}

function fetchRestaurantCuisine(restaurantID){
    return new Promise( (resolve, reject) => {
        var request = new XMLHttpRequest();

        request.open('GET', restaurant_url + cuisine_url + "/" + restaurantID, true);

        //This command starts the calling of the restaurant amenity api
        request.onload = function() {
            restaurant_cuisine = JSON.parse(request.responseText);
            resolve();
        };

        request.send();
    })
    

}

function displayRestaurants(){
    var table = document.getElementById("restaurantsTable");
    table.innerHTML = "";    
    totalRestaurants = restaurant_array.length;    
    for (var count = 0; count < totalRestaurants; count++) {
        var restaurantId = restaurant_array[count]["restaurant_id"];
        var restaurantName = restaurant_array[count]["restaurant_name"];
        var restaurantPicture = restaurant_array[count]["restaurant_picture"];            
        var cell = '<div class="col-md-3" style="float: none; margin: 0 auto;">' +                          
                        '<div >' + 
                            '<a id="restaurants" href="#restaurantModal" data-toggle="modal" data-target="#restaurantModal" item=' + count + '>'+
                                '<img class="img-fluid" width="400" height="250" src=' + restaurantPicture + ' item=' + count + ' onclick="displayRestaurantDetails(this)" />'+
                            '</a>'+
                        '</div>' +
                        '<h3 class="centered">' + restaurantName + '</h3>';
        addOnTags(restaurantId, cell).then( (returned_cell) => {
            cell = returned_cell;
            cell += '</div>'
            table.insertAdjacentHTML('beforeend', cell); 
        });
    }   
          
}

function displayRestaurantDetails(element){
    var item = element.getAttribute("item");
    currentIndex = item;
    document.getElementById("restaurantName").textContent = restaurant_array[item]["restaurant_name"];  
    document.getElementById("restaurantPicture").src = restaurant_array[item]["restaurant_picture"];    
    document.getElementById("restaurant-address").textContent = restaurant_array[item].address;
    document.getElementById("opening-time").textContent = restaurant_array[item]["opening_time"];
    document.getElementById("closing-time").textContent = restaurant_array[item]["closing_time"];
    document.getElementById("telephone-number").textContent = restaurant_array[item]["telephone_number"];
    var restaurantRating = fetchRestaurantRating(restaurant_array[currentIndex]["restaurant_id"]);
    console.log(restaurantRating);
    changeStarImage(restaurantRating, ".restaurantStar");
    addOnTags(restaurant_array[item]["restaurant_id"], "").then( (returned_html) => {
        document.getElementById("tag-row").innerHTML = returned_html;
     });

     
}

function addOnTags(restaurantId, cell){
    return new Promise((resolve, reject) => {
        fetchRestaurantAmenity(restaurantId).then( () =>{
            for (var count = 0; count < restaurant_amenity.length; count++){
                //console.log(amenity_table[restaurant_amenity[count]["amenity_id"]]);
                cell += '<span class="badge badge-pill badge-dark font-weight-bold larger_tags">' + amenity_table[restaurant_amenity[count]["amenity_id"]] + '</span>';
            }
            return fetchRestaurantCuisine(restaurantId);
        }).then( () => {
            for (var count = 0 ; count < restaurant_cuisine.length ; count++){
                //console.log(cuisine_table[restaurant_cuisine[count]["cuisine_id"]]);
                cell += '<span class="badge badge-pill badge-dark font-weight-bold larger_tags">' + cuisine_table[restaurant_cuisine[count]["cuisine_id"]] + '</span>';     
            }
            //console.log(cell);
            resolve(cell);
        }).catch((error) => { console.log(error);});
    });
}

function fetchRestaurantRating(restaurantID){
    var rating = 0;
    var number_of_reviews = 0;
    for (var i = 0; i < review_array.length; i++){
        if(review_array[i]["restaurant_id"] == restaurantID){
            rating += review_array[i]["rating"];
            number_of_reviews += 1;
        }
    }

    return Math.floor(rating/number_of_reviews);
}
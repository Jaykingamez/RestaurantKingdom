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
                                '<img class="img-fluid img-thumbnail" src=' + restaurantPicture + ' item=' + count + ' onclick="displayRestaurantDetails(this)" />'+
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
    if (isNaN(element)){
        var item = element.getAttribute("item");
    } else{
        var item = element
    }
    currentIndex = item;
    document.getElementById("restaurantName").textContent = restaurant_array[item]["restaurant_name"];  
    document.getElementById("restaurantPicture").src = restaurant_array[item]["restaurant_picture"];    
    document.getElementById("restaurant-address").textContent = restaurant_array[item].address;
    document.getElementById("opening-time").textContent = restaurant_array[item]["opening_time"];
    document.getElementById("closing-time").textContent = restaurant_array[item]["closing_time"];
    document.getElementById("telephone-number").textContent = restaurant_array[item]["telephone_number"];
    
    var restaurantRating = fetchRestaurantRating(restaurant_array[currentIndex]["restaurant_id"]);
    //console.log(restaurantRating);
    changeStarImage(restaurantRating, ".restaurantStar");
    //console.log(restaurant_array[item]["restaurant_id"]);
    //console.log(account[0]["account_id"]);
    fetchCertainRestaurantReview(restaurant_array[item]["restaurant_id"] , account[0]["account_id"]).then( (returned_review) => {
        if (returned_review.length > 2){
            localStorage.setItem("review", returned_review);
            document.getElementById("writeOrEdit").textContent = "Edit your review";
            document.getElementById("writeOrEdit").setAttribute('onclick','getOldReview()')
            document.getElementById("submitReview").setAttribute('onclick','updateReview()')
            document.getElementById("deleteReview").className = "btn btn-primary visible";
        }else{
            document.getElementById("writeOrEdit").textContent = "Write a review";
            document.getElementById("writeOrEdit").setAttribute('onclick','newReview()');
            document.getElementById("submitReview").setAttribute('onclick','addReview()');
            document.getElementById("deleteReview").className = "btn btn-primary invisible";

        }
    });
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

function enterTags(event){
    if(event.key == "Enter"){
        document.getElementById("TagStorage").innerHTML += '<span class="badge badge-pill badge-dark font-weight-bold larger_tags search_tags" item=' + tagCount + '>'+ 
                                                                document.getElementById("filters").value + 
                                                                    '<img alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMjYiIGhlaWdodD0iMjYiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iI2ZmZmZmZiI+PHBhdGggZD0iTTE0My43ODEyNSwxMjkuOTMwMjlsLTEzLjg3NjgsMTMuODUwOTZjLTIuNTMyNDYsMi41NTgyOSAtNi42NjcwNywyLjU1ODI5IC05LjIyNTM2LDBsLTM0LjY3OTA5LC0zNC42NTMyNGwtMzQuNjUzMjQsMzQuNjUzMjRjLTIuNTU4MjksMi41NTgyOSAtNi43MTg3NSwyLjU1ODI5IC05LjI1MTIxLDBsLTEzLjg3NjgsLTEzLjg1MDk2Yy0yLjU1ODI5LC0yLjU1ODI5IC0yLjU1ODI5LC02LjY5MjkxIDAsLTkuMjUxMmwzNC42NTMyNCwtMzQuNjc5MDlsLTM0LjY1MzI0LC0zNC42NTMyNGMtMi41MzI0NSwtMi41ODQxMyAtMi41MzI0NSwtNi43NDQ1OSAwLC05LjI1MTIxbDEzLjg3NjgsLTEzLjg3NjhjMi41MzI0NiwtMi41NTgyOSA2LjY5MjkxLC0yLjU1ODI5IDkuMjUxMjEsMGwzNC42NTMyNCwzNC42NzkwOWwzNC42NzkwOSwtMzQuNjc5MDljMi41NTgyOSwtMi41NTgyOSA2LjcxODc1LC0yLjU1ODI5IDkuMjI1MzYsMGwxMy44NzY4LDEzLjg1MDk2YzIuNTU4MjksMi41NTgyOSAyLjU1ODI5LDYuNzE4NzUgMC4wMjU4NCw5LjI3NzA0bC0zNC42NzkwOCwzNC42NTMyNGwzNC42NTMyNCwzNC42NzkwOWMyLjU1ODI5LDIuNTU4MjkgMi41NTgyOSw2LjY5MjkgMCw5LjI1MTJ6Ij48L3BhdGg+PC9nPjwvZz48L3N2Zz4=" onclick="deleteTags(this)">' +
                                                            '</span>';
        document.getElementById("filters").value = "";
        tagCount += 1;
    }
}

function searchRestaurant(){
    var search = new Object();
    var eligible_tags = checkTags();
    var query = document.getElementById("searchbox").value;
    search.search = query;
    search.tags = eligible_tags;

    var getSearch = new XMLHttpRequest(); // new HttpRequest instance to send search query

    getSearch.open("POST", search_url, true); //Use the HTTP get method to request data to server

    getSearch.setRequestHeader("Content-Type", "application/json");
    getSearch.onload = function() {
        restaurant_array = JSON.parse(getSearch.responseText);
        displayRestaurants();
    };
    getSearch.send(JSON.stringify(search)); 
}

function checkTags(){
    var eligible_tags = [];
    var filters = document.querySelectorAll('span.search_tags');
    for( var i = 0; i < filters.length ; i++){
        console.log(filters[i].innerText);
        if (Object.values(amenity_table).includes(filters[i].innerText)){
            eligible_tags.push(["amenity",filters[i].innerText]);
        } else if(Object.values(cuisine_table).includes(filters[i].innerText)){
            eligible_tags.push(["cuisine",filters[i].innerText]);
        }
    }

    return eligible_tags;
}

function deleteTags(element){
    element.parentNode.remove();
}
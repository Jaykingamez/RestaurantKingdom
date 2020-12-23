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
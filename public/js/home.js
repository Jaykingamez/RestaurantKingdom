function initialize(){
    document.getElementById("welcomeUser").innerHTML = "Welcome " + username;
    fetchAccount();
    fetchRestaurants();
    fetchAmenityTable();
    fetchCuisineTable();   
}





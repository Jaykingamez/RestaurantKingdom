function initialize(){
    username = localStorage.getItem("username")
    document.getElementById("welcomeUser").innerHTML = "Welcome " + localStorage.getItem("username") ;
    fetchAccountUsername();
    fetchRestaurants();
    fetchReviews();
    fetchAmenityTable();
    fetchCuisineTable();   
}





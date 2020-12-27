function initialize(){
    username = localStorage.getItem("username")
    document.getElementById("welcomeUser").innerHTML = "Welcome " + localStorage.getItem("username") ;
    fetchAccount();
    fetchRestaurants();
    fetchAmenityTable();
    fetchCuisineTable();   
}





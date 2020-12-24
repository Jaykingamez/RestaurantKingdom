function initialize(){
    document.getElementById("welcomeUser").innerHTML = "Welcome " + localStorage.getItem("username");
    fetchAccount();
    fetchRestaurants();
    fetchAmenityTable();
    fetchCuisineTable();   
}





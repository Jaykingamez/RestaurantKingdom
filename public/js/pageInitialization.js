function initializeHome(){
    username = localStorage.getItem("username")
    document.getElementById("welcomeUser").innerHTML = "Welcome " + localStorage.getItem("username") ;
    fetchAccountUsername();
    fetchRestaurants();
    fetchReviews();
    fetchAmenityTable();
    fetchCuisineTable();   
}

function initializeProfile(){
    username = localStorage.getItem("username");
    account = JSON.parse(localStorage.getItem("account"));
    document.getElementById("profile-name").innerHTML = username + "'s profile";
    document.getElementById("edit_profile_photo").src = account[0]["profile_photo"];
    document.getElementById("profile-username").value = account[0]["user_id"];
    document.getElementById("profile-password").value = account[0]["password"];
    document.getElementById("profile-first-name").value = account[0]["first_name"];
    document.getElementById("profile-last-name").value = account[0]["last_name"];
    document.getElementById("profile-gender").value = account[0]["gender"];
    document.getElementById("profile-address").value = account[0]["address"];
    document.getElementById("profile-mobile").value = account[0]["mobile_number"];
    document.getElementById("profile-email").value = account[0]["email_address"];
}

function reloadPage(){
    location.reload();
}

function goToLogin(){
    window.location.href = "index.html";
}





function initializeHome(){
    username = localStorage.getItem("username");
    initGoogle();
    tagCount = 0;
    
    document.getElementById("welcomeUser").innerHTML = "Welcome " + localStorage.getItem("username") ;
    fetchAccountUsername().then( (response) => {
        console.log("Displaying images!");
        document.getElementById("home-profile-photo").src = JSON.parse(localStorage.getItem("account"))[0]["profile_photo"];
        document.getElementById("edit-profile-information").src = JSON.parse(localStorage.getItem("account"))[0]["profile_photo"];
    });
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

function initializeResetPassword(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var resetPasswordUsername = urlParams.get("username");
    localStorage.setItem("username", resetPasswordUsername);
    fetchAccountUsername();

}

function reloadPage(){
    location.reload();
}

function goToLogin(){
    window.location.href = "index.html";
}

function noImageSource(image){
    image.src= "/images/restaurantKingdom.png";
}

function changePageAndSendEmail(){
    sendEmail();

    //might need to reset this??
    document.getElementById("forgotPassword-body").innerHTML = 
    `<header>
        <h1 class="centered">Forgot Password</h1>
    </header>

    <p class="centered">
        An email with instructions on changing your password
        has been sent to the email address associated with the username.
        Please proceed onward from there.
    </p>`;

   

}

function initGoogle() {
    gapi.load('auth2', function() {
        gapi.auth2.init();
    });
  }





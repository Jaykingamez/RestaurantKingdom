"use strict";

window.fbAsyncInit = function () {
    FB.init({
        appId: '735783033951073',
        cookie: true,
        xfbml: true,
        version: 'v9.0'
    });
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


// Check the result of the user status and display login button if necessary
// function checkLoginStatus(response) {
//     if (response && response.status == 'connected') {
//         alert('User is authorized');
//     }
// }


function facebookButton() {
    console.log("HELLO YOU CALLED ME!");
    // Check if the current user is logged in and has authorized the app
    //FB.getLoginStatus(checkLoginStatus);

    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });

    function statusChangeCallback(response) {
        if (response.status === 'connected') {
            //display user data 
            FB.api('/me', { fields: 'name, email' },
                function (response) {
                    localStorage.setItem("username", response.name);
                    fetchAccountUsername().then((account_response) =>{
                        console.log("The response is " + account_response);
                        if (account_response.length > 2){
                            window.location.href = "home.html";
                        } else{
                            registerFacebook(response.name, response.email);
                        }
                    })                    
                });

        } else {
            //not logged in
            FB.login(function (response) {
                FB.getLoginStatus(function (response) {
                    statusChangeCallback(response);
                });
            });
        }
    }

}

function registerFacebook(name, email){
    var formData = new FormData();
    formData.append("register-username",name);
    formData.append("register-email", email);
    var request = new XMLHttpRequest();
    request.open("POST", "/register", true);
    //request.setRequestHeader("Content-Type", "multipart/form-data");
    request.onload = function(){
        response = JSON.parse(request.responseText);
        window.location.href = "home.html";
    };
    request.send(formData);
}

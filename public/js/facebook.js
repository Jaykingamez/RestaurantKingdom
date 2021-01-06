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
                    console.log(response);
                    console.log("Successful login for: " + response.name);
                    console.log(response.name);
                    console.log(response.email);
                    localStorage.setItem("username", response.name);
                    window.location.href = "home.html";
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
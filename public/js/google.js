function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    //console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    username = profile.getName();
    localStorage.setItem("username", username);

    fetchAccountUsername().then((account_response) =>{
        console.log("Repsonse is " +account_response);
        if (account_response.length > 2){
            window.location.href = "home.html";
        } else{
            registerGoogle(profile);
        }
    })       

  }

  function registerGoogle(profile){
    var formData = new FormData();
    formData.append("register-username",profile.getName());
    formData.append("register-first-name",  profile.getFamilyName());
    formData.append("register-last-name", profile.getGivenName())
    formData.append("register-email", profile.getEmail());
    formData.append("register-image", profile.getImageUrl());

    var request = new XMLHttpRequest();
    request.open("POST", "/register", true);
    //request.setRequestHeader("Content-Type", "multipart/form-data");
    request.onload = function(){
        response = JSON.parse(request.responseText);
        window.location.href = "home.html";
    };
    request.send(formData);
  }
function fetchReviews() {
    var request = new XMLHttpRequest();

    request.open('GET', review_url, true);

    //This command starts the calling of the comments api
    request.onload = function() {
    //get all the comments records into our comments array
    review_array = JSON.parse(request.responseText);
    };

    request.send();
}

function newReview() {
    //Initialise each HTML input elements in the modal window with default value.
        rating = 0;
        document.getElementById("userReview").value = "";
        document.getElementById("creator-review").innerText = username +"'s review";
    }

//This function allows the user to mouse hover the black and white star
//so that it will turn to a colored version when hovered
function rateIt(element) {
    var num = element.getAttribute("value");
    var classname = element.getAttribute("class");
    var classTarget = "." + classname;

    changeStarImage(num, classTarget);
}

function changeStarImage(num, classTarget) {
    var stars = document.getElementsByClassName(classTarget.slice(1));

    // This is another way of writing 'for' loop, which initialises the 
    // star images to use black and white.
    for (let star of stars){
        star.setAttribute("src", starBWImage);
    }

    switch (eval(num)) {
        case 0:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", starBWImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", starBWImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", starBWImage);
            document.querySelector(classTarget + "[value='4']").setAttribute("src", starBWImage);
            document.querySelector(classTarget + "[value='5']").setAttribute("src", starBWImage);
            break;
        case 1:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", starImage);
            rating = 1;
            break;
        case 2:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", starImage);
            rating = 2;
            break;
        case 3:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", starImage);
            rating = 3;
            break;
        case 4:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='4']").setAttribute("src", starImage);
            rating = 4;
            break;
        case 5:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='4']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='5']").setAttribute("src", starImage);
            rating = 5;
            break;
    }
}

function addReview() {
    var review = new Object();
    review.accountId =  account[0]["account_id"];
    review.restaurantId = restaurant_array[currentIndex]["restaurant_id"]; 
    review.content = document.getElementById("userReview").value; // Value from HTML input text
    review.datePosted = null; // Change the datePosted to null instead of taking the timestamp on the client side;
    review.rating = rating;

    var postReview = new XMLHttpRequest(); // new HttpRequest instance to send comment

    postReview.open("POST", review_url, true); //Use the HTTP POST method to send data to server

    postReview.setRequestHeader("Content-Type", "application/json");
    postReview.onload = function() {
        fetchReviews(); // fetch all reviews again so that the web page can have updated reviews. 
        displayRestaurantDetails(restaurant_array[currentIndex]["restaurant_id"]);   
    };
// Convert the data in review object to JSON format before sending to the server.
    postReview.send(JSON.stringify(review)); 
}

function displayOtherReviews(){
    var table = document.getElementById("reviewTable");
    document.getElementById("other-review").innerText = restaurant_array[currentIndex]["restaurant_name"];
    table.innerHTML = "";    
    totalReviews = review_array.length;
    var iterations = 0; 
    var restaurantId = restaurant_array[currentIndex]["restaurant_id"];   
    for (var count = 0; count < totalReviews; count++) {
        if (review_array[count]["restaurant_id"] === restaurantId && review_array[count]["account_id"] != account[0]["account_id"]) {
            iterations += 1;
            var reviewerRating = review_array[count]["rating"];
            var reviewerId = review_array[count]["account_id"];
            var content = review_array[count]["content"];
            console.log(content);

            //all this content get's iterated through to the last, that's why it repeats the last element continously
            var timestamp = review_array[count]["timestamp"];
            

            fetchAndAddCell(reviewerId, reviewerRating, timestamp, content, table);
        }
    }
    console.log(iterations);           
}

function fetchAndAddCell(reviewerId, reviewerRating, timestamp, content, table){
    fetchAccountId(reviewerId).then( (retrievedAccount) =>{
        var cell = '<div class="col-md-12" style="float: none; margin: 0 auto;">' +                          
                        '<div>' + 
                            '<img class="img-fluid" width="50" height="50" src=' + retrievedAccount[0]["profile_photo"] + '>';
            for(var star = 0; star < 5; star++){
                if (star < reviewerRating){
                    cell += '<img class="img-fluid" width="50" height="50" src=' + starImage + '/>';
                } else{
                    cell += '<img class="img-fluid" width="50" height="50" src=' + starBWImage + '/>';
                }
                
            }
        cell += '<span class="align-top">' + retrievedAccount[0]["user_id"] + '</span>';
        cell += '<span class="text-right">' + timestamp + '</span>';
        cell += '</div>';
        cell += '<p>' + content + '</p>';
        cell += '</div>';
        table.insertAdjacentHTML('beforeend', cell); 
    });  
}

function fetchCertainRestaurantReview(restaurantId, accountId){
    return new Promise( (resolve, reject) => {
        var details = new Object();
        details.restaurantId = restaurantId;
        details.accountId = accountId;

        var getReview = new XMLHttpRequest(); // new HttpRequest instance to send comment

        getReview.open("POST", review_url + restaurant_url, true); //Use the HTTP POST method to send data to server

        getReview.setRequestHeader("Content-Type", "application/json");
        getReview.onload = function() {
            resolve(getReview.responseText)
        };

        getReview.send(JSON.stringify(details)); 
    });
}

function getOldReview(){
    var review =  JSON.parse(localStorage.getItem("review"))[0];
    rating = review["rating"];
    document.getElementById("userReview").value = review["content"];
    document.getElementById("creator-review").innerText = "Edit " + username +"'s review";
    changeStarImage(rating, ".star");
}

function updateReview(){
    var review = new Object();
    review.accountId =  account[0]["account_id"];
    review.restaurantId = restaurant_array[currentIndex]["restaurant_id"]; 
    review.content = document.getElementById("userReview").value; // Value from HTML input text
    review.datePosted = null; // Change the datePosted to null instead of taking the timestamp on the client side;
    review.rating = rating;

    var updateReview = new XMLHttpRequest(); // new HttpRequest instance to send comment

    updateReview.open("PUT", review_url + "/" + JSON.parse(localStorage.getItem("review"))[0]["review_id"], true); //Use the HTTP POST method to send data to server

    updateReview.setRequestHeader("Content-Type", "application/json");
    updateReview.onload = function() {
        fetchReviews(); // fetch all reviews again so that the web page can have updated reviews.
        displayRestaurantDetails(restaurant_array[currentIndex]["restaurant_id"]);  
        reloadPage(); 
    };
    // Convert the data in review object to JSON format before sending to the server.
    updateReview.send(JSON.stringify(review)); 

}




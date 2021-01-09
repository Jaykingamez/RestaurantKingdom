const restaurant_url = "/restaurant";
var restaurant_array = []; // This creates an empty restaurant array
currentIndex = null;

const search_url = "/search";

const review_url = "/review";
var review_array = []; //This creates an empty review array
var rating = null;

const account_url = "/profile";
var username = null;
var account = null;

const amenity_url = "/amenity"
var amenity_table = {};

const cuisine_url = "/cuisine"
var cuisine_table = {};

//store cuisines and amenities related to restaurant respectively
var restaurant_cuisine = null;
var restaurant_amenity = null;

const starBWImage = "https://img.icons8.com/carbon-copy/100/000000/star.png";
const starImage = "https://img.icons8.com/plasticine/100/000000/star--v1.png";

//Email
const SENDGRID_API_KEY = "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";

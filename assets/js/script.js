/*

1. User enters website
    1a. user is prompted to allow location data
2. location data is used to retrieve list of area restaurants
    2a. user selects restaurant
3. user is presented with list of dishes for that resturant
4. user clicks on a dish and adds it to their dishlist
    4a. dish selected hits nutritionix api and returns calorie information

*/

// 1. user enters website:

// 1a. on page load (event listener?), prompt user for location data
// if no, alert user location data is necessary to use the app at this time
// else let user go back and say yes
// if yes, use getCurrentPosition() to populate lat and lon of USRM API URL
// variable that stores user position
// render "find restaurants near you" button that will render restaurant list

// 2. location data populates USRM API URL and hits the API for restaurants nearby
// using variable that stores user position, pass variable into url
// inside the API callback function, use a for loop to render restaurants to page
// 2a. user selects one of the nearby restaurants
// resturant ID is stored     tems For Restaurant



// 3.  when user clicking on restaurant it shows menu items from the USRM API url
// menu items populate page - each item will be in it's own dynamically generated
// use a for loop to render menu items to page 
// endpoint objecte converted to string if not string 


// 4. If user selects to add menu items the menu items are rendered onto the dishlist.html
// Menu item is called from object array and appended as a child to dishlist.html 

// local storage: get dish or initialize empty object
var storedDishes = JSON.parse(localStorage.getItem("Dish")) || [];


// on load, ask for user's location data
window.addEventListener("load", getLocation)

// get user's location data
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);

    } else {
        console.log('working')
        var modalDiv = $("<div>").addClass("open-moal show-modal").attr("id", 'modal1').text("Your browser does not support Geolocation data :(");
        $('body').append(modalDiv);
        modalDiv.toggle(".show-modal");
    }
}

// uses location data to populate our URL
function showPosition(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    var latlongUrl = "https://us-restaurant-menus.p.rapidapi.com/restaurants/search/geo?page=1&lon=" + lon + "&lat=" + lat + "&distance=1"

    $.ajax({
        url: latlongUrl,
        method: "GET",
        "headers": {
            "x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
            "x-rapidapi-key": "a8277d1a91msh1d392f5f23bf2a4p184d79jsn13972e7d049f"
        }
    }).then(function (response) {
        // console.log(response)
        var restaurantList = response.result.data

        var restaurantListEl = $("<div>").addClass("container");
        for (let i = 0; i < restaurantList.length; i++) {
            var restaurantId = response.result.data[i].restaurant_id;
            var restaurantButtons = $("<button>").text(restaurantList[i].restaurant_name).addClass("rest-button row").attr("value", restaurantId).attr("data-zomato", restaurantList[i].restaurant_name);
            $('body').prepend(restaurantListEl);
            restaurantListEl.append(restaurantButtons);

        };

        $('.rest-button').on('click', showDishes);

    });
};

function zomatoMenuUrl() {

    var q = $('.rest-button').data("zomato")
    console.log("Q value: ", q)
    var zomatoUrl = "https://developers.zomato.com/api/v2.1/search?entity_id=826&entity_type=city&q=" + q;


    $.ajax({
        url: zomatoUrl,
        method: "GET",
        "headers": {
            "user-key": "fd3179f7aa74b386fbac5aec3f13b934"
        }
        
    }).then(function (response) {
        console.log(response);

        console.log(response.restaurants[0].restaurant.menu_url);

        // menu link div
        var menuUrlDiv = $("<div>").addClass("container");
        // link to zomato menu url
        var menuUrlLink = $("<a>").attr("href", response.restaurants[0].restaurant.menu_url).text(q + " " + "Menu");
        // appending menu url div to body
        $("body").append(menuUrlDiv);
        // prepends link to top of dishes page
        menuUrlDiv.prepend(menuUrlLink);
    });
};

function showDishes() {
    var urlId = $(this).val();
    // console.log(urlId)
    var dishesUrl = "https://us-restaurant-menus.p.rapidapi.com/restaurant/"+urlId+"/menuitems?page=1"
    // console.log(dishesUrl)
    zomatoMenuUrl();

    $.ajax({
        url: dishesUrl,
        method: "GET",
        "headers": {
            "x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
            "x-rapidapi-key": "a8277d1a91msh1d392f5f23bf2a4p184d79jsn13972e7d049f"
        }
    }).then(function (response) {
        console.log(response);

        var dishesList = response.result.data;
        // clears page to make way for menu items
        $(".rest-button").remove();
        var dishesListEl = $("<div>").addClass("container");

        for (let i = 0; i < dishesList.length; i++) {
            var dishName = dishesList[i].menu_item_name;
            var dishButtons = $("<button>").text(dishName).addClass("row dish-button").attr("value", dishName);
            
            $("body").prepend(dishesListEl);
            dishesListEl.append(dishButtons);
        };
        applyDishButtonEventLisetner()
    });
    
    
};

function applyDishButtonEventLisetner() {

    $(".dish-button").on("click", function () {
        
        
        var dish = $(this).val();
        // var storedDishes = ("dishName", dish);
        storedDishes.push(dish);
        console.log(storedDishes);

        localStorage.setItem("Dish", JSON.stringify(storedDishes));
    });
};
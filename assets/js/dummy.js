// function getLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(showPosition);

//     } else {
//         console.log('working')
//         var modalDiv = $("<div>").addClass("open-moal show-modal").attr("id", 'modal1').text("Your browser does not support Geolocation data :(");
//         $('body').append(modalDiv);
//         modalDiv.toggle(".show-modal");
//     }
// }

var storedDishes = JSON.parse(localStorage.getItem("Dish")) || [];

dummyRestButtons();

// uses location data to populate our URL
function dummyRestButtons() {
    // var lat = position.coords.latitude;
    // var lon = position.coords.longitude;
    console.log("Working")

    var dumbResturantArr = ["Dragon Wok", "Quang Resturant", "World Street Kitchen", "Soho Cafe", "Pizza Luce", "Chineese Express", "Chicago's Taste Authority", "The Lynnhall", "French Meadow", "CC Club"]

    var restDiv = $("<div>").addClass("container");

    for (let i = 0; i < dumbResturantArr.length; i++) {
        var resturantName = dumbResturantArr[i];
        console.log(resturantName);

        var restButton = $("<button>").addClass("rest-button row").attr("value", resturantName).text(resturantName).attr("data-menu", i);
        $("body").append(restDiv);
        restDiv.append(restButton);
    }
    $(".rest-button").on("click", dummyMenuList);
    $(".rest-button").on("click", zomatoMenuUrl);
};

function zomatoMenuUrl() {
    
    var q = $(this).val();
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


function dummyMenuList() {
    var menuGetter = $(this).data("menu");
    console.log(menuGetter);
    var dumbMenu = [
        ["menu 1", "Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
        ["menu 2", "Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
        ["menu 3", "Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
        ["menu 4", "Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
        ["menu 5", "Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
        ["menu 6", "Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
        ["menu 7", "Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
        ["menu 8", "Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
        ["menu 9", "Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
        ["menu 10", "Item 1", "Item 2", "Item 3", "Item 4", "Item 5"]

    ];
    var menuDiv = $("<div>").addClass("container");
    var menu = dumbMenu[menuGetter];
    $(".rest-button").remove();
for (let i = 0; i < menu.length; i++) {

    var dishButtons = $("<button>").text(menu[i]).addClass("row dish-button").attr("value", menu);
    $("body").append(menuDiv);
    menuDiv.append(dishButtons);
};
    

    
    applyDishButtonEventLisetner();
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
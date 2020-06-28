var storedDishes = JSON.parse(localStorage.getItem("Dish")) || [];

window.addEventListener("load", renderDishlist);

function renderDishlist() {
    var sorted = storedDishes.sort(function (a, b) {
        if(a.rest > b.rest){
            return 1
        } else {
            return -1
        }
    });

    for (let i = 0; i < sorted.length; i++) {
        var dishListItem = $("<li>").text(sorted[i].rest + ": " + sorted[i].dish).addClass("dish-style")
        $("#dishlist").append(dishListItem)
    };
};


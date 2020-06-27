var storedDishes = JSON.parse(localStorage.getItem("Dish")) || [];

function renderDishlist() {

    for (let i = 0; i < storedDishes.length; i++) {
      
        var dishListItem = $("<p>").text(storedDishes[i])
        $("body").append(dishListItem)
    };
};

window.addEventListener("load", renderDishlist)
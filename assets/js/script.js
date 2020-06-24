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
        // resturant ID is stored 
        // resturant ID is passed into Menu Items For Restaurant


    
// 3.  when user clicking on restaurant it shows menu items from the USRM API url
    // menu items populate page - each item will be in it's own dynamically generated
        // use a for loop to render menu items to page 
    // endpoint objecte converted to string if not string 


// 4. If user selects to add menu items the menu items are rendered onto the dishlist.html
    // Menu item is called from object array and appended as a child to dishlist.html 
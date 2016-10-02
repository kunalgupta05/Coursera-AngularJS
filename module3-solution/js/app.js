(function () {
    'use strict';

    angular.module("ShoppingListCheckOff", [])
        .controller("ToBuyShoppingController", ToBuyShoppingController)
        .controller("AlreadyBoughtShoppingController", AlreadyBoughtShoppingController)
        .service("ShoppingListCheckOffService", ShoppingListCheckOffService)

    ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyShoppingController(ShoppingListCheckOffService) {
        var buyItems = this;

        //Get the Pre-populated array for displaying it in the list of items to buy from the servie
        buyItems.itemsArray = ShoppingListCheckOffService.getBuyItemsArray();
        
        //When the user clicks on the bought button it removes the item from the buy list and adds it to bought list
        buyItems.removeItem = function (itemIndex) {
            ShoppingListCheckOffService.removeFromBuyAddToBought(itemIndex);
        }
    }

    AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
        var boughtItems = this;

        //Get the items available in the boughtItems array from the service
        boughtItems.itemsArray = ShoppingListCheckOffService.getBoughtItemsArray();
    }

    //ShoppingListService which contains our business logic used in both the controllers
    function ShoppingListCheckOffService() {
        var service = this;

        // List of shopping items to be bought
        var buyItems = [
            {
                name: "Cookies",
                quantity: 10,
            },
            {
                name: "Chips",
                quantity: 5,
            },
            {
                name: "Soda-cans",
                quantity: 8,
            },
            {
                name: "Gummy bears",
                quantity: 6,
            },
            {
                name: "Pepto Bismol",
                quantity: 3,
            }
        ];

        //List of items which are already bought
        var boughtItem = [];
        
        
        //Return the pre-populated array to the ToBuyShoppingController
        service.getBuyItemsArray = function () {
            return buyItems;
        }

        //Remove the items from the buyitems array and add the same item to the bought items array
        service.removeFromBuyAddToBought = function (itemIndex) {
            boughtItem.push(buyItems[itemIndex]);            
            buyItems.splice(itemIndex, 1);
        }

        //Return the bought items array to the AlreadyBoughtShoppingController
        service.getBoughtItemsArray = function () {
            return boughtItem;
        }

    }

})();
(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com')
        .directive('foundItems', FoundItemsDirective)

    //Custom directive
    function FoundItemsDirective() {
        var ddo = {
            templateUrl: "foundItemsList.html",
            scope: {
                found: "<",
                onRemove: "&"
            }
        };
        return ddo;
    }    
   
    NarrowItDownController.$inject = ['MenuSearchService']
    function NarrowItDownController(MenuSearchService) {
        var menu = this;

        menu.found = [];
        menu.description = "";
        menu.error = "";

        menu.getMatchedMenuItems = function () {
            if (menu.description.trim() !== "") {
                menu.error = "";
                var promise = MenuSearchService.getMatchedMenuItems(menu.description);

                promise.then(function (response) {
                    if (response.length == 0) {
                        menu.found = [];
                        menu.error = "Nothing found";
                    }
                    else {
                        menu.found = response;
                    }

                }).catch(function (error) {
                    console.log("Something went terribly wrong");
                })
            }
            else {
                menu.found = [];
                menu.error = "Nothing found";
            }

        }

        menu.removeItem = function (itemIndex) {
            MenuSearchService.removeItem(itemIndex);
        };

    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath']
    function MenuSearchService($http, ApiBasePath) {
        var service = this;

        var foundItems = [];

        service.getMatchedMenuItems = function (searchTerm) {
            return $http({
                method: 'GET',
                url: (ApiBasePath + '/menu_items.json')
            }).then(function (response) {
                foundItems = [];
                var re = new RegExp(searchTerm, "gi");
                for (var i = 0; i < response.data.menu_items.length; i++) {
                    if (re.test(response.data.menu_items[i].description)) {
                        foundItems.push(response.data.menu_items[i]);
                    }
                }
                //console.log(foundItems);
                return foundItems;
            }).catch(function (error) {
                return error;
            })
        }

        service.removeItem = function (itemIndex) {
            foundItems.splice(itemIndex, 1);
        };
    }

})();
(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com')
        .directive('foundItems', FoundItems)


    function FoundItems(){
        var ddo={
            templateUrl:"foundItemsList.html",
            scope:{
                menu:'&found'
            }
        };
        
        return ddo;
    }    

    NarrowItDownController.$inject = ['MenuSearchService']
    function NarrowItDownController(MenuSearchService) {
        var menu = this;

        menu.found = function (searchTerm) {
            var foundItems = MenuSearchService.getMatchedMenuItems(searchTerm);
            return foundItems;
        };

    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath']
    function MenuSearchService($http, ApiBasePath) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            var foundItems = [];
            var promise = $http({
                method: 'GET',
                url: (ApiBasePath + '/menu_items.json'),
            });

            promise.then(function (response) {
                var re = new RegExp(searchTerm, "gi");
                for (var i = 0; i < response.data.menu_items.length; i++) {
                    if (re.test(response.data.menu_items[i].description)) {
                        foundItems.push(response.data.menu_items[i]);
                    }
                }
                console.log(foundItems);
                return foundItems;
            }).catch(function (error) {
                return error;
            })
        }
    }




})();
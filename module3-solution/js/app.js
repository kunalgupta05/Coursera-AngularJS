(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com')

    NarrowItDownController.$inject = ['MenuSearchService']
    function NarrowItDownController(MenuSearchService) {
        var menu = this;

        menu.found = function (searchTerm) {
            var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

            promise.then(function (response) {
                console.log(response.data);
            }).catch(function (error) {
                console.log(error);
            })
        };

    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath']
    function MenuSearchService($http,ApiBasePath) {
        var service = this;

        var foundItems = [];

        service.getMatchedMenuItems = function (searchTerm) {
            var promise = $http({
                method: 'GET',
                url: (ApiBasePath + '/menu_items.json'),
            });
                        
            promise.then(function (response) {
                console.log("I m in");
                for (var i = 0; i < response.data.length; i++) {
                    if (response.data.description == searchTerm) {
                        foundItems.push(response.data[i]);
                    }
                }
                
                
                return foundItems;
            }).catch(function (error) {
                return error;
            })
        }
    }




})();
(function () {
  'use strict';

  angular.module('MenuApp')
    .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {

    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise('/');

    // *** Set up UI states ***
    $stateProvider

      // Home page
      .state('home', {
        url: '/',
        templateUrl: 'src/templates/home.template.html'
      })

      // List of all menu items page
      .state('categories', {
        url: '/categories',
        templateUrl: 'src/templates/categorieslist.template.html',
        controller: 'CategoriesListController as categoriesList',
        resolve: {
          categories: ['MenuDataService', function (MenuDataService) {
            return MenuDataService.getAllCategories();
          }]
        }
      })

      // List of all menu items page
      .state('items', {
        url: '/items/{categoryShortName}',
        templateUrl: 'src/templates/itemslist.template.html',
        controller: 'ItemDetailController as itemDetail',
        resolve: {
          item: ['$stateParams', 'MenuDataService',
            function ($stateParams, MenuDataService) {
              console.log($stateParams.categoryShortName);
              return MenuDataService.getItemsForCategory($stateParams.categoryShortName);                
            }]
        }
      });
  }

})();

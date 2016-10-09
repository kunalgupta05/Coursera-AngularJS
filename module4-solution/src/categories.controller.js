(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoriesListController', CategoriesListController);

CategoriesListController.$inject = ['categories'];
function CategoriesListController(categories) {   
    //console.log(categories.data);   
  var categoriesList = this;
  categoriesList.categories = categories.data;
  
}

})();

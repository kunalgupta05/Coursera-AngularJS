(function () {
'use strict';

angular.module('MenuApp')
.component('categories', {
  templateUrl: 'src/templates/allcategorieslist.template.html',
  bindings: {
    categories: '<'
  }
});

})();

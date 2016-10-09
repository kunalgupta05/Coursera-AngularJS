(function () {
'use strict';

angular.module('data')
.component('categories', {
  templateUrl: 'src/templates/categorieslist.template.html',
  bindings: {
    categories: '<'
  }
});

})();

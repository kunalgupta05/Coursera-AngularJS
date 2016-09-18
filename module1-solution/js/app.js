(function () {
    'use strict';

    angular.module('LunchCheck', [])

    .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
        $scope.lunchItems = "";
        $scope.styleBorderColor={
            "border-color":""
        }
        
        $scope.styleFontColor={
            "color":""
        }
        $scope.message = "";
        $scope.emptyItemMessage="";
        
        $scope.getLunchItems = function () {
            $scope.emptyItemMessage="";
            var items = $scope.lunchItems;
            var emptyItemCount=0;
            if (items !== "") {
                items = items.replace(/\s/g, "").split(",");
                $scope.styleBorderColor['border-color']="green";
                $scope.styleFontColor.color="green";                
                for(var i=0;i<items.length;i++){
                    if(items[i]===""){
                        emptyItemCount++;
                    }
                }
                if(emptyItemCount!==0){
                    $scope.emptyItemMessage=emptyItemCount+" empty items found in the list which are not counted in the actual count of the list."
                }
                if(items.length-emptyItemCount<=3){
                    $scope.message="Enjoy!";                                        
                }
                else{
                    $scope.message="Too much!";
                    $scope.lunchitemStyles.color="green";
                }                                 
            }
            else{
                $scope.message="Please enter data first";
                $scope.styleBorderColor['border-color']="red";
                $scope.styleFontColor.color="red";
            }
        };
    }



})();
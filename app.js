(function () {
'use strict';

var shoppingList = [
  "Milk", "Donuts", "Cookies", "Chocolate", "Peanut Butter", "Pepto Bismol", "Pepto Bismol (Chocolate flavor)", "Pepto Bismol (Cookie flavor)"
];

angular.module('IndexApp', [])
.controller('IndexController', IndexController);

IndexController.$inject = ['$scope'];
function IndexController($scope) {
  $scope.shoppingList = shoppingList;
  $scope.authenticate = function() {
    window.location.replace("https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=22CL4Q&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2FLandingPage.html&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=604800");
  };
}

})();

angular.module('myApp',[])
.controller('firstController',['$scope',function($scope){
    $scope.data = {
        username:"",
        password:"",
        confirmPassword:""
    }
}])
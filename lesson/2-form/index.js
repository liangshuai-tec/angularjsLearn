angular.module('myApp',[])
.controller('firstController',['$scope',function($scope){
    $scope.data = {
        username:"",
        password:"",
        confirmPassword:"",
        email:"",
        url:"",
        sex:"",
        hobbies:[1,2]
    }

    $scope.hobbies = [
        {
            id:1,
            name:'玩游戏'
        },
        {
            id:2,
            name:'写代码'
        },
        {
            id:3,
            name:'睡觉'
        },
    ];

    $scope.toggleHobbySelection = function(id){


        var index = $scope.data.hobbies.indexOf(id);

        if(index === -1){
            $scope.data.hobbies.push(id);
        }else{
            $scope.data.hobbies.splice(index,1);
        }

        console.log($scope.data.hobbies);

    }




}])
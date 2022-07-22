angular.module('myApp',[])
// 数据
.factory('Data',function(){
    return [
        {
            title:'no1',
            content:'no1-content'
        },
        {
            title:'no2',
            content:'no2-content'
        },
        {
            title:'no3',
            content:'no3-content'
        },
    ]
})
.directive('kittencupGroup',function(Data){
    return {
        restrict:'E',
        template:'<div ng-transclude></div>',
        replace: true,
        transclude: true,
        controllerAs:'kittencupGroupController',
    }

})
.directive('kittencupCollapse',function(){
    return {
        restrict:'E',
        require:'^kittencupGroup',  // 指令引用  
        template:'<div class="panel panel-default"><div class="panel-heading" ng-click="openChange()"><h4 class="panel-title" >{{heading}}</h4></div><div ng-class="{\'panel-collapse\':true, collapse:isOpen}"><div class="panel-body" ng-transclude></div></div>',
        replace:true,
        transclude: true,
        scope:{
            // heading:'@heading',
            heading:'@'
        },
        controller:['$scope','Data',function($scope,Data){
            $scope.isOpen = true;
            console.log(Data);
            $scope.openChange = function(){
                $scope.isOpen = !$scope.isOpen;
            }
        }]


        
    }
})
.controller('firstController',['$scope','Data',function($scope,Data){
    $scope.data = Data; // 注入数据
}])
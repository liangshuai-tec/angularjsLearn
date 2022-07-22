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
        controller:['$scope',function($scope){
            // this 指向 controller 对象
            // 把数据埋在 controller 对象上
            this.group = [];
            this.closeOtherCollapse = function(scope){
                angular.forEach(this.group,item => {
                    if(scope != item){
                        item.isOpen = false;
                    }
                })
            }
        }]
    }

})
.directive('kittencupCollapse',function(){
    return {
        restrict:'E',
        template:'<div class="panel panel-default"><div class="panel-heading" ng-click="openChange()"><h4 class="panel-title" >{{heading}}</h4></div><div ng-class="{\'panel-collapse\':true, collapse:!isOpen}"><div class="panel-body" ng-transclude></div></div>',
        replace:true,
        transclude: true,
        scope:{
            // heading:'@heading',
            heading:'@'
        },
        // controller:['$scope','Data',function($scope,Data){
        //     $scope.isOpen = true;
        //     console.log(Data);
        //     $scope.openChange = function(){
        //         $scope.isOpen = !$scope.isOpen;
        //     }
        // }],
        // link + require
        require:'^kittencupGroup',  // 指令引用  引用的是其他指令的controller
        link:function($scope,iElement,iAttrs,kittencupGroupController){
            $scope.isOpen = false; // 打开了么  没有fasle
            $scope.openChange = function(){
                $scope.isOpen = !$scope.isOpen;
                kittencupGroupController.closeOtherCollapse($scope);
            }
            // postLink 连接scope和元素
            kittencupGroupController.group.push($scope);
        }
    }
})
.controller('firstController',['$scope','Data',function($scope,Data){
    $scope.data = Data; // 注入数据
}])
var myApp = angular.module('myApp',[])
.filter('cityFilter',function(){

    return function (data,id){
        var cityFilter = [];
        angular.forEach(data, item => {
            if(item.parent === id){
                cityFilter.push(item);
            }
        });

        return cityFilter;
    }
})
.directive('even',function(){
    return {
        require:'ngModel',
        link:function(scope,ele,attrs,ngModelController){
            ngModelController.$parsers.push(function(viewValue){
                // viewValue ---> modelView
                if(viewValue % 2 === 0){
                    ngModelController.$setValidity('even',true);
                }else{
                    ngModelController.$setValidity('even',false);
                }
                return viewValue;
            });

            // ngModelController.$formatters.push(function(modelValue){
            //     // modelValue ---> viewValue
            //     return modelValue + 123;
            // })
        }
    }

})
.directive('customerTextArea',function(){
    return {
        restrict:'E',
        template:'<div contenteditable="true" ></div>',
        replace: true,
        require:'ngModel',
        link:function(scope,ele,attrs,ngModelController){
            // view -> model
            ele.on('keyup',function(){
                scope.$apply(function(){
                    // $setViewValue, 当view发生变化，从view到model绑定
                    // 保存 viewValue 的值
                    ngModelController.$setViewValue(ele.html());
                })
            })
            // $render 模型发生变化，应该怎么去更新视图
            // 从model到view绑定，将viewValue渲染到页面
            ngModelController.$render = function(){
                ele.html(ngModelController.$viewValue);
            }
        }
    }
})
.controller('firstController',['$scope',function($scope){
    $scope.data = {
        username:"",
        password:"",
        confirmPassword:"",
        email:"",
        url:"",
        sex:"",
        age:"",
        city: 3,
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

    $scope.cities = [
        {
            name: '上海',
            parent: 0,
            id: 1
        },
        {
            name: '上海市',
            parent: 1,
            id: 2
        },
        {
            name: '徐汇区',
            parent: 2,
            id: 8
        },
        {
            name: '长宁区',
            parent: 2,
            id: 3
        },
        {
            name: '北京',
            parent: 0,
            id: 4
        },
        {
            name: '北京市',
            parent: 4,
            id: 5
        },
        {
            name: '东城区',
            parent: 5,
            id: 6
        },
        {
            name: '丰台区',
            parent: 5,
            id: 7
        },
        {
            name: '浙江',
            parent: 0,
            id: 9
        },
        {
            name: '杭州',
            parent: 9,
            id: 100
        },
        {
            name: '宁波',
            parent: 9,
            id: 11
        },
        {
            name: '西湖区',
            parent: 100,
            id: 12
        },
        {
            name: '北仑区‎',
            parent: 11,
            id: 13
        }
    ];



    this.findParentId = function(id){
        var parentId;
        angular.forEach($scope.cities, function(city){
            if(city.id === id){
                parentId = city.parent;
            }
        })

        return parentId;
    }

    this.initCity = function(){
        if($scope.data.city != null){
            $scope.data.area = this.findParentId($scope.data.city);
            $scope.data.province = this.findParentId($scope.data.area);
        }
    }

    // 初始化頁面
    this.initCity.call(this);
    // 初始化副本
    var dataCopy = angular.copy($scope.data);
    $scope.resetFunc = function(){
        $scope.data = angular.copy(dataCopy);
        $scope.myForm.$setPristine();
    }




    $scope.toggleHobbySelection = function(id){
        var index = -1;
        if(Array.isArray($scope.data.hobbies)){
            index = $scope.data.hobbies.indexOf(id);
        }else{
            $scope.data.hobbies = [];
        }

        if(index === -1){
            $scope.data.hobbies.push(id);
        }else{
            $scope.data.hobbies.splice(index,1);
        }
    }




}])
var myApp = angular.module("myApp",[]);


myApp.controller("test1",function($scope){
    $scope.totalPages = 450;
});


myApp.controller("pager",function($scope) {
    
    $scope.count = 4530;    
    $scope.pageIndex = 0;
    $scope.pageSize = 10;
    $scope.pageButtons = [0, 1, 2, 3];    
    
    
    $scope.getPageCount = function () {
        return Math.ceil($scope.count / $scope.pageSize);
    }
    
    $scope.moveFirst = function () {
        $scope.pageButtons[0] = 0
        $scope.pageButtons[1] = 1
        $scope.pageButtons[2] = 2
        $scope.pageButtons[3] = 3

        $scope.pageIndex = $scope.pageButtons[0];
    }

    $scope.moveLast = function () {

        while ($scope.pageButtons[3] <= $scope.getPageCount() - 1) {
            $scope.pageButtons[0] += 4
            $scope.pageButtons[1] += 4
            $scope.pageButtons[2] += 4
            $scope.pageButtons[3] += 4
        }
        $scope.pageIndex = $scope.pageButtons[0];
    }

    
    $scope.moveNextPageGroup = function () {

        if ($scope.pageButtons[3] >= $scope.getPageCount()) {
            //alert(this.pageButtons[3] + ": " + this.getPageCount());
            return;
        }

        $scope.pageButtons[0] += 4
        $scope.pageButtons[1] += 4
        $scope.pageButtons[2] += 4
        $scope.pageButtons[3] += 4


        $scope.pageIndex = $scope.pageButtons[0];
        //$scope.load();

    }
    
    $scope.movePreviousPageGroup = function () {
        if ($scope.pageButtons[0] <= 0) return;

        $scope.pageButtons[0] -= 4
        $scope.pageButtons[1] -= 4
        $scope.pageButtons[2] -= 4
        $scope.pageButtons[3] -= 4
        $scope.pageIndex = $scope.pageButtons[0];
        //$scope.load();
    }
    
    
    $scope.changePage  = function(iPageIndex){
        $scope.pageIndex = iPageIndex;
        //alert('hi')
    }
    
});


var app = angular.module('app', ['ui.router']);

// routes ===================================================================================================

app.config(function ($stateProvider, $urlRouterProvider) {

    // state based routing
    $stateProvider

        .state('main', {
            url: '/',
            templateUrl: 'app/templates/main.html',
            controller: 'mainCtrl'
        })

        .state('file', {
            url: '/file/{id}',
            templateUrl: 'app/templates/file.html',
            controller: 'fileCtrl'
        });

    // fallback url route
    $urlRouterProvider.otherwise('/');

});

// controllers ==============================================================================================

app.controller('mainCtrl', function ($scope, $window, $state) {

    $scope.title = 'Microsoft Office 3.1';
    $scope.description = "A web-scale, enterprise ready, cloud platform purpose built for all of your typing needs. For a limited time we'll throw in a color changing background for free.";

    // check for existing files
    if ($window.localStorage.files) {
        $scope.files = JSON.parse($window.localStorage.files);
    } else {
        $scope.files = [];
    }

    $scope.addFile = function () {
        $scope.files.push('file' + ($scope.files.length + 1));
        $window.localStorage.files = JSON.stringify($scope.files);
        $window.localStorage['file' + $scope.files.length] = '';
    };

    $scope.deleteFile = function (index, file) {
        $scope.files.splice(index, 1);
        $window.localStorage.files = JSON.stringify($scope.files);
        delete $window.localStorage[file];

        if ($scope.files < 1) {
            $state.go('main');
        }
    };

});

app.controller('fileCtrl', function ($scope, $stateParams, $window) {

    if ($window.localStorage[$stateParams.id]) {
        $scope.text = $window.localStorage[$stateParams.id];
    }

    $scope.updateFile = function () {
        $window.localStorage[$stateParams.id] = $scope.text;
    };

});
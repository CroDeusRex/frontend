var warehouseModule = angular.module('WarehouseModule', ['ngRoute']);

warehouseModule.config(function($routeProvider) {

    $routeProvider.when('/', {
        controller: 'homeController',
        templateUrl: 'HtmlTemplates/homepage.html'
    })
    .when('/warehouse/', {
        controller: 'warehouseListController',
        templateUrl: 'HtmlTemplates/warehouseList.html'
    })
    .when('/warehouse/:id/item',{
        controller: 'warehouseEntryEditController',
        templateUrl: 'HtmlTemplates/warehouseEdit.html'
    })
    .when('/order/new',{
        controller: 'listAddNewController',
        templateUrl: 'HtmlTemplates/listAddnew.html'
    })
    .when('/detailedList/:id',{
        controller: 'detailedListController',
        templateUrl: 'HtmlTemplates/detailedList.html'
    })
}).
directive('notOrders', function ()
{
    return {
        restrict: 'AE',
        templateUrl : 'HtmlTemplates/notFinishedOrders.html'
    }
});
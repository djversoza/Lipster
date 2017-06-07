(function(){
  'use strict';
  const app = angular.module('lipster', ['ui.router']);

  app.config(config)
  config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

  function config($stateProvider, $urlRouterProvider, $locationProvider){
    $locationProvider.html5Mode(true)
    $urlRouterProvider.otherwise('/')
    $stateProvider
    .state({
      name: 'home',
      url: '/mainpage',
      component:'main'
    })
    .state({
      name: 'edit',
      url: '/:id/edit',
      component: 'editItem'
    })
    .state({
      name: 'info',
      url: '/:id/info',
      component: 'moreInfo'
    })
    .state({
      name: 'customer',
      url: '/customers',
      component: 'customers'
    })
    .state({
      name: 'sale',
      url: '/sales',
      component: 'sales'
    })
    .state({
      name: 'cInfo',
      url: '/:id/customerinfo',
      component: 'custInfo'
    })
  }
}())

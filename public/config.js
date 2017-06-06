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

  }
}())

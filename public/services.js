(function(){

'use strict';

angular.module('lipster').service('postService', service)

service.inject = ['$http', '$state']

function service($http, $state){
  this.getItems = function(){
    return $http.get('/api/prod').then(res =>{
      return res.data
    })
  };

  this.addItems = function(newItem){
    return $http.post('/api/prod', newItem).then(res =>{
      return res
    })
  };

  this.getOneItem = function(id){
    return $http.get(`api/prod/${id}`).then(data =>{
      return data
    })
  };

  this.updateItem = function(id, newItem){
     $http.patch(`api/prod/${id}`, newItem).then((data) =>{
       $state.go('home')
    })
  };

  this.deleteItem = function(item){
    return $http.delete(`api/prod/${item.id}`).then((data) =>{
      return data
    })
  };




}
}());

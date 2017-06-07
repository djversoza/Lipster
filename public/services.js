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

  this.addSale = function(newSale){
    return $http.post('/api/prod/newsale', newSale).then(res =>{
      return res.data
    })
  };

  this.getSales = function(){
    return $http.get('api/prod/getsale').then(res =>{
      return res.data.rows
    })
  };

  this.getTheseSales = function(id){
    return $http.get(`api/prod/${id}/theseSales`).then(res =>{
      return res.data;
    })
  }

  this.getOneItem = function(id){
    return $http.get(`api/prod/${id}`).then(data =>{
      return data
    })
  };

  this.getOneCust = function (id){
    return $http.get(`api/prod/${id}/getOneCust`).then(data =>{
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

  this.getCustomers = function() {
    return $http.get('api/prod/getCust').then(data =>{
      return data
    })
  }

  this.addCustomer = function(customer) {
    return $http.post('api/prod/addCust', customer).then(res =>{
      return res
    })
  };

  this.logout = function() {
    console.log('in services')
     $http.get('/api/logout')
  };


}
}());

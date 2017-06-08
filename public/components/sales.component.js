(function(){
  'use strict'
  angular.module('lipster')
  .component('sales',{
  templateUrl: 'components/sales.html',
  controller: controller,
  controllerAs: 'vm'
});

controller.inject = ['$http', 'postService', '$state'];

function controller($http, postService, $state){
  const vm = this;
  vm.hide = false
  vm.$onInit = function () {
    postService.getItems().then(res =>{
       vm.posts = res
     }).then(() =>{
       postService.getCustomers().then(res =>{
         vm.custs = res.data.rows;
       }).then(() =>{
         postService.getSales().then(res =>{
           vm.sales = res
         })
       })
     })
  };

  vm.addSale = function() {
    postService.addSale(vm.newSale).then(() =>{
      postService.getSales().then(res =>{
        vm.sales = res
      })
    })
  };

  vm.deleteSale = function(id) {
    if (confirm(`Are you sure you want to delete this sale? \n(This cannot be undone!)`) == true){
     postService.deleteSales(id).then(() =>{
       postService.getSales().then(res =>{
         vm.sales = res
       })
     })
    }
  };

  vm.products = function() {
    $state.go('home')
  };

  vm.customers = function(){
    $state.go('customer')
  };

  vm.logout = function(){
    postService.logout()
    window.location.href = '/';
  };

}

}());

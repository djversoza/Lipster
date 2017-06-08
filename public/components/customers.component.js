(function(){
  'use strict'
  angular.module('lipster')
  .component('customers',{
  templateUrl: 'components/customer.html',
  controller: controller,
  controllerAs: 'vm'
});

controller.inject = ['$http', 'postService', '$state'];

function controller($http, postService, $state){
  const vm = this;
  vm.$onInit = function () {
   postService.getCustomers().then(res =>{
     vm.custs = res.data.rows;
    })
  };


  vm.addCustomer = function () {
    postService.addCustomer(vm.newCustomer).then(res =>{
      vm.custs.push(res.data)
    }).then(() =>{
      postService.getCustomers().then(resp =>{
        vm.custs = resp.data.rows;
        vm.newCustomer.name = "";
      })
    })
  };

  vm.products = function() {
    $state.go('home')
  };

  vm.sales = function() {
    $state.go('sale')
  };

  vm.logout = function(){
    postService.logout()
    window.location.href = '/';
  };

  vm.deleteCust =function(id){
    postService.deleteCust(id).then(() =>{
      postService.getCustomers().then(resp =>{
        vm.custs = resp.data.rows;
      })
    })
  };
}

}());

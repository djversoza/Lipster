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
    console.log('start')
   postService.getCustomers().then(res =>{
     vm.custs = res.data.rows;
     console.log(vm.custs)
    })
  };


  vm.addCustomer = function () {
    postService.addCustomer(vm.newCustomer).then(res =>{
      vm.custs.push(res.data)
    }).then(() =>{
      postService.getCustomers().then(resp =>{
        vm.custs = resp.data.rows
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
}

}());

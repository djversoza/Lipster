(function(){
  'use strict'
  angular.module('lipster')
  .component('custInfo',{
  templateUrl: 'components/custInfo.html',
  controller: controller,
  controllerAs: 'vm'
});

controller.$inject = ['$scope','$http', '$stateParams', '$state', 'postService']
function controller($scope,$http, $stateParams, $state, postService){
  const vm = this;
  let id = $stateParams.id;

  vm.$onInit = function() {
    postService.getOneCust(id).then(res =>{
      vm.cust = res.data.rows[0].customer_name
      vm.sales = res.data.rows;
    })
  };

  vm.cancel = function() {
    $state.go('customer');
  };

}
}());

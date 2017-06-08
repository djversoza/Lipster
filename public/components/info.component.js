(function(){
  'use strict'
  angular.module('lipster')
  .component('moreInfo',{
  templateUrl: 'components/info.html',
  controller: controller,
  controllerAs: 'vm'
});

controller.$inject = ['$scope','$http', '$stateParams', '$state', 'postService', '$rootScope']
function controller($scope,$http, $stateParams, $state, postService, $rootScope){
  const vm = this;
  let id = $stateParams.id;

  vm.$onInit = function() {
    postService.getOneItem(id).then(res =>{
      vm.post = res.data;
    })
    postService.getTheseSales(id).then(resp =>{
      console.log(resp)
      vm.sales = resp;
    })
  };

  vm.deleteThisSale = function(id) {
    if (confirm(`Are you sure you want to delete this sale? \n(This cannot be undone!)`) == true){
     postService.deleteSales(id).then(() =>{
       postService.getTheseSales(id).then(res =>{
         vm.sales = res
       })
     })
    }
  };

  vm.cancel = function() {
    $state.go('home');
  };

}
}());

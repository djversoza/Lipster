(function(){
  'use strict'
  angular.module('lipster')
  .component('moreInfo',{
  templateUrl: 'components/info.html',
  controller: controller,
  controllerAs: 'vm'
});

controller.$inject = ['$scope','$http', '$stateParams', '$state', 'postService']
function controller($scope,$http, $stateParams, $state, postService){
  const vm = this;
  let id = $stateParams.id;

  vm.$onInit = function() {
    postService.getOneItem(id).then(res =>{
      vm.post = res.data;
    })
  };

  vm.cancel = function() {
    $state.go('home');
  };

}
}());

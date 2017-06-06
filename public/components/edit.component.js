(function(){
  'use strict'
  angular.module('lipster')
  .component('editItem',{
  templateUrl: 'components/editComp.html',
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

  vm.updateItem = function() {
    postService.updateItem(id, vm.editItem)
  }

}
}());

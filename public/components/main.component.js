(function(){
  'use strict'
  angular.module('lipster')
  .component('main',{
  templateUrl: 'components/mainComp.html',
  controller: controller,
  controllerAs: 'vm'
});

controller.inject = ['$http', 'postService'];

function controller($http, postService){
  const vm = this;
  vm.$onInit = function () {
   postService.getItems().then(res =>{
      vm.posts = res
    })
  };

  vm.addItems = function(){
    postService.addItems(vm.newItem).then(res =>{
      vm.posts.push(res.data)
    }).then(() =>{
      postService.getItems().then(resp =>{
        vm.posts = resp;
        vm.newItem = ""
      })
    })
  };

  vm.deleteItem = function(item){
    console.log(item.id)
    if (confirm(`Are you sure you want to delete ${item.name}? \n(This cannot be undone!)`) == true) {
      postService.deleteItem(item).then(() =>{
        postService.getItems().then(resp =>{
          vm.posts = resp;
        })
      })
    }

  }
};

}());

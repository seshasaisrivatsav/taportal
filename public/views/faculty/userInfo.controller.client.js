/**
 * Created by manog on 06-12-2016.
 */
(function(){
    angular
        .module("TaPortal")
        .controller("userInfoController", userInfoController);


    function userInfoController($location, $rootScope, UserService, CoursesandSemestersService,$routeParams) {
        var vm = this;
        var userId = $routeParams.uid;
        vm.ratingsarray = [];
        console.log("userid in userinfo controller");
        vm.getProfessorname = getProfessorname;
        vm.professorname="";
        function init() {

            UserService
                .findUserById(userId)
                .then(function (response) {
                    vm.user = response.data;
                    console.log("user in userinfo controller");
                    console.log(vm.user);
                    /*  for (var i = 0; i < vm.user.rating.length; i++) {
                     UserService.findUserById(vm.user.rating[i]._user)
                     .then(function(user){
                     var obj={name:user.username};
                     vm.ratingsarray.push(obj);
                     });
                     }*/

                });

        } init();

        function getProfessorname(id) {
            console.log("am i getting called?");
            console.log(id);
            UserService.findUserById(id)
                .then(function (user) {
                    console.log("almost there");
                    console.log(user.data.username);
                    vm.professorname = user.data.username;
                    console.log(vm.professorname);
                    return vm.professorname;
                })
        }

    }})();
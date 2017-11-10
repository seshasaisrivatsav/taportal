/**
 * Created by seshasai on 11/5/2016.
 */
(function(){
    angular
        .module("TaPortal")
        .controller("SProfileController", SProfileController);

    /* HTML and Java script communicate via scope */
    /* handles the JAVA Script */

    function SProfileController($routeParams, $location, UserService, $rootScope) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.userId = $rootScope.currentUser._id;
        vm.logout = logout;
        var userId = $rootScope.currentUser._id;
        /*it is good practice to declare initialization ina function. say init*/
        function init(){

            UserService
                .findUserById(userId)
                .then(function (response) {
                    vm.user = response.data;
                });
        }
        init();
        // Author: Sesha Sai Srivatsav
        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $location.url("/login");
                    },
                    function () {
                        $location.url("/login");
                    }
                );
        }
        // Author: Sesha Sai Srivatsav
        function deleteUser() {
            UserService
                .deleteUser(userId)
                .then(function (response) {
                    var result= response.data;
                    if(result){
                        $location.url("/login");
                    }else{
                        vm.error = "can't delete you."
                    }
                });
        }
        // Author: Sesha Sai Srivatsav
        function updateUser(user){
            UserService
                .updateUser(userId, user)
                .then(function (res) {
                    var updatedUser = res.data;
                    if (updatedUser){
                        vm.success="successfully updated!";
                    }else{
                        vm.error = "Some thing doesn't seem right here";
                    }
                });
        }



    }


})();

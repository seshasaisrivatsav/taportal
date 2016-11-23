/**
 * Created by seshasai on 11/21/2016.
 */

(function(){
    angular
        .module("TaPortal")
        .controller("SMyJobsDashboardController", SMyJobsDashboardController);

    /* HTML and Java script communicate via scope */
    /* handles the JAVA Script */

    function SMyJobsDashboardController($routeParams, $location, UserService, $rootScope) {
        var vm = this;

        vm.userId = $rootScope.currentUser._id;
        var userId = $rootScope.currentUser._id;
        vm.logout = logout;

        /*it is good practice to declare initialization ina function. say init*/
        function init(){

            UserService
                .findUserById(userId)
                .then(function (response) {
                    vm.user = response.data;
                });
        }
        init();





        


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



    }


})();
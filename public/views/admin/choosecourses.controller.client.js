/**
 * Created by anvitasurapaneni on 12/7/16.
 */

(function(){
    angular
        .module("TaPortal")
        .controller("ChooseCourseController", ChooseCourseController);

    /* HTML and Java script communicate via scope */
    /* handles the JAVA Script */

    function ChooseCourseController($routeParams, $location, UserService, $rootScope,PositionService, applicationsService) {
        var vm = this;

        vm.logout = logout;


        function init(){
            findAllPositions();

        }
        init();




        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                      Developed by Anvita and Manognya                                                      //
        ////////////////////////////////////////////////////////////////////////////////////////////////////



        function findAllPositions() {
            PositionService
                .findAllPositions()
                .then(function (response) {
                    var pos = response.data;

                    for(i=0; i<pos.length; i++){
                        var temp = pos[i].deadline;
                        pos[i].deadline = new Date(temp);
                    }


                    vm.positions = pos;
                    //console.log(  vm.positions);
                    vm.positionCount = vm.positions.length;

                });
        }


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





    }


})();

/**
 * Created by seshasai on 11/21/2016.
 */

(function(){
    angular
        .module("TaPortal")
        .controller("SMyJobsDashboardController", SMyJobsDashboardController);

    /* HTML and Java script communicate via scope */
    /* handles the JAVA Script */

    function SMyJobsDashboardController($routeParams, $location, UserService, $rootScope,applicationsService,PositionService) {
        var vm = this;

        vm.userId = $rootScope.currentUser._id;
        var userId = $rootScope.currentUser._id;
        vm.logout = logout;
        vm.deleteapplication=deleteapplication;
        vm.findApplicationForUser = findApplicationForUser;



        function init(){
            vm.applicationnames=[];
            findApplicationForUser();

        }
        init();

        // Author : Manognya
        function findApplicationForUser() {
            applicationsService
                .findApplicationForUser(userId)
                .then(function (response) {
                    vm.applications = response.data;
                    for (var i = 0; i < vm.applications.length; i++) {
                        PositionService.findPositionById(vm.applications[i]._position)
                            .then(function(position){
                                var obj={name:position.data.course};
                                
                                vm.applicationnames.push(obj);
                            });
                    }

                });
        }


        // Author : Manognya
        function deleteapplication(applicationname){
            PositionService.findPositionIDByTitle(applicationname)
                .then(function(response){
                    var posId = response.data;

                    for (var i = 0; i < vm.applications.length; i++) {

                        if(vm.applications[i]._position==posId){
                            applicationsService.deleteApplication(vm.applications[i]._id)
                                .then(function (response) {
                                    vm.deletemsg = "application withdrawn successfully!";
                                })
                        }
                    }

                    init();
                })

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
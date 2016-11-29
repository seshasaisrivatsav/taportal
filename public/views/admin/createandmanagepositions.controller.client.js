/**
 * Created by seshasai on 11/17/2016.
 */


/**
 * Created by seshasai on 11/16/2016.
 */
///ManageCoursesSemestersController

(function () {
    angular
        .module("TaPortal")
        .controller("ManageCreatePositionsController",ManageCreatePositionsController);

    function ManageCreatePositionsController($rootScope, $location, $sce, PositionService, UserService,CoursesandSemestersService) {
        var vm = this;

        vm.createPosition = createPosition;
        vm.updatePosition  = updatePosition;
        vm.deletePosition = deletePosition;
        vm.updateDeadline = updateDeadline;
        vm.logout = logout;

        function init() {
            findAllPositions();
            getLoggedInUser();
            findAllCourses();
            findAllSemesters();
        }
        init();


        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                      Developed by Srivatsav                                                      //
        ////////////////////////////////////////////////////////////////////////////////////////////////////


        // Author: Sesha Sai Srivatsav

        function updateDeadline(semestername, deadline) {
            var position = {
                semester : semestername,
                deadline : deadline
            };
            PositionService
                .updateDeadline(position)
                .then(
                    function (response) {
                        vm.updatedmessage = "Updated Successfully!";
                    }
                );
        }


        // Author: Sesha Sai Srivatsav

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

        function createPosition(coursename, semestername, number, professor, deadline) {
            //console.log("from create " + deadline);
            var position = {
                course : coursename,
                semester : semestername,
                number : number,
                professor : professor,
                deadline :deadline
            };

            PositionService
                .createPosition(position)
                .then(
                    function (response) {
                        vm.createsuccess = "Created TA Position Successfully";

                        // PositionService
                        //     .findAllPositions()
                        //     .then(
                        //         function (response) {
                        //             vm.positions = response.data;
                        //             vm.positionCount = vm.positions.length;
                        //         }
                        //  );
                        init();
                    }
                )
        }


        // Author: Sesha Sai Srivatsav

        function updatePosition(positionId, position) {
            PositionService
                .updatePosition(positionId, position)
                .then(
                    function (response) {
                        vm.updatedmessage = "Updated Successfully!";
                        // PositionService
                        //     .findAllPositions()
                        //     .then(
                        //         function (response) {
                        //             vm.positions = response.data;
                        //             vm.positionCount = vm.positions.length;
                        //         }
                        //     );
                        init();
                    }
                );
        }

        // Author: Sesha Sai Srivatsav

        function deletePosition(positionId) {
            PositionService
                .deletePosition(positionId)
                .then(
                    function (response) {
                        vm.warning = "Deleted Successfully!";
                        vm.createsuccess = null;
                        // PositionService
                        //     .findAllPositions()
                        //     .then(
                        //         function (response) {
                        //             vm.positions = response.data;
                        //             vm.positionCount = vm.positions.length;
                        //         }
                        //     );
                        init();
                    }
                )
        }

        // Author: Sesha Sai Srivatsav

        function findAllCourses() {
            CoursesandSemestersService
                .findAllCourses()
                .then(function (response) {
                    vm.courses =  response.data;
                    vm.courseCount = vm.courses.length;
                })
        }


        // Author: Sesha Sai Srivatsav

        function findAllSemesters() {
            CoursesandSemestersService
                .findAllSemesters()
                .then(function (response) {
                    vm.semesters =  response.data;
                    vm.semesterCount = vm.semesters.length;
                })
        }

        // Author: Sesha Sai Srivatsav

        function getLoggedInUser() {
            if($rootScope.currentUser){
                vm.loggedIn = "true";
                loggedInUserId = $rootScope.currentUser._id;

            } else {
                vm.notloggedIn = "true";

            }
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
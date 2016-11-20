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


        vm.fromcontroller = "2015-05-29T19:06:16.693209Z";


        function init() {
            findAllPositions();
            getLoggedInUser();
            findAllCourses();
            findAllSemesters();
        }
        init();
        
        function findAllPositions() {
            PositionService
                .findAllPositions()
                .then(function (response) {
                    vm.positions = response.data;
                    //console.log(  vm.positions);
                    vm.positionCount = vm.positions.length;

                });
        }

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

                        PositionService
                            .findAllPositions()
                            .then(
                                function (response) {
                                    vm.positions = response.data;
                                    vm.positionCount = vm.positions.length;
                                }
                         );
                    }
                )
        }


        function updatePosition(positionId, position) {
            PositionService
                .updatePosition(positionId, position)
                .then(
                    function (response) {
                        vm.updatedmessage = "Updated Successfully!";
                        PositionService
                            .findAllPositions()
                            .then(
                                function (response) {
                                    vm.positions = response.data;
                                    vm.positionCount = vm.positions.length;
                                }
                            );
                    }
                );
        }

        function deletePosition(positionId) {
            PositionService
                .deletePosition(positionId)
                .then(
                    function (response) {
                        vm.warning = "Deleted Successfully!";
                        vm.createsuccess = null;
                        PositionService
                            .findAllPositions()
                            .then(
                                function (response) {
                                    vm.positions = response.data;
                                    vm.positionCount = vm.positions.length;
                                }
                            );
                    }
                )
        }

        function findAllCourses() {
            CoursesandSemestersService
                .findAllCourses()
                .then(function (response) {
                    vm.courses =  response.data;
                    vm.courseCount = vm.courses.length;
                })
        }


        function findAllSemesters() {
            CoursesandSemestersService
                .findAllSemesters()
                .then(function (response) {
                    vm.semesters =  response.data;
                    vm.semesterCount = vm.semesters.length;
                })
        }

        function getLoggedInUser() {
            if($rootScope.currentUser){
                vm.loggedIn = "true";
                loggedInUserId = $rootScope.currentUser._id;

            } else {
                vm.notloggedIn = "true";

            }
        }



    }
})();
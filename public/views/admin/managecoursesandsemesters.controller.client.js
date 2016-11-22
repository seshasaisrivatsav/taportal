/**
 * Created by seshasai on 11/16/2016.
 */
///ManageCoursesSemestersController

(function () {
    angular
        .module("TaPortal")
        .controller("ManageCoursesSemestersController",ManageCoursesSemestersController);

    function ManageCoursesSemestersController($rootScope, $location, $sce, UserService,CoursesandSemestersService) {
        var vm = this;


        vm.createCourse = createCourse;
        vm.createSemester = createSemester;
        vm.updateCourse = updateCourse;
        vm.deleteCourse = deleteCourse;
        vm.deleteSemester = deleteSemester;
        vm.updateSemester = updateSemester;
        vm.logout = logout;

        function init() {
            findAllCourses();
            findAllSemesters();
            getLoggedInUser();
        }
        init();


        function createCourse(coursename){

            var course = {
                coursename : coursename
            };

            CoursesandSemestersService
                .createCourse(course)
                .then(
                    function (response) {
                        vm.createsuccess="Course created successfully";

                        CoursesandSemestersService
                            .findAllCourses()
                            .then(
                                function(response){
                                    vm.courses = response.data;
                                    vm.courseCount = vm.courses.length;
                                }
                            )
                    }
                )
        }

        function updateCourse(courseId, course) {
            CoursesandSemestersService
                .updateCourse(courseId, course)
                .then(function (response) {
                    vm.updatedmessage = "Updated Successfully!";
                    CoursesandSemestersService
                        .findAllCourses()
                        .then(
                            function (response) {
                                vm.courses = response.data;
                                vm.courseCount = vm.courses.length;
                            }
                        )
                })
            
        }

        function deleteCourse(courseId) {

            CoursesandSemestersService
                .deleteCourse(courseId)
                .then(
                    function (response) {
                        vm.warning = "Deleted Successfully!";
                        vm.createsuccess = null;
                        CoursesandSemestersService
                            .findAllCourses()
                            .then(
                                function (response) {
                                    vm.courses = response.data;
                                    vm.courseCount = vm.courses.length;
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

        function createSemester(semestername){

            var semester = {
                semestername : semestername
            };

            CoursesandSemestersService
                .createSemester(semester)
                .then(
                    function (response) {
                        vm.screatesuccess="semester created successfully";

                        CoursesandSemestersService
                            .findAllSemesters()
                            .then(
                                function(response){
                                    vm.semesters = response.data;
                                    vm.semesterCount = vm.semesters.length;
                                }
                            )
                    }
                )
        }

        function updateSemester(semesterId, semester) {
            CoursesandSemestersService
                .updateSemester(semesterId, semester)
                .then(function (response) {
                    vm.supdatedmessage = "Updated Semester Successfully!";
                    CoursesandSemestersService
                        .findAllSemesters()
                        .then(
                            function (response) {
                                vm.semesters = response.data;
                                vm.semesterCount = vm.semesters.length;
                            }
                        )
                })

        }

        function deleteSemester(semesterId) {
           
            CoursesandSemestersService
                .deleteSemester(semesterId)
                .then(
                    function (response) {
                        vm.swarning = "Deleted Semester Successfully!";
                        vm.createsuccess = null;
                        CoursesandSemestersService
                            .findAllSemesters()
                            .then(
                                function (response) {
                                    vm.semesters = response.data;
                                    vm.semesterCount = vm.semesters.length;
                                }
                            );
                    }
                )
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
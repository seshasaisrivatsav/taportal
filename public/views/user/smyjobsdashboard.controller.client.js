/**
 * Created by seshasai on 11/21/2016.
 */
(function(){
    angular
        .module("TaPortal")
        .controller("SMyJobsDashboardController", SMyJobsDashboardController);

    /* HTML and Java script communicate via scope */
    /* handles the JAVA Script */

    function SMyJobsDashboardController($routeParams, $location, UserService, $rootScope, CoursesandSemestersService, PositionService,applicationsService) {
        var vm = this;

        vm.userId = $rootScope.currentUser._id;
        var userId = $rootScope.currentUser._id;
        vm.logout = logout;
        vm.findApplicationForUser = findApplicationForUser;
        vm.deleteApplication=deleteApplication;

        /*it is good practice to declare initialization ina function. say init*/
        function init(){
            findAllCourses();
            findAllSemesters();
            findAllPositions();
            findApplicationForUser();

        }
        init();



        // Author : Sesha Sai
        // Finds all applications for a student
        function findApplicationForUser() {
            applicationsService
                .findApplicationForUser(userId)
                .then(function (response) {

                    var appsforuser = response.data;
                    var temparray = [];
                    var j = -1;
                    for(var i =0; i<appsforuser.length; i++){
                        PositionService
                            .findPositionById(appsforuser[i]._position)
                            .then(function(response){
                                j++;
                                var position = response.data.course;

                                var tempobj = {};
                                tempobj._id = appsforuser[j]._id;
                                tempobj.availability = appsforuser[j].availability;
                                tempobj.priority = appsforuser[j].priority;
                                tempobj.beenTASemester = appsforuser[j].beenTASemester;
                                tempobj.gradeObtained= appsforuser[j].gradeObtained;
                                tempobj.previouslyTaken= appsforuser[j].previouslyTaken;
                                tempobj.remarks= appsforuser[j].remarks;
                                tempobj.status = appsforuser[j].status;
                                tempobj.courseName = position;
                                temparray.push(tempobj);
                                vm.applications = temparray;

                            });


                    }




                })
        }


        // Author : Sesha Sai Srivatsav
        // Withdraws an application for a user
        function deleteApplication(applicationId) {
            applicationsService
                .deleteApplication(applicationId)
                .then(
                    function (response) {
                        init();
                        vm.warning = "Deleted Successfully!";

                    }
                )
        }


        // Author : Sesha Sai
        function findAllSemesters() {
            CoursesandSemestersService
                .findAllSemesters()
                .then(function (response) {
                    vm.semesters =  response.data;
                    vm.semesterCount = vm.semesters.length;
                })
        }

        // Author : Sesha Sai
        function findAllCourses() {
            CoursesandSemestersService
                .findAllCourses()
                .then(function (response) {
                    vm.courses =  response.data;
                    vm.courseCount = vm.courses.length;
                })
        }

        // Author : Sesha Sai
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
                    vm.positionCount = vm.positions.length;

                });
        }


        // Author : Sesha Sai
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
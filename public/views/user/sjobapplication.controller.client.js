/**
 * Created by seshasai on 11/21/2016.
 */
(function(){
    angular
        .module("TaPortal")
        .controller("SJobApplicationController", SJobApplicationController);

    /* HTML and Java script communicate via scope */
    /* handles the JAVA Script */

    function SJobApplicationController($routeParams, $location, UserService, $rootScope, CoursesandSemestersService, PositionService,applicationsService) {
        var vm = this;

        vm.userId = $rootScope.currentUser._id;
        var userId = $rootScope.currentUser._id;
        vm.logout = logout;
        vm.updateposnum = updateposnum;
        vm.updateApplication = updateApplication ;
        vm.createApplications=createApplications;
        vm.findApplicationForUser = findApplicationForUser;

        vm.deleteApplication=deleteApplication;


        var newap_pos = "";
        function updateposnum(position){
            var vals = position.split("+");
            vm.tempposnum = vals[1];
            vm.tempsemester = vals[2];
            newap_pos = vals[0];

        }



        /*it is good practice to declare initialization ina function. say init*/
        function init(){
            findAllCourses();
            findAllSemesters();
            findAllPositions();
            findApplicationForUser();

        }
        init();


        // Author : Sesha Sai
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
                                    tempobj.courseName = position;
                                    temparray.push(tempobj);
                                vm.applications = temparray;
                               
                         });


                    }
                })
        }

        // Author : Sesha Sai
        function createApplications(application){
            var _pos = application._position;
            application._position = newap_pos;
            application.status = "In Progress";



            UserService
                .findUserById(userId)
                .then(function (response) {
                    vm.user = response.data;
                    // avgRating, gpa, coursesTaken, currentCourses, email, phone
                    applicationsService
                        .findApplicationForUser(userId)
                        .then(function (response) {
                            //Priority Validations. No two applications can have same priority
                            if (response.data.length ==1 && application.priority == response.data[0].priority) {

                                    vm.updatedmessage = "Na Na! Can't select 2 same priorities for one application";
                                
                            }
                            else if(response.data.length ==2 && (application.priority == response.data[0].priority || application.priority == response.data[1].priority) ){

                                    vm.updatedmessage = "Na Na! Can't select 2 same priorities for one application";


                            //Student must enter grade if the course previously taken
                            }
                            else if(application.previouslyTaken != null && application.gradeObtained == null){
                                vm.error1 = "Must enter grade obtained if course previously taken";
                            }
                            // Student MUST give out availibility
                            else if(application.availability ==null){
                                vm.error2 = "Enter your availability! please";
                            }
                            // Student Must enter course if been TA before
                            else if(application.beenTASemester != null && application.previouslyTaken ==null){
                                vm.error3 = "Enter your course taken semester if you were a TA before";
                            }

                            // Restricting applications to 3 per student . Change this code to make any differences to number of applications per user
                            else if(response.data.length==0 || response.data.length==1 ||response.data.length==2){
                                PositionService.findPositionIDByTitle(application._position)
                                    .then(function(response){
                                        var posId = response.data;

                                        applicationsService.createApplication(application,vm.userId,posId,vm.user.avgRating, vm.user.gpa, vm.user.coursesTaken, vm.user.currentCourses, vm.user.email, vm.user.phone, vm.user.resumeName, vm.user.resumeURL)
                                            .then(function (response){
                                                init();
                                            })
                                    });

                            } else{
                                vm.updatedmessage = "Maximum applications for course = 3. please withdraw un-required application!";
                            }



                        })
                });


        }

        // Author : Sesha Sai Srivatsav
        function updateApplication(applicationId, application) {
            applicationsService
                .updateApplication(applicationId, application)
                .then(
                    function (response) {
                        vm.updatedmessage = "Updated Successfully!";
                        init();
                    }
                );
        }


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
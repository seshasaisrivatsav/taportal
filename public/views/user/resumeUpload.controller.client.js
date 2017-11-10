(function(){
    angular
        .module("TaPortal")
        .controller("ResumeUploadController", ResumeUploadController);

    /* HTML and Java script communicate via scope */
    /* handles the JAVA Script */

    function ResumeUploadController($routeParams, $location, UserService, $rootScope, CoursesandSemestersService) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.userId = $rootScope.currentUser._id;
        var userId = $rootScope.currentUser._id;
        vm.logout = logout;


        vm.addCurrentCourses =addCurrentCourses;
        vm.deleteCurrentCourse = deleteCurrentCourse;

        vm.addUserCourses = addUserCourses;
        vm.deleteUserCourse = deleteUserCourse;


        var user;
        var oldCoursesCurrent;
        var oldCoursesTaken;

        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                      Developed by Srivatsav                                                      //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /*it is good practice to declare initialization ina function. say init*/



        // Author: Sesha Sai Srivatsav
        function init(){
            UserService
                .findUserById(userId)
                .then(function (response) {
                    vm.user = response.data;
                    user = vm.user;
                    // oldCoursesCurrent = user.currentCourses;
                    // oldCoursesTaken = user.coursesTaken;
                });


            CoursesandSemestersService
                .findAllCourses()
                .then(function (response) {
                    vm.courses = response.data;

                });
        }
        init();


        // Author: Sesha Sai Srivatsav
        function addCurrentCourses(user) {
            UserService
                .addCurrentCourses(userId, user)
                .then(function (res) {
                    var updatedUser = res.data;
                    if(updatedUser){
                        vm.success="Successfully updated courses";
                        init();
                    }else {
                        vm.error="Someting is off";
                    }
                })
        }

        // Author: Sesha Sai Srivatsav
        function deleteCurrentCourse(course) {
            UserService
                .deleteCurrentCourse(userId, course)
                .then(function (res) {
                    var updatedUser = res.data;
                    if(updatedUser){
                        vm.success="Successfully Deleted courses";
                        init();
                    }else {
                        vm.error="Something is off";
                    }
                })

        }

        // Author: Sesha Sai Srivatsav
        function deleteUserCourse(course) {
            UserService
                .deleteUserCourse(userId, course)
                .then(function (res) {
                    var updatedUser = res.data;
                    if(updatedUser){
                        vm.success="Successfully Deleted courses";
                        init();
                    }else {
                        vm.error="Something is off";
                    }
                })

        }


        // Author: Sesha Sai Srivatsav
        function addUserCourses(user) {
            UserService
                .addUserCourses(userId, user)
                .then(function (res) {
                    var updatedUser = res.data;
                    if(updatedUser){
                        vm.success="Successfully updated courses";
                        init();
                    }else {
                        vm.error="Someting is off";
                    }
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






        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                      Developed by Manognya                                                      //
        ////////////////////////////////////////////////////////////////////////////////////////////////////


        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                      Developed by Anvita                                                      //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        function updateUser(user){
            if(vm.myform.$valid == false){

                vm.alert = "* Enter the fields";

            }else {
                UserService
                    .updateUser(userId, user)
                    .then(function (res) {
                        var updatedUser = res.data;
                        if (updatedUser){
                            vm.success="successfully updated!";
                            init();
                        }else{
                            vm.error = "Some thing doesn't seem right here";
                        }
                    });
            }
        }

    }


})();
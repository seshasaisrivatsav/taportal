(function(){
    angular
        .module("TaPortal")
        .controller("FRegisterController", FRegisterController);

    /* HTML and Java script communicate via scope */
    /* handles the JAVA Script */

    function FRegisterController($location, $rootScope, UserService, CoursesandSemestersService) {
        var vm = this;

        vm.register = register;



        function init() {
            findAllCourses();

        }
        init();



        function findAllCourses() {
            CoursesandSemestersService
                .findAllCourses()
                .then(function (response) {
                    vm.courses =  response.data;
                    vm.courseCount = vm.courses.length;
                })
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                      Developed by Srivatsav                                                      //
        ////////////////////////////////////////////////////////////////////////////////////////////////////

        // Author: Sesha Sai Srivatsav

        function register(username, password, firstName, lastName, email, usertype) {
            var usertype = "faculty";
            
            if(vm.myform.$valid == false){
                vm.error = "Enter the username/password";
                vm.alert = "* Enter the fields";
                if(vm.myform.password !== vm.myform.vpassword){
                    vm.pwmatch = "entered passwords do not match!";
                }
            }else {
                UserService
                    .register(username,password, firstName, lastName, email, usertype)
                    .then(function (response) {
                            var user = response.data;
                            if(user){
                                $location.url("/feditprofile");
                            }

                        },
                        function (err) {
                            vm.error = err;
                        });
            }

        }

    }

})();
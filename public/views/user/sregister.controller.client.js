(function(){
    angular
        .module("TaPortal")
        .controller("SRegisterController", SRegisterController);

    /* HTML and Java script communicate via scope */
    /* handles the JAVA Script */

    function SRegisterController($location, UserService) {
        var vm = this;

        vm.register = register;

        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                      Developed by Srivatsav                                                      //
        ////////////////////////////////////////////////////////////////////////////////////////////////////

        function register(username, password, firstName, lastName, email, usertype) {
            var usertype = "student";
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
                                $location.url("/seditprofile");
                            }

                        },
                        function (err) {
                            vm.error = err;
                        });
            }

        }

    }

})();
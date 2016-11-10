(function(){
    angular
        .module("TaPortal")
        .controller("FRegisterController", FRegisterController);

    /* HTML and Java script communicate via scope */
    /* handles the JAVA Script */

    function FRegisterController($location, UserService) {
        var vm = this;

        vm.register = register;



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
                                $location.url("/fprofile");
                            }

                        },
                        function (err) {
                            vm.error = err;
                        });
            }

        }

    }

})();
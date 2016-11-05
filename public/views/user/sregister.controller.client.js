(function(){
    angular
        .module("TaPortal")
        .controller("SRegisterController", SRegisterController);

    /* HTML and Java script communicate via scope */
    /* handles the JAVA Script */

    function SRegisterController($location, UserService) {
        var vm = this;

        vm.register = register;

        function register(username, password) {
            var usertype="student";
            if(vm.myform.$valid == false){
                vm.error = "Enter the username/password";
                vm.alert = "* Enter the fields";
                if(vm.myform.password !== vm.myform.vpassword){
                    vm.pwmatch = "entered passwords do not match!";
                }
            }else {
                UserService

                    .register(username,password,usertype)
                    .then(function (response) {
                            var user = response.data;
                            if(user){

                                $location.url("/user");
                            }

                        },
                        function (err) {
                            vm.error = err;
                        });
            }

        }

    }





})();
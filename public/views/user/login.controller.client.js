/**
 * Created by seshasai on 11/5/2016.
 */

(function(){
    angular
        .module("TaPortal")
        .controller("LoginController", LoginController);

    /* HTML and Java script communicate via scope */
    /* handles the JAVA Script */


    function LoginController($location, UserService){
        /* vm is view model. bound to instance of controller */
        /* we bind instance of controller to local variable vm. where ever we bind to VM, we are bound to instance of controller */
        var vm = this;


        // vm.login = function (username, password) {
        //     var user = UserService.findUserByCredentials (username, password);
        //     if (user){
        //         $location.url("/user/"+user._id);
        //     } else {
        //         vm.error = "User not found";
        //     }
        // }

        vm.login = function (username, password) {
            /*receives a promise which allows us to register
             a function that will be invoked when the server comes back with data
             API called .then is used
             */
            if(vm.myform.$valid == false){
                vm.error = "Enter the username/password";
                vm.alert = "* Enter the required fields";
            }else{
                UserService
                //  .findUserByCredentials (username, password)
                    .login(username, password)
                    .then(function (response) {


                        /* this is NOT synchronous */
                        var user = response.data;

                        if (user._id){
                            $location.url("/sprofile");
                        } else {
                            vm.error = response.data;
                        }
                    });
            }
        }

    }

})();


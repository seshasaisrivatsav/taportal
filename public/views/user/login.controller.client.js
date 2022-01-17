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
        let vm = this;


        // vm.login = function (username, password) {
        //     let user = UserService.findUserByCredentials (username, password);
        //     if (user){
        //         $location.url("/user/"+user._id);
        //     } else {
        //         vm.error = "User not found";
        //     }
        // }
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                      Developed by Srivatsav                                                      //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        // Author: Sesha Sai Srivatsav
        vm.login = function (username, password) {
            console.log("inside login");
            /*receives a promise which allows us to register
             a function that will be invoked when the server comes back with data
             API called .then is used
             */
            if (vm.myform.$valid == false){
                vm.error = "Enter the username/password";
                vm.alert = "* Enter the required fields";
            } else {
                UserService
                //  .findUserByCredentials (username, password)
                    .login(username, password)
                    .then(function (response) {


                        /* this is NOT synchronous */
                        let user = response.data;

                        if (user.usertype == "student"){
                            $location.url("/sprofile");
                        } else if(user.usertype=="faculty"){
                            $location.url("/fprofile");
                        } else if(user.usertype=="admin"){
                            $location.url("/aconsole")
                        }else{
                            vm.error = response.data;
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        }

    }

})();


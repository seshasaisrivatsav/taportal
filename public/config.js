/**
 * Created by seshasai on 11/3/2016.
 */


(function () {
    angular
        .module("TaPortal")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider


 

        // Student Profile
            .when("/fprofile",{
                templateUrl :"views/faculty/fprofile.view.client.html",
                controller: "FProfileController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })

            // Student Job Application
            .when("/studentjobapplication", {
                templateUrl : "views/user/sjobapplication.view.client.html",
                controller: "SJobApplicationController",
                controllerAs : "model",
                resolve:{
                    loggedIn: checkLoggedIn
                }
            })

            .when("/myjobsdashboard",{
                templateUrl : "views/user/smyjobsdashboard.view.client.html",
                controller: "SMyJobsDashboardController",
                controllerAs : "model",
                resolve:{
                    loggedIn: checkLoggedIn
                }
            })

            .when("/aconsole",{
                templateUrl: "views/admin/aconsole.view.client.html",
                controller: "AConsoleController",
                controllerAs: "model",
                resolve:{
                    loggedIn: checkLoggedIn
                }
            })


            // Admin profile
            .when("/aprofile",{
                templateUrl :"views/admin/aprofile.view.client.html",
                controller: "AProfileController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })

            .when("/manageusers",{
                templateUrl: "views/admin/manageusers.view.client.html",
                controller: "ManageUsersController",
                controllerAs: "model",
                resolve:{
                    loggedIn: checkLoggedIn
                }
            })

            .when("/rolemanager",{
                templateUrl : "views/admin/manageusers.role.manager.view.client.html",
                controller : "ManageUsersController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            
            .when("/updatedeleteusers", {
                templateUrl: "views/admin/manageusers.updatedelete.view.client.html",
                controller : "ManageUsersController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            
            .when("/addcoursesandsemesters",{
                templateUrl: "views/admin/managecoursesandsemesters.view.client.html",
                controller: "ManageCoursesSemestersController",
                controllerAs: "model",
                resolve:{
                    loggedIn: checkLoggedIn
                }
            })
                
            .when("/createandmanageapplications", {
                templateUrl : "views/admin/createandmanagepositions.view.client.html",
                controller: "ManageCreatePositionsController",
                controllerAs : "model",
                resolve:{
                    loggedIn: checkLoggedIn
                }
            })

            .when("/setpositiondeadlines", {
                templateUrl : "views/admin/createandmanagepositions.setdeadlines.view.client.html",
                controller: "ManageCreatePositionsController",
                controllerAs : "model",
                resolve:{
                    loggedIn: checkLoggedIn
                }
            })
                
                
            // Admin Edit Profile
            .when("/aeditprofile",{
                templateUrl :"views/admin/aprofileedit.view.client.html",
                controller: "AEditProfileController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })

            // Faculty Register
            .when("/fregister",{
                templateUrl: "views/faculty/fregsiter.view.client.html",
                controller: "FRegisterController",
                controllerAs: "model"
                // ,
                // resolve: {
                //     freeView : freeView
                // }
            })

            // Faculty Edit Profile
            .when("/feditprofile",{
                templateUrl :"views/faculty/fprofileedit.view.client.html",
                controller: "FEditProfileController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })


            // Student Profile
            .when("/sprofile",{
                templateUrl :"views/user/sprofile.view.client.html",
                controller: "SProfileController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })

            // Student Edit Profile
            .when("/seditprofile",{
                templateUrl :"views/user/sprofileedit.view.client.html",
                controller: "SEditProfileController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })


            // Student Register
            .when("/sregister",{
                templateUrl: "views/user/sregister.view.client.html",
                controller: "SRegisterController",
                controllerAs: "model"
                // ,
                // resolve: {
                //     freeView : freeView
                // }
            })

            // Home page is the login page
            .when("/home", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs : "model"
            })

            // Any other error takes to login page
            .otherwise({
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs : "model"
            });


        // $q is part of angularlibrary used to handle promises(asynchronous calls)
        function checkLoggedIn(UserService, $location, $q, $rootScope) {
            //deferred obj has promise
            var deferred = $q.defer();
            UserService
                .loggedIn()
                .then(function (response) {
                    var user = response.data;
                    if(user=='0'){
                        $rootScope.currentUser = null;
                        deferred.reject();
                        $location.url("/login");
                    }else{
                        $rootScope.currentUser = user;
                        deferred.resolve();
                    }
                },function (err) {
                    $location.url("/login");
                });

            return deferred.promise;
        }

        function freeView (UserService, $location, $q, $rootScope) {
            var deferred = $q.defer();
            UserService
                .loggedIn()
                .then(
                    function (response) {
                        var user = response.data;
                        if(user == '0'){
                            deferred.resolve();
                        } else {
                            $rootScope.currentUser = user;
                            deferred.resolve();
                        }
                    },
                    function (err) {
                        $location.url("/login");
                    }
                );
            return deferred.promise;
        }



    }
})();

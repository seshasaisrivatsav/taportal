/**
 * Created by seshasai on 11/3/2016.
 */


(function () {
    angular
        .module("TaPortal")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider

            .when("/sregister",{
                templateUrl: "views/user/sregister.view.client.html",
                controller: "SRegisterController",
                controllerAs: "model"
            })

            .when("/home", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs : "model"
            })
            .otherwise({
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs : "model"
            });
    }
})();

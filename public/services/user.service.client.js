/**
 * Created by seshasai on 11/5/2016.
 */
(function(){
    angular
        .module("TaPortal")
        .factory("UserService", UserService);




    function UserService($http) {
        /* provide an API that allows access to this thing */
        var api = {
            loggedIn: loggedIn,
            createUser: createUser,
            register: register,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            updateUser: updateUser,
            deleteUser: deleteUser,
            login: login,
            logout: logout,
<<<<<<< HEAD
            findUserByUsername: findUserByUsername,
            findAllUsers: findAllUsers
=======
            findUserByUsername: findUserByUsername

>>>>>>> 2773ecc4b8401a6fb8f3fc711720ec3ce41f96d9
        };

        return api;
        /*functions are implemented below*/

        function register(username,password, firstName, lastName, email, usertype) {


            var user= {
                username: username,
                password : password,
                firstName: firstName,
                lastName: lastName,
                email: email,
                usertype: usertype
            };
<<<<<<< HEAD
         
=======

>>>>>>> 2773ecc4b8401a6fb8f3fc711720ec3ce41f96d9
            return $http.post("/api/register",user);

        }

<<<<<<< HEAD
        function findAllUsers() {
            var url = "/api/findallusers";
            return $http.get(url);
        }
=======
>>>>>>> 2773ecc4b8401a6fb8f3fc711720ec3ce41f96d9

        function loggedIn() {
            return $http.get("/api/loggedIn");
        }
        function logout() {
            return $http.post("/api/logout" );
        }
        function login(username, password) {
            var user ={
                username: username,
                password: password
            };
            return $http.post("/api/login", user);

        }
        function findUserByCredentials(username, password){

            var url = "/api/user?username="+username+"&password="+password;
            return $http.get(url);
        }

        function createUser(user) {
            var url = "/api/user";
            return $http.post(url,user);

        }

        function findUserById(userId) {
            var url = "/api/user/" + userId;
            return $http.get(url);
        }

        function findUserByUsername(username){
            var url ="/api/user?username="+username;
            return $http.get(url);

        }



        function updateUser(userId, user){
            var url="/api/user/"+userId;
            return $http.put(url, user);


        }


        function deleteUser(userId){
            var url = "/api/user/"+userId;
            return $http.delete(url);

        }


<<<<<<< HEAD
        
=======

>>>>>>> 2773ecc4b8401a6fb8f3fc711720ec3ce41f96d9
    }
})();
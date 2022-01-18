/**
 * Created by seshasai on 11/5/2016.
 */
(function(){
    angular
        .module("TaPortal")
        .factory("UserService", UserService);

    function UserService($http) {
        /* provide an API that allows access to this thing */
        const api = {
            loggedIn: loggedIn,
            createUser: createUser,
            register: register,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            updateUser: updateUser,
            deleteUser: deleteUser,
            login: login,
            logout: logout,
            findUserByUsername: findUserByUsername,
            findAllUsers: findAllUsers,
            addUserCourses: addUserCourses,
            deleteUserCourse: deleteUserCourse,
            addCurrentCourses: addCurrentCourses,
            deleteCurrentCourse: deleteCurrentCourse,
            rateStudent: rateStudent,
            findUserById1: findUserById1
        };

        return api;
        /*functions are implemented below*/

        function findUserById1(userId) {
            var url = "/api/user1/" + userId;
            return $http.get(url);
        }

 //   .rateStudent(StudentID, rating, faculty)

        function rateStudent(StudentID, rating1) {
            var url = "/api/rateStudent/" +StudentID;
            return $http.put(url, rating1);
        }


        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                      Developed by Srivatsav                                                      //
        ////////////////////////////////////////////////////////////////////////////////////////////////////

        //Decomissioned
        // function register(username,password, firstName, lastName, email, usertype) {
        //
        //
        //     var user= {
        //         username: username,
        //         password : password,
        //         firstName: firstName,
        //         lastName: lastName,
        //         email: email,
        //         usertype: usertype
        //     };
        //
        //     return $http.post("/api/register",user);
        //
        // }


        // Author : Sesha Sai Srivatsav
        // Returns all users in the system
        function findAllUsers() {
            var url = "/api/findallusers";
            return $http.get(url);
        }

        // Author : Sesha Sai Srivatsav
        // checks whether the user is loggedin
        function loggedIn() {
            return $http.get("/api/loggedIn");
        }

        // Author : Sesha Sai Srivatsav
        // logs out a user
        function logout() {
            return $http.post("/api/logout" );
        }

        // Author : Sesha Sai Srivatsav
        // logs in a user for given username and password
        function login(username, password) {
            const user = {
                username: username,
                password: password
            };
            return $http.post("/api/login", user);

        }

        // Author : Sesha Sai Srivatsav
        // findUserByCredentials finds a user for given username and password
        function findUserByCredentials(username, password){

            var url = "/api/user?username="+username+"&password="+password;
            return $http.get(url);
        }

        // Author : Sesha Sai Srivatsav
        // creates a user when user object is sent
        function createUser(user) {
            var url = "/api/user";
            return $http.post(url,user);

        }

        // Author : Sesha Sai Srivatsav
        // returns user object for given userId
        function findUserById(userId) {
            var url = "/api/user/" + userId;
            return $http.get(url);
        }

        // Author : Sesha Sai Srivatsav
        // reutrns userobject for given username
        function findUserByUsername(username){
            var url ="/api/user?username="+username;
            return $http.get(url);

        }



        // function updateUser(userId, user){
        //     var url="/api/user/"+userId;
        //     return $http.put(url, user);
        //
        //
        // }


        // Author : Sesha Sai Srivatsav
        // adds current courses for a user
        function addCurrentCourses(userId, user) {
            var url="/api/user/addcurrentcourse/"+userId;
            return $http.put(url, user);
        }



        // Author : Sesha Sai Srivatsav
        // deletes a current course for user
        function deleteCurrentCourse(userId, course){
            var coursename = {
                course: course
            };

            var url="/api/user/deletecurrentcourse/"+userId;
            return $http.put(url, coursename);
        }


        // Author : Sesha Sai Srivatsav
        // adds completed course for student and interested course for faculty
        function addUserCourses(userId, user) {
            var url="/api/user/addcourse/"+userId;
            return $http.put(url, user);
        }

        // Author : Sesha Sai Srivatsav
        // deletes a completed course for student and interested courses for faculty
        function deleteUserCourse(userId, course){
            var coursename = {
                course: course
            };
            
            var url="/api/user/deleteusercourse/"+userId;
            return $http.put(url, coursename);
        }

        // Author : Sesha Sai Srivatsav
        // deletes a user for given userId
        function deleteUser(userId){
            var url = "/api/user/"+userId;
            return $http.delete(url);

        }





        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                      Developed by Anvita                                                      //
        ////////////////////////////////////////////////////////////////////////////////////////////////////


        function register(username,password, firstName, lastName, email, usertype, gpa) {
            var user= {
                username: username,
                password : password,
                firstName: firstName,
                lastName: lastName,
                email: email,
                usertype: usertype
            };

            return $http.post("/api/register",user);

        }



        // Function written by Anvita - 11/27
        function updateUser(userId, user){
            var url="/api/user/"+userId;
            return $http.put(url, user);
        }


        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                      Developed by Manognya                                                      //
        ////////////////////////////////////////////////////////////////////////////////////////////////////

        
    }
})();
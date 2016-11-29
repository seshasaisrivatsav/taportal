/**
 * Created by seshasai on 11/16/2016.
 */
/**
 * Created by seshasai on 11/5/2016.
 */
(function(){
    angular
        .module("TaPortal")
        .factory("CoursesandSemestersService", CoursesandSemestersService);

    function CoursesandSemestersService($http) {
        /* provide an API that allows access to this thing */
        var api = {
            createCourse: createCourse,
            deleteCourse: deleteCourse,
            findAllCourses: findAllCourses,
            updateCourse:updateCourse ,
            findAllSemesters: findAllSemesters,
            updateSemester: updateSemester,
            deleteSemester: deleteSemester,
            createSemester: createSemester
        };


        return api;
        /*functions are implemented below*/


        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                      Developed by Srivatsav                                                      //
        ////////////////////////////////////////////////////////////////////////////////////////////////////

        // The below functions perform CRUD Operations on Courses and Semesters
        // Author: Sesha Sai Srivatsav
        function createCourse(course) {
            var url = "/api/course";
            return $http.post(url, course);
        }

        // Author: Sesha Sai Srivatsav
        function findAllCourses() {
            var url = "/api/findAllCourses";
            return $http.get(url);
        }

        // Author: Sesha Sai Srivatsav
        function updateCourse(courseId, course) {
            var url = "/api/course/" + courseId;
            return $http.put(url, course);
        }

        // Author: Sesha Sai Srivatsav
        function deleteCourse(courseId) {
            var url = "/api/course/" + courseId;
            return $http.delete(url);
        }


        // Author: Sesha Sai Srivatsav
        function findAllSemesters() {
            var url = "/api/findAllSemesters";
            return $http.get(url);
        }

        // Author: Sesha Sai Srivatsav
        function createSemester(semester) {
            var url = "/api/semester";
            return $http.post(url,semester);
        }

        // Author: Sesha Sai Srivatsav
        function updateSemester(semesterId, semester) {
            var url = "/api/semester/" + semesterId;
            return $http.put(url, semester);
        }

        // Author: Sesha Sai Srivatsav
        function deleteSemester(semesterId) {
            var url = "/api/semester/" + semesterId;
            return $http.delete(url);
        }



        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                      Developed by Anvita                                                      //
        ////////////////////////////////////////////////////////////////////////////////////////////////////



        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                      Developed by Manognya                                                      //
        ////////////////////////////////////////////////////////////////////////////////////////////////////


    }
})();
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
            createSemester: createSemester,
            findAllCourses: findAllCourses,
            findAllSemesters: findAllSemesters,
            updateCourse:updateCourse ,
            updateSemester: updateSemester,
            deleteCourse: deleteCourse,
            deleteSemester: deleteSemester


        };

        return api;
        /*functions are implemented below*/

        function createCourse(course) {
            var url = "/api/course";
            return $http.post(url, course);
        }

        function findAllCourses() {
            var url = "/api/findAllCourses";
            return $http.get(url);
        }


        function updateCourse(courseId, course) {
            var url = "/api/course/" + courseId;
            return $http.put(url, course);
        }

        function deleteCourse(courseId) {
            var url = "/api/course/" + courseId;
            return $http.delete(url);
        }



        function findAllSemesters() {
            var url = "/api/findAllSemesters";
            return $http.get(url);
        }


        function createSemester(semester) {
            var url = "/api/semester";
            return $http.post(url,semester);
        }


        function updateSemester() {

        }


        function deleteSemester() {

        }





    }
})();
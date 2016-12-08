/**
 * Created by manog on 27-11-2016.
 */

(function(){
    angular
        .module("TaPortal")
        .factory("applicationsService", applicationsService);

    function applicationsService($http) {
        var api = {
            createApplication: createApplication,
            deleteApplication: deleteApplication,
            updateApplication:updateApplication ,
            findApplicationById:findApplicationById,
            findApplicationForUser:findApplicationForUser,
            getApplicationsForPosition: getApplicationsForPosition,
            GiveDecisionforApp: GiveDecisionforApp
        };


        return api;

        //am

        function GiveDecisionforApp(appId, decision) {
            var url = "/api/GiveDecisionforApp/" +appId+ "/decision/" +decision;
            return $http.put(url);
        }


        // Author : Anvita
        function getApplicationsForPosition(posId) {
            var url = "/api/ApplicationForPosition/" +posId;
            return $http.get(url);
        }
        // end anvita

        // Author : Srivatsav
        // Packing things related to application
        function createApplication(application,uid,posId,avgRating, gpa, coursesTaken, currentCourses, email, phone, resumeName, resumeUrl) {
            var url = "/api/user/"+uid+"/application";
            application._user=uid;
            application._position=posId;
            application.avgRating = avgRating;
            application.gpa = gpa;
            application.coursesTaken = coursesTaken;
            application.currentCourses = currentCourses;
            application.email = email;
            application.phone = phone;
            application.resumeName = resumeName;
            application.resumeURL = resumeUrl;

            return $http.post(url, application);
        }


        function findApplicationForUser(uid){
            var url = "/api/user/"+uid+"/application";
            return $http.get(url);
        }

        function findApplicationById(aid){
            var url ="/api/application/"+aid;

            return $http.get(url);

        }

        function updateApplication(applicationId, application) {
            var url ="/api/application/"+applicationId;
            return $http.put(url,application);
        }

        function deleteApplication(aid) {
            var url = "/api/application/"+aid;
            return $http.delete(url);
        }


    }
})();
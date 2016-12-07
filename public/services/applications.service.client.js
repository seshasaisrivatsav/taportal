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
            getApplicationsForPosition: getApplicationsForPosition
        };


        return api;

         // anvita

        function getApplicationsForPosition(posId) {
            var url = "/api/ApplicationForPosition/" +posId;
            return $http.get(url);
        }
        // end anvita

        function createApplication(application,uid,posId) {
            var url = "/api/user/"+uid+"/application";
            application._user=uid;
            application._position=posId;
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

        function updateApplication(application) {
            // console.log("in client");
            var url ="/api/application/"+application._id;
             
            return $http.put(url,application);
        }

        function deleteApplication(aid) {
            var url = "/api/application/"+aid;
            return $http.delete(url);
        }


    }
})();
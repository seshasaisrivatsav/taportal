/**
 * Created by seshasai on 11/17/2016.
 */
/**
 * Created by seshasai on 11/5/2016.
 */
(function(){
    angular
        .module("TaPortal")
        .factory("PositionService", PositionService);

    function PositionService($http) {
        /* provide an API that allows access to this thing */
        var api = {
            createPosition : createPosition,
            findPositionById:findPositionById,
            updatePosition:updatePosition,
            findAllPositions: findAllPositions,
            deletePosition: deletePosition,
            updateDeadline: updateDeadline,
            findPositionIDByTitle:findPositionIDByTitle
        };

        return api;
        /*functions are implemented below*/


        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                      Developed by Srivatsav                                                      //
        ////////////////////////////////////////////////////////////////////////////////////////////////////

        // The below functions perform CRUD Operations of position

        // Author: Sesha Sai Srivatsav
        function createPosition(position) {
            var url = "/api/position";
            return $http.post(url, position);
        }

        // Author: Sesha Sai Srivatsav
        function findPositionById(positionId) {
            var url = "/api/position/" + positionId;
            return $http.get(url);
        }
        // Author: Sesha Sai Srivatsav
        function updatePosition(positionId, position) {
            var url="/api/position/"+positionId;
            return $http.put(url, position);
        }
        // Author: Sesha Sai Srivatsav
        function updateDeadline(position) {
            var url = "/api/position/semestername" ;
            return $http.put(url, position);
        }
        // Author: Sesha Sai Srivatsav
        function findAllPositions() {
            var url = "/api/findallpositions";
            return $http.get(url);
        }
        // Author: Sesha Sai Srivatsav
        function deletePosition(positionId) {
            var url = "/api/position/"+positionId;
            return $http.delete(url);
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                      Developed by Anvita                                                      //
        ////////////////////////////////////////////////////////////////////////////////////////////////////


        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                      Developed by Manognya                                                      //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //Author: Manognya Koduganti
        function findPositionIDByTitle(positiontitle) {
            var url = "/api/application/" + positiontitle;
            return $http.get(url);
        }


    }
})();
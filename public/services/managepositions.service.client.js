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
            updateDeadline: updateDeadline
        };

        return api;
        /*functions are implemented below*/

        function createPosition(position) {
            var url = "/api/position";
            return $http.post(url, position);
        }

        function findPositionById(positionId) {
            var url = "/api/position/" + positionId;
            return $http.get(url);
        }

        function updatePosition(positionId, position) {
            var url="/api/position/"+positionId;
            return $http.put(url, position);
        }

        function updateDeadline(semestername, deadline) {
            var url = "/api/position" + semestername;
            return $http.put(url,deadline);
        }

        function findAllPositions() {
            var url = "/api/findallpositions";
            return $http.get(url);
        }

        function deletePosition(positionId) {
            var url = "/api/position/"+positionId;
            return $http.delete(url);
        }

        

    }
})();
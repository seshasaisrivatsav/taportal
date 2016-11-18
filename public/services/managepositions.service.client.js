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
            updatePosition:updatePosition,
            findAllPositions: findAllPositions,
            deletePosition: deletePosition
        };

        return api;
        /*functions are implemented below*/

        function createPosition(position) {
            var url = "/api/position";
            return $http.post(url, position);
        }


        function updatePosition(positionId, position) {
            var url = "/api/position/" + positionId;
            return $http.put(url, position);
        }

        function findAllPositions() {
            var url = "/api/findAllPositions";
            return $http.get(url);
        }

        function deletePosition(positionId) {
            var url = "/api/position/" + positionId;
            return $http.delete(url);
        }



    }
})();
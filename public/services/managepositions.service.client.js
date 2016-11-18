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
            deletePosition: deletePosition
        };

        return api;
        /*functions are implemented below*/

        function createPosition() {

        }

        function findPositionById() {

        }

        function updatePosition() {

        }

        function findAllPositions() {

        }

        function deletePosition() {

        }

        

    }
})();
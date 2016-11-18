/**
 * Created by seshasai on 11/17/2016.
 */



module.exports = function () {

    var mongoose = require ("mongoose");
    var PositionSchema = require("./position.schema.server")();
    var Position =  mongoose.model("Position", PositionSchema);



    var api = {
        createPosition: createPosition,
        findAllPositions: findAllPositions,
        updatePosition: updatePosition,
        deletePosition: deletePosition,
        findPositionById: findPositionById
    };

    return api;

    function updatePosition(positionId, position) {
        delete position._id;
        return Position
            .update({_id: positionId},{
                $set: {course: position.coursename, 
                        semester: position.semestername,
                        number: position.number,
                        professor: position.professorname,
                        deadline : position.deadline}}
            );
    }

    function findAllPositions(){
        return Position.find();
    }

    function createPosition(position) {
        return  Position.create(position);
    }

    function deletePosition(positionId) {
        return Position.remove({_id: positionId});
    }

    function findPositionById(positionId) {
        return Position.findById({_id: positionId});
    }





};
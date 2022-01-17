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
        updateDeadline: updateDeadline,
        deletePosition: deletePosition,
        findPositionById: findPositionById,
        findPositionIDByTitle:findPositionIDByTitle,
        findPositionByName: findPositionByName
    };

    return api;

    function findPositionByName(Name) {
        // return Course.findById({_id: courseId});
        return Position.findOne({course: Name});
    }

    // Given a new position metadata, this function updates it
    function updatePosition(positionId, position) {
        delete position._id;
        return Position
            .update({_id: positionId},{
                $set: {course: position.course,
                        semester: position.semester,
                        number: position.number,
                        professor: position.professor,
                        deadline : position.deadline}}
            );
    }

    // This function updates deadline for a TA Position
    function updateDeadline(semester, deadline) {
        return Position
            .update({semester : semester},{
                $set : {deadline : deadline}
            });

    }

    // Returns all positions in the System
    function findAllPositions(){
        return Position.find();
    }

    // Creates new Position
    function createPosition(position) {
        console.log(position);
        return  Position.create(position);
    }

    // Deletes a position for a given Position ID
    function deletePosition(positionId) {
        return Position.remove({_id: positionId});
    }

    // Given a positionId, this creates a position
    function findPositionById(positionId) {
        return Position.findById({_id: positionId});
    }

    function findPositionIDByTitle(title) {
        return Position.find({course: title});

    }

};
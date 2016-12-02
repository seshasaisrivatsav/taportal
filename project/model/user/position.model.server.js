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
        findPositionById: findPositionById
    };

    return api;

    ////////////////////////////////////////////////////////////////////////////////////////////////////

    //                      Developed by Anvita                                                     //
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    function findPositionByName(Name) {
        // return Course.findById({_id: courseId});
        return Position.findOne({course: Name});
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////

    //                      Developed by Srivatsav                                                      //
    ////////////////////////////////////////////////////////////////////////////////////////////////////


    // Given a new position metadata, this function updates it
    // Author: Sesha Sai Srivatsav
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
    // Author: Sesha Sai Srivatsav
    function updateDeadline(semester, deadline) {
        return Position
            .update({semester : semester},{
                $set : {deadline : deadline}
            });

    }

    // Returns all positions in the System
    // Author: Sesha Sai Srivatsav
    function findAllPositions(){
        return Position.find();
    }

    // Creates new Position
    // Author: Sesha Sai Srivatsav
    function createPosition(position) {
        console.log(position);
        return  Position.create(position);
    }

    // Deletes a position for a given Position ID
    // Author: Sesha Sai Srivatsav
    function deletePosition(positionId) {
        return Position.remove({_id: positionId});
    }

    // Given a positionId, this creates a position
    // Author: Sesha Sai Srivatsav
    function findPositionById(positionId) {
        return Position.findById({_id: positionId});
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////
    //                      Developed by Anvita                                                      //
    ////////////////////////////////////////////////////////////////////////////////////////////////////



    ////////////////////////////////////////////////////////////////////////////////////////////////////
    //                      Developed by Manognya                                                      //
    ////////////////////////////////////////////////////////////////////////////////////////////////////


};
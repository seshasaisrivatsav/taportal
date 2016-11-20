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

    function updateDeadline(semester, deadline) {

    
        
        return Position
            .update({semester : semester},{
                $set : {deadline : deadline}
            });

    }


    function findAllPositions(){
        return Position.find();
    }

    function createPosition(position) {
        console.log(position);
        return  Position.create(position);
    }

    function deletePosition(positionId) {
        return Position.remove({_id: positionId});
    }

    function findPositionById(positionId) {
        return Position.findById({_id: positionId});
    }

    
};
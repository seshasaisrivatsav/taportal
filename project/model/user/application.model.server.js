module.exports = function () {

    var mongoose = require("mongoose");
    var ApplicationSchema = require("./application.schema.server")();
    var Application = mongoose.model("Application", ApplicationSchema);

    var api = {
        createApplication: createApplication,
        //findApplicationsForCourse: findApplicationsForCourse,
        updateApplication: updateApplication,
        deleteApplication: deleteApplication,
        findApplicationForUser: findApplicationForUser,
        findApplicationById: findApplicationById,
        findApplicationsForPosition: findApplicationsForPosition,
        GiveDecisionforApp:GiveDecisionforApp
    };

    return api;


    function GiveDecisionforApp(appId, decision) {
        return Application
            .update({_id: appId},{
                $set: { status: decision
                }}
            );
    }

    function createApplication(application) {
        return  Application.create(application);
    }

    function findApplicationForUser(userId) {
        return Application.find({_user: userId});
    }

    function updateApplication(applicationId,application) {
        delete application._id;
        return Application
            .update({_id: applicationId},{
                $set: {
                    priority : application.priority,
                    previouslyTaken : application.previouslyTaken,
                    gradeObtained : application.gradeObtained,
                    beenTASemester : application.beenTASemester ,
                    availability : application.availability,
                    remarks : application.remarks
                    }}
            );
    }
    
    function deleteApplication(applicationId) {
        return Application.remove({_id: applicationId});
    }

    function findApplicationById(applicationId) {
        return Application.findById({_id: applicationId});
    }

    function findApplicationsForPosition(PosId) {
        return Application.find({_position: PosId});
    }
    // anvita end
  /*  function findApplicationsForCourse(coursename) {
        return Application.findById({_position.course.: coursename});
    }*/
};

/**
 * Created by seshasai on 11/17/2016.
 */


module.exports = function () {

    var mongoose = require ("mongoose");
    var SemesterSchema = require("./semester.schema.server")();
    var Semester =  mongoose.model("Semester", SemesterSchema);



    var api = {
        createSemester: createSemester,
        findSemesterBySemestername: findSemesterBySemestername,
        findAllSemesters: findAllSemesters,
        updateSemester: updateSemester,
        deleteSemester: deleteSemester,
        findSemesterById: findSemesterById,
        findSemesterByName: findSemesterByName
    };

    return api;

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    //                      Developed by Srivatsav                                                      //
    ////////////////////////////////////////////////////////////////////////////////////////////////////


    ////////////////////////////////////////////////////////////////////////////////////////////////////
    //                      Description: The below functions provide CRUD operations on semester     //
    //                                                                                              //
    ////////////////////////////////////////////////////////////////////////////////////////////////////


    // Author: Sesha Sai Srivatsav
    function updateSemester(semesterId, semester) {
        delete semester._id;
        return Semester
            .update({_id: semesterId},{
                $set: {semestername : semester.semestername}}
            );
    }

    // Author: Sesha Sai Srivatsav
    function findAllSemesters(){
        return Semester.find();
    }

    // Author: Sesha Sai Srivatsav
    function createSemester(semester) {
        return  Semester.create(semester);
    }

    // Author: Sesha Sai Srivatsav
    function deleteSemester(semesterId) {
        return Semester.remove({_id: semesterId});
    }

    // Author: Sesha Sai Srivatsav
    function findSemesterById(semesterId) {
        return Semester.findById({_id: semesterId});
    }
    
    // Author: Sesha Sai Srivatsav
    function findSemesterBySemestername(semestername) {
        return Semester.findOne({semestername: semestername});
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    //                      Developed by Anvita                                                      //
    ////////////////////////////////////////////////////////////////////////////////////////////////////


    function findSemesterByName(SemisterName) {
       // return Course.findById({_id: courseId});
        return Semester.findOne({semestername: SemisterName});
     }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    //                      Developed by Manognya                                                      //
    ////////////////////////////////////////////////////////////////////////////////////////////////////


};
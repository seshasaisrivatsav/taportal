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
        findSemesterById: findSemesterById
    };

    return api;

    function updateSemester(semesterId, semester) {
        delete semester._id;
        return Semester
            .update({_id: semesterId},{
                $set: {semestername : semester.semestername}}
            );
    }

    function findAllSemesters(){
        return Semester.find();
    }

    function createSemester(semester) {
        return  Semester.create(semester);
    }

    function deleteSemester(semesterId) {
        return Semester.remove({_id: semesterId});
    }

    function findSemesterById(semesterId) {
        return Semester.findById({_id: semesterId});
    }

    function findSemesterBySemestername(semestername) {
        return Semester.findOne({semestername: semestername});
    }




};
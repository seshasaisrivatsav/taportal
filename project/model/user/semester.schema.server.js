/**
 * Created by seshasai on 11/5/2016.
 */



module.exports = function () {
    var mongoose = require("mongoose");

    var SemesterSchema = mongoose.Schema({

<<<<<<< HEAD
        semestername: String
 
=======

        semester: [{
            semester: String
        }]
>>>>>>> 2773ecc4b8401a6fb8f3fc711720ec3ce41f96d9



    }, {collections: 'taportal.semester'});
    return SemesterSchema;
};
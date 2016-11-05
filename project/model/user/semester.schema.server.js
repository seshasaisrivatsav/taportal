/**
 * Created by seshasai on 11/5/2016.
 */



module.exports = function () {
    var mongoose = require("mongoose");

    var SemesterSchema = mongoose.Schema({


        semester: [{
            semester: String
        }]



    }, {collections: 'taportal.semester'});
    return SemesterSchema;
};
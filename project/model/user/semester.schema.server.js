/**
 * Authored by seshasai on 11/5/2016.
 */
module.exports = function () {
    var mongoose = require("mongoose");

    var SemesterSchema = mongoose.Schema({
        semestername: String

    }, {collection: 'taportal.semester'});
    return SemesterSchema;
};
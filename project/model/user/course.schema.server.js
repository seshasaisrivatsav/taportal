/**
 * Authored by seshasai on 11/5/2016.
 */


module.exports = function () {
    var mongoose = require("mongoose");
    var CourseSchema = mongoose.Schema({
        coursename: String
    }, {collection: 'taportal.course'});
    return CourseSchema;
};
/**
 * Authored by seshasai on 11/5/2016.
 */

module.exports = function () {
    var mongoose = require("mongoose");

    var ApplicationSchema = mongoose.Schema({
        _position:{type : mongoose.Schema.ObjectId, ref: "Position"},
        _user : {type : mongoose.Schema.ObjectId, ref: "User"},
        priority : String,
        previouslyTaken : String,
        gradeObtained : {type : String,  enum: ['A', 'A-', 'B', 'B-', 'lower']},
        beenTASemester : String ,
        availability : {type : String,  enum: ['Fully Available', 'Looking for Co-ops']}, // Enum
        remarks : String,
        status :{type : String,  enum: ['Accepted', 'Rejected', 'In Progress']},// Enum Accepted Rejected
        avgRating : String,
        gpa : String, 
        coursesTaken: [String],
        currentCourses : [String],
        email : String,
        phone : String,
        resumeURL: String,
        resumeName: String


}, {collection: 'taportal.application'});
    return ApplicationSchema;
};
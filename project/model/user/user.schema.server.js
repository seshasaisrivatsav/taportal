/**
 * Authored by Seshasai on 11/3/2016.
 */
module.exports = function () {
    let mongoose = require("mongoose");

    let UserSchema = mongoose.Schema ({
        //Common fields for all the users
        username: String, // Username
        password: String, //Password
        firstName: String, //First Name
        lastName: String, // LastName
        email: String, // Email of the student
        usertype: {type : String,  enum: ['student', 'faculty', 'admin']}, // type: student, faculty, admin
        image: String, // Image of the user
        aboutMyself: String, // Few lines about the user
        resumeURL: String,
        resumeName: String,
        nuid : Number,
        phone : String,
        gpa : String,
        coursesTaken: [String],
        currentCourses :[String],
        rating :[
            {
                _user : {type : mongoose.Schema.ObjectId, ref: "User"}, //in model
                ratedBy: String,
                rating: Number
            }
        ],
        avgRating: Number,
        feedBack : [
            {
                _user : {type : mongoose.Schema.ObjectId, ref: "User"}, //in model
                givenBy: String,
                feedback: String
            }
        ],
        myCourses:[
            {
                courseName: String //Consists of Course ID + Course Name
            }
        ]
    }, {collection: 'taportal.user'});
    return UserSchema;
};

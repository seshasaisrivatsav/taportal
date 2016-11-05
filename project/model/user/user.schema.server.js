/**
 * Created by seshasai on 11/3/2016.
 */
//we create a schema

module.exports = function () {
    // mongoDb has no notion of schemas. this is at the application level
    var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema ({

        //Common fields for all the users
        username: String, // Username
        password: String, //Password
        firstName: String, //First Name
        lastName: String, // LastName
        email: String, // Email of the student
        usertype: String, // type: student, faculty, admin
        image: String, // Image of the user
        aboutMyself: String, // Few lines about the user

        // Fields specific for Students
        resume: {
            url: String, //Place where the Resume is stored
            resume : file
        } ,
        // Relevant documents that are attached by a student
        documents: [
            {
                name: String,
                file: file
            }
        ],
        //NUID of the student 
        nuid : Number,
        phone : String,
        gpa : Number,
        coursesTaken: [
            {
                name: String
            }
        ],
        currentCourses :[
            {
                name: String
            }
        ],

        rating :[
            {
                _user : {type : mongoose.Schema.ObjectId, ref: "User"}, //in model
                ratedBy: String,
                rating: Number
            }
        ],

        feedBack : [
            {
                _user : {type : mongoose.Schema.ObjectId, ref: "User"}, //in model
                givenBy: String,
                feedback: String
            }
        ],

        //Fields related to the Faculty
        myCourses:[
            {
                courseName: String //Consists of Course ID + Course Name

            }
        ]

    }, {collection: 'taportal.user'});
    return UserSchema;
};

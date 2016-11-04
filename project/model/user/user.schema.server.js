/**
 * Created by seshasai on 11/3/2016.
 */
//we create a schema

module.exports = function () {
    // mongoDb has no notion of schemas. this is at the application level
    var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema ({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        usertype: String, // type: student, faculty, admin
        image: String,
        aboutMyself: String,

        // Students
        resume: {
            url: String,
            resume : file
        } ,

        documents: [
            {
                name: String,
                file: file
            }
        ],
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
                ratedBy: String,
                rating: Number
            }
        ],

        feedBack : [
            {
                givenBy: String,
                feedback: String
            }
        ],

        //Faculty
        myCourses:[
            {
                courseName: String //Consists of Course ID + Course Name

            }
        ]

    }, {collection: 'taportal.user'});
    return UserSchema;
};

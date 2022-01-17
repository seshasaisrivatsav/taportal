/**
 * Created by seshasai on 11/5/2016.
 */

module.exports = function () {
    var mongoose = require ("mongoose");
    var UserSchema = require("./user.schema.server")();
    var User =  mongoose.model("User", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        deleteUser: deleteUser,
        updateUser: updateUser,
        findUserByUsername: findUserByUsername,
        findAllUsers: findAllUsers,
        addUserCourses: addUserCourses,
        deleteUserCourse: deleteUserCourse,
        addCurrentCourses: addCurrentCourses,
        deleteCurrentCourse: deleteCurrentCourse,
        updateResumeOfStudent: updateResumeOfStudent,
        rateStudentByFaculty: rateStudentByFaculty,
        UpdateAverageRating: UpdateAverageRating
    };
    return api;

    
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    //                      Developed by Srivatsav                                                      //
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    // Returns all users in system
    function findAllUsers() {
        return User.find();
    }

    // Returns user for specified userId
    function findUserById(userId) {
        return User.findById({_id: userId});
    }

    // Returns User for specified username
    function findUserByUsername(username) {
        return User.findOne({username: username});
    }

    // Adds course for user
    // In case of faculty it adds the courses faculty is teaching or is interested
    // In case of student, it adds completed courses for student
    function addUserCourses(userId, user) {
        return User
            .update({_id: userId},{
                $push: {coursesTaken: user.coursename}
            });

    }

    // Current courses addition
    // In case of student, it adds current courses for student
    function addCurrentCourses(userId, user) {
        return User
            .update({_id: userId},{
                $push: {currentCourses: user.ccoursename}
            });

    }
    
    // deletes completed courses for student
    // delete interested courses for faculty
    function deleteUserCourse(userId, courseName) {
        return User
            .update({_id: userId},{
                $pull:{coursesTaken: courseName.course}
            });
    }
    
    
    // delete current course
    // deletes current courses for student

    function deleteCurrentCourse(userId, coursename) {
        return User
            .update({_id: userId},{
                $pull:{coursesTaken: coursename.course}
            });
    }
    

    // Decomissioned on 11/26
    // function updateUser(userId, user) {
    //     delete user._id;
    //     return User
    //         .update({_id: userId},{
    //             $set: {firstName : user.firstName,
    //                 lastName : user.lastName,
    //                 email: user.email,
    //                 usertype : user.usertype,
    //                 phone: user.phone,
    //                 aboutMyself: user.aboutMyself}}
    //         );
    // }

    // Updates the user
    // the below fields are updated because of this function
    function updateUser(userId, user) {
        delete user._id;
        return User
            .update({_id: userId},{
                $set: {username: user.username,
                    firstName : user.firstName,
                    lastName : user.lastName,
                    email: user.email,
                    usertype : user.usertype,
                    phone: user.phone,
                    // currentCourses: user.currentCourses, // to fix a bug - by srivatsav
                    // coursesTaken: user.coursesTaken, // to fix a bug - by srivatsav
                    gpa: user.gpa,
                    aboutMyself: user.aboutMyself

                }}
            );
    }

    // deletes a user for given userId
    function deleteUser(userId) {
            return User.remove({_id: userId});
    }

    // returns the user whose username and password match
    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }

    // Creates a new user Object
    function createUser(user){
        return  User.create(user);
    }

    function updateResumeOfStudent(userId, resume) {
        // delete user._id;
        return User
            .update({_id: userId},{
                $set: {resumeURL : resume.url,
                    resumeName: resume.resume}}
            );
    }

    function rateStudentByFaculty(stuId, ratingFull) {
        return User
            .update({_id: stuId},{
                "$set": { "rating": ratingFull
                }}
            );
    }

    function UpdateAverageRating(stuId, ratingavg) {
        return User
            .update({_id: stuId},{
                "$set": { "avgRating": ratingavg}}
            );
    }
};
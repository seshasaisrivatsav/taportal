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
        updateResumeOfStudent: updateResumeOfStudent


    };
    return api;



    ////////////////////////////////////////////////////////////////////////////////////////////////////
    //                      Developed by Srivatsav                                                      //
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    // Returns all users in system
    // Author: Sesha Sai Srivatsav
    function findAllUsers() {
        return User.find();
    }

    // Returns user for specified userId
    // Author: Sesha Sai Srivatsav
    function findUserById(userId) {
        return User.findById({_id: userId});
    }

    // Returns User for specified username
    // Author: Sesha Sai Srivatsav
    function findUserByUsername(username) {
        return User.findOne({username: username});
    }

    // Adds course for user
    // In case of faculty it adds the courses faculty is teaching or is interested
    // In case of student, it adds completed courses for student
    // Author: Sesha Sai Srivatsav
    function addUserCourses(userId, user) {
        return User
            .update({_id: userId},{
                $push: {coursesTaken: user.coursename}
            });

    }

    // Current courses addition
    // In case of student, it adds current courses for student
    // Author: Sesha Sai Srivatsav
    function addCurrentCourses(userId, user) {
        return User
            .update({_id: userId},{
                $push: {currentCourses: user.ccoursename}
            });

    }
    
    // deletes completed courses for student
    // delete interested courses for faculty
    // Author: Sesha Sai Srivatsav
    function deleteUserCourse(userId, coursename) {
        return User
            .update({_id: userId},{
                $pull:{coursesTaken: coursename.course}
            });
    }
    
    
    // delete current course
    // deletes current courses for student
    // Author: Sesha Sai Srivatsav
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
    // Author: Sesha Sai Srivatsav
    function updateUser(userId, user) {
        // delete user._id;
        return User
            .update({_id: userId},{
                $set: {username: user.username,
                    firstName : user.firstName,
                    lastName : user.lastName,
                    email: user.email,
                    usertype : user.usertype,
                    currentCourses: user.currentCourses,
                    coursesTaken: user.coursesTaken,
                    gpa: parseInt(user.gpa),
                    aboutMyself: user.aboutMyself

                }}
            );
    }

    // deletes a user for given userId
    // Author: Sesha Sai Srivatsav
    function deleteUser(userId) {
            return User.remove({_id: userId});
    }

    // returns the user whose username and password match
    // Author: Sesha Sai Srivatsav
    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }

    // Creates a new user Object
    // Author: Sesha Sai Srivatsav
    function createUser(user){
        return  User.create(user);
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////
    //                      Developed by Anvita                                                      //
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    function updateResumeOfStudent(userId, resume) {
        // delete user._id;
        return User
            .update({_id: userId},{
                $set: {resumeURL : resume.url,
                    resumeName: resume.resume}}
            );
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////
    //                      Developed by Manognya                                                      //
    ////////////////////////////////////////////////////////////////////////////////////////////////////


};
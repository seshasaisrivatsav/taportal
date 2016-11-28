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
    //findByID returns just one

    function findAllUsers() {
        return User.find();
    }


    function findUserById(userId) {
        return User.findById({_id: userId});
    }

    function findUserByUsername(username) {
        return User.findOne({username: username});
    }

    // Completed courses addition
    function addUserCourses(userId, user) {
        return User
            .update({_id: userId},{
                $push: {coursesTaken: user.coursename}
            });

    }

    // Current courses addition
    function addCurrentCourses(userId, user) {
        return User
            .update({_id: userId},{
                $push: {currentCourses: user.ccoursename}
            });

    }
    
    // delete completed courses
    function deleteUserCourse(userId, coursename) {

        return User
            .update({_id: userId},{
                $pull:{coursesTaken: coursename.course}
            });
    }
    
    
    // delete current course
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

    function updateResumeOfStudent(userId, resume) {
        // delete user._id;
       return User
            .update({_id: userId},{
                $set: {resumeURL : resume.url,
                    resumeName: resume.resume}}
            );
    }



  

    function deleteUser(userId) {
            return User.remove({_id: userId});
    }

    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }

    function createUser(user){
        return  User.create(user);
    }

};
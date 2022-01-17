/**
 * Created by seshasai on 11/16/2016.
 */

module.exports = function () {

    var mongoose = require ("mongoose");
    var CourseSchema = require("./course.schema.server")();
    var Course =  mongoose.model("Course", CourseSchema);

    var api = {
        createCourse: createCourse,
        findCourseByCoursename: findCourseByCoursename,
        findAllCourses: findAllCourses,
        updateCourse: updateCourse,
        deleteCourse: deleteCourse,
        findCourseById: findCourseById,
        findCourseByName: findCourseByName
   };

    return api;


    ////////////////////////////////////////////////////////////////////////////////////////////////////
    //                      Developed by Srivatsav                                                      //
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    //                      Description: The below functions provide CRUD operations on Course     //
    //                                                                                              //
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    function updateCourse(courseId, course) {
        delete course._id;
        return Course
            .update({_id: courseId},{
                $set: {coursename : course.coursename}}
            );
    }

    function findAllCourses(){
        return Course.find();
    }

    function createCourse(course) {
        
        return  Course.create(course);
    }
    
    function deleteCourse(courseId) {
        return Course.remove({_id: courseId});
    }

    function findCourseById(courseId) {
        return Course.findById({_id: courseId});
    }

    function findCourseByCoursename(coursename) {
        return Course.findOne({coursename: coursename});
    }
    function findCourseByName(courseName) {
      // return Course.findById({_id: courseId});
          return Course.findOne({coursename: courseName});
        }



};
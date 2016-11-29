/**
 * Created by seshasai on 11/16/2016.
 */
module.exports= function(app, models){

    var courseModel = models.courseModel;
    var semesterModel = models.semesterModel;

    app.post("/api/course", createCourse);
    app.get("/api/course/:courseId", findCourseById);
    app.delete("/api/course/:courseId", deleteCourse);
    app.put("/api/course/:courseId", updateCourse);
    app.get("/api/findallcourses", findallcourses);

    
    app.post("/api/semester", createSemester);
    app.get("/api/semester/:semesterId", findSemesterById);
    app.delete("/api/semester/:semesterId", deleteSemester);
    app.put("/api/semester/:semesterId", updateSemester);
    app.get("/api/findallsemesters", findallsemesters);


    ////////////////////////////////////////////////////////////////////////////////////////////////////
    //                      Developed by Srivatsav                                                      //
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    // Author: Sesha Sai Srivatsav
    // Description: Given courseId, the method returns the course
    // function: findCourseById
    function findCourseById(req, res) {
        var id = req.params.courseId;
        
        courseModel
            .findCourseById(id)
            .then(function (course) {
                res.send(course);
            }, function (error) {
                res.statusCode(404).send(error);
            });
    }

    // Author: Sesha Sai Srivatsav
    // Description:  Updates the course with new metadata
    // function: updateCourse
    function updateCourse(req, res) {
        var id = req.params.courseId;
        var course = req.body;
        courseModel
            .updateCourse(id, course)
            .then(
                function (stats) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(404);
                }
            );
    }

    // Author: Sesha Sai Srivatsav
    // Description: Deletes a given course for a given course ID
    // function: deleteCourse
    function deleteCourse(req,res) {
        var courseId = req.params.courseId;
        courseModel
            .deleteCourse(courseId)
            //responds with some stats
            .then(function (stats) {
                res.sendStatus(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                });
    }

    // Author: Sesha Sai Srivatsav
    // Description: Returns all courses in the system
    // function: findallcourses
    function findallcourses(req,res) {
       courseModel
            .findAllCourses()
            .then(
                function (courses) {
                    res.json(courses);
                },
                function (error) {
                    res.sendStatus(404);
                }
            );
    }


    // Author: Sesha Sai Srivatsav
    // Description:  Creaates a new course
    // function: createCourse
    function createCourse(req, res) {
        var course = req.body;
        courseModel
            .findCourseByCoursename(course.coursename)
            .then(
                function (course) {
                    if (course){
                        res.send("Course already exists");
                        return;
                    }else{
                        return courseModel
                            .createCourse(req.body)
                    }
                }, function (err) {
                    res.sendStatus(400).send(err);
                }
            )
            .then(
            function (course) {
                if(course){
                    res.sendStatus(200);
                }
            },
            function (err) {
                res.sendStatus(400).send(err);
            }
        );
    }

    /* for future use if required */


 


    /* Semester Functions */
    // Author: Sesha Sai Srivatsav
    // Description:  Given semesterId, this creates a new semester
    // function: findSemesterById
    function findSemesterById(req, res) {
        var id = req.params.semesterId;

        semesterModel
            .findSemesterById(id)
            .then(function (semester) {
                res.send(semester);
            }, function (error) {
                res.statusCode(404).send(error);
            });
    }
    
    
    // Author: Sesha Sai Srivatsav
    // Description: Updates the semester for a given semesterId
    // function:  updateSemester
    function updateSemester(req, res) {
        var id = req.params.semesterId;
        var semester = req.body;


        semesterModel
            .updateSemester(id, semester)
            .then(
                function (stats) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(404);
                }
            );
    }

    // Author: Sesha Sai Srivatsav
    // Description: Deletes a semester for a given semesterID
    // function: deleteSemester
    function deleteSemester(req,res) {

        var semesterId = req.params.semesterId;

        semesterModel
            .deleteSemester(semesterId)

            .then(function (stats) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                });
    }

    // Author: Sesha Sai Srivatsav
    // Description: Returns all semesters in the system
    // function: findallsemesters
    function findallsemesters(req,res) {
        semesterModel
            .findAllSemesters()
            .then(
                function (semesters) {
                    res.json(semesters);
                },
                function (error) {
                    res.sendStatus(404);
                }
            );
    }


    // Author: Sesha Sai Srivatsav
    // Description:  Creates a new semester
    // function: createSemester
    function createSemester(req, res) {

        var semester = req.body;
        console.log(semester);
        semesterModel
            .findSemesterBySemestername(semester.semestername)
            .then(
                function (semester) {
                    if (semester){
                        res.send("semester already exists");
                        return;
                    }else{
                        return semesterModel
                            .createSemester(req.body)
                    }
                }, function (err) {
                    res.sendStatus(400).send(err);
                }
            )
            .then(
                function (semester) {
                    if(semester){
                        res.sendStatus(200);
                    }
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }


    /* for future use if required */

    /*function findSemesterBySemestername(semestername, res) {
        semesterModel
            .findSemesterBySemestername(semestername)
            .then(
                function (semester) {
                    res.json(semester);
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            );
    }*/


    ////////////////////////////////////////////////////////////////////////////////////////////////////
    //                      Developed by Anvita                                                      //
    ////////////////////////////////////////////////////////////////////////////////////////////////////



    ////////////////////////////////////////////////////////////////////////////////////////////////////
    //                      Developed by Manognya                                                      //
    ////////////////////////////////////////////////////////////////////////////////////////////////////




};
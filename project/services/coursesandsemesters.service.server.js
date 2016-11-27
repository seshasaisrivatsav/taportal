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


    // function findCourseByCoursename(coursename, res) {
    //     courseModel
    //         .findCourseByCoursename(coursename)
    //         .then(
    //             function (course) {
    //                 res.json(course);
    //             },
    //             function (error) {
    //                 res.sendStatus(404).send(error);
    //             }
    //         );
    // }


/* Semester Functions */

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



};
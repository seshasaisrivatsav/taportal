/**
 * Created by seshasai on 11/16/2016.
 */
module.exports= function(app, models){

    var courseModel = models.courseModel;


    app.post("/api/course", createCourse);
    app.get("/api/course/:courseId", findCourseById);
    app.delete("/api/course/:courseId", deleteCourse);
    app.put("/api/course/:courseId", updateCourse);
    app.get("/api/findallcourses", findallcourses);

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
                res.send(200);
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


    function findCourseByCoursename(coursename, res) {
        courseModel
            .findCourseByCoursename(coursename)
            .then(
                function (course) {
                    res.json(course);
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            );
    }






};
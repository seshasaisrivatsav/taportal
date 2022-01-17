/**
 * Created by seshasai on 11/5/2016.
 */
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;

let bcrypt = require("bcrypt-nodejs");

/* For resume upload */
let fs = require("fs");
let multer = require('multer');
let upload = multer({dest: __dirname + '/../../public/uploads'});


module.exports = function (app, models) {
    let userModel = models.userModel;
    app.get("/api/user", getUsers);
    app.post("/api/user", createUser);
    app.post("/api/register", register);
    app.get("/api/loggedIn", loggedIn);
    app.post("/api/logout", logout);
    app.post('/api/login', passport.authenticate('TaPortal'), login);
    app.get("/api/user/:userId", findUserById);
    app.delete("/api/user/:userId", deleteUser);
    app.put("/api/user/:userId", updateUser);
    app.put("/api/user/addcourse/:userId", addUserCourses);
    app.put("/api/user/addcurrentcourse/:userId", addCurrentCourses);
    app.put("/api/user/deleteusercourse/:userId", deleteUserCourse);
    app.put("/api/user/deletecurrentcourse/:userId", deleteCurrentCourse);
    app.get('/api/findallusers', findallusers);
    app.post("/api/resumeupload", upload.single('myResume'), uploadResume);
    app.get("/api/user1/:userId", findUserById1);
    // let url = "/api/rateStudent/" +StudentID+ "/rating/" +rating+ "/byFaculty/" + facultyId;
    app.put("/api/rateStudent/:StudentID", rateStudentByFaculty);


    passport.use('TaPortal', new LocalStrategy(localStrategy));


    //done - is to notify passport of success/failures

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    //                      Developed by Srivatsav                                                     //
    ////////////////////////////////////////////////////////////////////////////////////////////////////


    // logout: ends session of a user
    // Author: Sesha Sai Srivatsav

    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }

    // findallUsers
    // retruns all the users in the system
    // Author: Sesha Sai Srivatsav
    function findallusers(req, res) {

        userModel
            .findAllUsers()
            .then(
                function (users) {
                    res.json(users);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    // register
    // Creates new user
    // Author: Sesha Sai Srivatsav
    function register(req, res) {
        let username = req.body.username;
        let password = req.body.password;
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                    if (user) {
                        res.status(400).send("Username is in use");
                        return;
                    } else {

                        req.body.password = bcrypt.hashSync(req.body.password);
                        return userModel
                            .createUser(req.body);

                    }
                },
                function (err) {
                    res.status(400).send(err);

                })

            .then(
                function (user) {
                    if (user) {
                        //provided by passport
                        req.login(user, function (err) {
                            if (err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        })
                    }
                },
                function (err) {
                    res.status(400).send(err);
                });
    }


    // Author: Sesha Sai Srivatsav
    // Finds user by username
    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {

                    if (user && bcrypt.compareSync(password, user.password)) {
                        done(null, user);

                    } else {
                        done("Error in login!", null);
                    }
                },
                function (err) {
                    done(err);
                });
    }

    // Author: Sesha Sai Srivatsav
    // Serializes the user
    function serializeUser(user, done) {
        done(null, user);
    }

    // Author: Sesha Sai Srivatsav
    // Deserialises the user
    // Finds the user when userId is given
    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }


    // Author: Sesha Sai Srivatsav
    // A user can login
    function login(req, res) {
        console.log('Here');
        let user = req.user;
        res.json(user);
    }

    // Author: Sesha Sai Srivatsav
    // Checks whether the user is logged in
    function loggedIn(req, res) {
        if (req.isAuthenticated()) {
            res.json(req.user);
        } else {
            res.send('0');
        }
    }

    // Author: Sesha Sai Srivatsav
    // Description: Adds the completed courses for a user
    // In case of faculty, these are the courses that faculty is teaching
    // function: addUserCourses
    function addUserCourses(req, res) {
        let id = req.params.userId;
        let user = req.body;
        userModel
            .addUserCourses(id, user)
            .then(
                function (stats) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    // Author: Sesha Sai Srivatsav
    // Description: Adds current courses a student is studying
    // function:addCurrentCourses
    function addCurrentCourses(req, res) {
        let id = req.params.userId;
        let user = req.body;
        userModel
            .addCurrentCourses(id, user)
            .then(
                function (stats) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    // Author: Sesha Sai Srivatsav
    // Description:  Updates metadata of given user when userId is specified
    // function: updateUser
    function updateUser(req, res) {
        let id = req.params.userId;
        let user = req.body;
        userModel
            .updateUser(id, user)
            .then(
                function (stats) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    // Author: Sesha Sai Srivatsav
    // Description: Creates a user
    // function: createUser
    function createUser(req, res) {

        let username = req.body.username;

        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if (user) {
                        res.send("Username already in use");
                        return;
                    } else {
                        req.body.password = bcrypt.hashSync(req.body.password);
                        return userModel
                            .createUser(req.body)
                    }
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            )
            .then(
                function (user) {
                    if (user) {
                        res.sendStatus(200);
                    }
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );

    }

    // Author: Sesha Sai Srivatsav
    // Description: Deletes completed course of a student/faculty
    // function:deleteUserCourse
    function deleteUserCourse(req, res) {
        let userId = req.params.userId;
        let coursename = req.body;
        userModel
            .deleteUserCourse(userId, coursename)
            .then(function (stats) {

                    res.sendStatus(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                });
    }

    // Author: Sesha Sai Srivatsav
    // Description:  Deletes the current course of a student
    // function: deleteCurrentCourse
    function deleteCurrentCourse(req, res) {
        let userId = req.params.userId;
        let coursename = req.body;
        userModel
            .deleteCurrentCourse(userId, coursename)
            .then(function (stats) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                });
    }


    // Author: Sesha Sai Srivatsav
    // Description: Deletes the user from the system.
    // function: deleteUser
    function deleteUser(req, res) {
        let userId = req.params.userId;

        userModel
            .deleteUser(userId)
            //responds with some stats
            .then(function (stats) {

                    res.sendStatus(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                });


    }

    // Author: Sesha Sai Srivatsav
    // Description: Given a userId, this returns the user Object
    // function: findUserById
    function findUserById(req, res) {
        let id = req.params.userId;


        userModel
            .findUserById(id)
            .then(function (user) {
                    res.send(user);
                },
                function (error) {
                    res.statusCode(404).send(error);
                });

    }

    // Author: Sesha Sai Srivatsav
    // Description: 
    // function:
    function getUsers(req, res) {
        let username = req.query.username;
        let password = req.query.password;
        if (username && password) {
            findUserByCredentials(username, password, req, res);
        } else if (username) {
            findUserByUsername(username, res);
        } else {
            findallusers();
        }
    }

    // Author: Sesha Sai Srivatsav
    // Description: Given userID and password, the method returns the user object
    // function: findUserByCredentials
    function findUserByCredentials(username, password, req, res) {
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                    req.session.currentUser = user;
                    res.json(user);
                },
                function (err) {
                    res.statusCode(404).send(err);
                });
    }


    // Author: Sesha Sai Srivatsav
    // Description: Given username, this function returns the user object
    // function: findUserByUsername
    function findUserByUsername(username, res) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            );
    }

    function rateStudentByFaculty(req, res) {
        let sid = req.params.StudentID;
        let rating = req.body.array12;
        let ratingGiven = 1;
        let sum = 0;
        for (let i1 = 0; i1 < rating.length; i1++) {
            sum = sum + parseInt(rating[i1].rating);
        }
        ratingGiven = parseInt(sum / rating.length);
        if (parseInt(ratingGiven) < 1) {
            ratingGiven = 1;
        }

        userModel.rateStudentByFaculty(sid, rating)
            .then(
                function (student) {

                    res.json(student);
                },
                function (error) {
                    res.sendStatus(400).send(err);
                }
            );


        userModel.UpdateAverageRating(sid, ratingGiven)
            .then(
                function (student) {
                    // console.log("stud");
                    //console.log(student);
                },
                function (error) {
                    res.sendStatus(400).send(err);
                }
            );
    }


    function findUserById1(req, res) {
        let id = req.params.userId;
        userModel
            .findUserById(id)
            .then(function (user) {
                    return (user);
                },
                function (error) {
                    res.statusCode(404).send(error);
                });

    }


    // uploadResume:
    function uploadResume(req, res) {
        let UserId = req.body.userId;

        let myFile = req.file;
        let path = myFile.path;
        let originalname = myFile.originalname;
        let size = myFile.size;
        let mimetype = myFile.mimetype;
        let filename = myFile.filename;

        //Get the file type
        let mimes = mimetype.split('/');
        let extension = mimes[mimes.length - 1];

        //Append the file extension at the end of randomly generated filename
        let file = filename + "." + extension;

        let newpath = path + "." + extension;

        //Rename the file path
        fs.rename(path, newpath);

        //Check whether the upload is for UPLOAD widget or IMAGE widget
        const resume = {
            url: "/uploads/" + file,
            resume: originalname
        };

        //Check whether the user needs to be edited or created!

        userModel
            .updateResumeOfStudent(UserId, resume)
            .then(
                function (user) {
                    res.send(200);

                },
                function (err) {
                    res.status(400).send(err);
                }
            );
        res.redirect("/#/sprofile");
    }


};
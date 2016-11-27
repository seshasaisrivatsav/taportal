/**
 * Created by seshasai on 11/5/2016.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var bcrypt = require("bcrypt-nodejs");


module.exports= function(app, models){

    var userModel = models.userModel;

    app.get("/api/user", getUsers);
    app.post("/api/user", createUser);
    app.post("/api/register", register);
    app.get("/api/loggedIn",loggedIn);
    app.post("/api/logout", logout);
    app.post('/api/login', passport.authenticate('TaPortal'), login);
    app.get("/api/user/:userId", findUserById);
    app.delete("/api/user/:userId", deleteUser);
    app.put("/api/user/:userId", updateUser);
    app.put("/api/user/addcourse/:userId", addUserCourses);
    app.get('/api/findallusers', findallusers);


    passport.use('TaPortal', new LocalStrategy(localStrategy));



    //done - is to notify passport of success/failures

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);





    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }


    function findallusers(req, res) {

        userModel
            .findAllUsers()
            .then(
                function (users) {
                    res.json(users);
                },
                function (error) {
                    res.sendStatus(404);
                }
            );
    }


    function register(req,res) {
        console.log("here");
        var username = req.body.username;
        var password = req.body.password;
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                    if(user){
                        res.status(400).send("Username is in use");
                        return;
                    }else{

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
                    if(user){
                        //provided by passport
                        req.login(user, function (err) {
                            if(err){
                                res.status(400).send(err);
                            }else{
                                res.json(user);
                            }
                        })
                    }
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {

                    if(user && bcrypt.compareSync(password, user.password)){
                        done(null,user);

                    }else {
                        done("Error in login!", null);
                    }
                },
                function(err) {
                    done(err);
                });
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }



    function login ( req, res){
        var user = req.user;
        res.json(user);
    }


    function loggedIn(req,res) {
        if(req.isAuthenticated()){
            res.json(req.user);
        }else{
            res.send('0');
        }
    }

    function addUserCourses(req,res) {
        var id = req.params.userId;
        var user = req.body;
        userModel
            .addUserCourses(id, user)
            .then(
                function (stats) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(404);
                }
            );
    }


    function updateUser(req, res) {
        var id = req.params.userId;
        var user = req.body;


        userModel
            .updateUser(id, user)
            .then(
                function (stats) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(404);
                }
            );
    }


    function createUser(req, res) {

        var username = req.body.username;

        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user){
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
                    if(user){
                        res.sendStatus(200);
                    }
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );

    }


    function deleteUser(req,res) {
        var userId = req.params.userId;

        userModel
            .deleteUser(userId)
            //responds with some stats
            .then(function (stats) {

                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                });


    }


    function findUserById(req, res){
        var id = req.params.userId;

        userModel
            .findUserById(id)
            .then(function (user) {
                    res.send(user);
                },
                function (error) {
                    res.statusCode(404).send(error);
                });

    }

    function getUsers(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if(username && password){
            findUserByCredentials(username, password, req, res);
        } else if(username){
            findUserByUsername(username, res);
        }else {
            findAllUsers();
        }
    }

    function findUserByCredentials (username, password, req, res){
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                    req.session.currentUser= user;
                    res.json(user);
                },
                function (err) {
                    res.statusCode(404).send(err);
                });
    }

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


};
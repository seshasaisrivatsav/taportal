/**
 * Created by manog on 01-12-2016.
 */
/**
 * Created by manog on 27-11-2016.
 */
module.exports= function(app, models) {

    var applicationModel = models.applicationModel;

    app.post("/api/user/:userId/application", createApplication);
    app.get("/api/application/:applicationId", findApplicationById);
    app.delete("/api/application/:applicationId", deleteApplication);
    app.put("/api/application/:applicationId", updateApplication);
    // app.get("/api/findallapplications", findallapplications);
    app.get("/api/user/:userId/application", findApplicationForUser);

    app.put("/api/GiveDecisionforApp/:appId/decision/:decision", GiveDecisionforApp);

    function GiveDecisionforApp(req,res) {

        var aid=req.params.appId;
        var decision=req.params.decision;

        console.log("in server");
        console.log(decision);
        console.log(aid);

        applicationModel.GiveDecisionforApp(aid, decision)
            .then(
                function (status) {

                    console.log("response from model");
                    console.log(status);
                    res.json(status);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }


    // author: ANvita

   // var url = "/api/ApplicationForPosition/" +posId;
    app.get("/api/ApplicationForPosition/:applicationId", findApplicationsForPosition);

    function findApplicationsForPosition(req,res) {
        var aid=req.params.applicationId;

        applicationModel.findApplicationsForPosition(aid)
            .then(
                function (application)
                {
                    res.json(application);
                },
                function (error) {
                    res.sendStatus(400).send(err);
                }
            );
    }



    //Author: Manognya
    app.get("/api/application/:positionTitle",findPositionIDByTitle);

    function createApplication(req,res) {


        var application = req.body;

        applicationModel
            .createApplication(application)
            .then(
                function (application) {
                    res.send(200);

                }, function (err) {

                    res.sendStatus(400).send(err);
                }
            );
    }


    function findApplicationById(req,res) {
        var aid=req.params.applicationId;
        applicationModel.findApplicationById(aid)
            .then(
                function (application)
                {
                    res.json(application);
                },
                function (error) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function findApplicationForUser(req,res) {
        applicationModel.findApplicationForUser(req.params.userId)
            .then(
                function (application) {

                    res.json(application);
                },
                function (error) {
                    res.sendStatus(400).send(err);
                }
            )
    }

    function updateApplication(req,res) {
        var application = req.body;
        var aid=req.params.applicationId;

        applicationModel.updateApplication(aid, application)
            .then(
                function (status) {

                    res.send(200);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function deleteApplication(req,res) {
        var aid = req.params.applicationId;

        applicationModel.deleteApplication(aid)
            .then(function (status) {
                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                });
    }

    function findPositionIDByTitle(req,res) {
        var posTitle = req.params.positionTitle;
        positionModel. findPositionIDByTitle(posTitle)
            .then(
                function (position) {
               
                    res.send(position[0]._id);
                },
                function (error) {
                    res.sendStatus(404);
                }
            )}

};
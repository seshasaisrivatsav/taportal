/**
 * Created by seshasai on 11/17/2016.
 */

module.exports= function(app, models){

    var positionModel = models.positionModel;
    app.post("/api/position", createPosition);
    app.get("/api/position/:positionId", findPositionById);
    app.delete("/api/position/:positionId", deletePosition);
    app.put("/api/position/:positionId", updatePosition);
    app.put("/api/position/semestername", updateDeadline);
    app.get("/api/findallpositions", findallpositions);
    //  app.get("/api/findPositionByCourseName", courseName);
    app.get("/api/application/:positionTitle",findPositionIDByTitle);
    app.get("/api/findPositionByCourseName/:courseName", findPositionByCourseName);

    function findPositionByCourseName(req, res) {
        var name = req.params.courseName;
        positionModel
            .findPositionByName(name)
            .then(function (position) {
                res.send(position);
            }, function (error) {
                res.statusCode(404).send(error);
            });
    }

    // Description: returns the position with a specific position ID
    // function: findPositionById
    function findPositionById(req, res) {
        var id = req.params.positionId;
        positionModel
            .findPositionById(id)
            .then(function (position) {
                res.send(position);
            }, function (error) {
                res.statusCode(404).send(error);
            });
    }
    // Description: Updates the position for a specified position ID
    // function: updatePosition
    function updatePosition(req, res) {
        var id = req.params.positionId;
        var position = req.body;
        positionModel
            .updatePosition(id, position)
            .then(
                function (stats) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    // TO DO : Fix this!
    function updateDeadline(req, res) {
        var position = req.body;

        var deadline = position.deadline;
        var semester = position.semester;

        positionModel
            .updateDeadline(semester, deadline)
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
    // Description: deletes a position for a given position ID
    // function:deletePosition
    function deletePosition(req,res) {


        positionModel
            .deletePosition(req.params.positionId)
            .then(function (stats) {
                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                });
    }

    // Author: Sesha Sai Srivatsav
    // Description: returns all positions in the system
    // function: findallpositions
    function findallpositions(req,res) {
        positionModel
            .findAllPositions()
            .then(
                function (positions) {
                    res.json(positions);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    // Author: Sesha Sai Srivatsav
    // Description: Creates a new TA Position
    // function: createPosition
    function createPosition(req, res) {
        var position = req.body;
        positionModel
            .createPosition(req.body)
            .then(
                function (stats) {
                    res.sendStatus(200);

                }, function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    //                      Developed by Anvita                                                      //
    ////////////////////////////////////////////////////////////////////////////////////////////////////


    ////////////////////////////////////////////////////////////////////////////////////////////////////
    //                      Developed by Manognya                                                      //
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    function findPositionIDByTitle(req,res) {
        var posTitle = req.params.positionTitle;
        positionModel. findPositionIDByTitle(posTitle)
            .then(
                function (position) {
                    console.log(position[0]);
                    console.log(position[0]._id);
                    res.send(position[0]._id);
                },
                function (error) {
                    res.sendStatus(404);
                }
            )}

};
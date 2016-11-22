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
                    res.sendStatus(404);
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
                    res.sendStatus(404);
                }
            );
    }

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


    function findallpositions(req,res) {
        positionModel
            .findAllPositions()
            .then(
                function (positions) {
                    res.json(positions);
                },
                function (error) {
                    res.sendStatus(404);
                }
            );
    }

    function createPosition(req, res) {
        var position = req.body;
        positionModel
            .createPosition(req.body)
            .then(
                function (stats) {
                    res.send(200);

                }, function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }





};
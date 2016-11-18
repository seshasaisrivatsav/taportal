/**
 * Created by seshasai on 11/5/2016.
 */

module.exports = function () {
    var mongoose = require("mongoose");

    var PositionSchema = mongoose.Schema({

<<<<<<< HEAD

=======
        position:[
            {
>>>>>>> 2773ecc4b8401a6fb8f3fc711720ec3ce41f96d9

                course: String, // from the drop down of courses, we will select Course
                semester: String, // from the drop down of semesters, we will select a semester
                number: String,//No of positions offered for this position
                professor : String, //Course offered under
                deadline: Date //Deadline to apply for the position
<<<<<<< HEAD
    
=======
            }
        ]

>>>>>>> 2773ecc4b8401a6fb8f3fc711720ec3ce41f96d9


    }, {collections: 'taportal.position'});
    return PositionSchema;
};
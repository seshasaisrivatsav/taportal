/**
 * Created by seshasai on 11/5/2016.
 */

module.exports = function () {
    var mongoose = require("mongoose");

    var PositionSchema = mongoose.Schema({



                course: String, // from the drop down of courses, we will select Course
                semester: String, // from the drop down of semesters, we will select a semester
                number: String,//No of positions offered for this position
                professor : String, //Course offered under
                deadline: Date //Deadline to apply for the position
    


    }, {collections: 'taportal.position'});
    return PositionSchema;
};
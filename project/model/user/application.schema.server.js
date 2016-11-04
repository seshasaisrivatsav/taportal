/**
 * Created by seshasai on 11/3/2016.
 */
 
module.exports = function () {
    // mongoDb has no notion of schemas. this is at the application level
    var mongoose = require("mongoose");

    var ApplicationSchema = mongoose.Schema ({
        

    }, {collection: 'taportal.application'});
    return ApplicationSchema;
};

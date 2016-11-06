/*entry gate in to the database connection */
// we create a node JS module
module.exports  = function () {

    var models = {
        userModel : require("./user/user.model.server")()


    };
    return models;
};
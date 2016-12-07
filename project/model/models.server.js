/*entry gate in to the database connection */
//Author: Sesha Sai Srivatsav
// we create a node JS module
module.exports  = function () {

    var models = {
        userModel : require("./user/user.model.server")(),
        courseModel : require ("./user/course.model.server")(),
        semesterModel : require ("./user/semester.model.server")(),
        positionModel: require ("./user/position.model.server")(),
        applicationModel: require("./user/application.model.server")()


    };
    return models;
};
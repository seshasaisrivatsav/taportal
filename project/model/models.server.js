/*entry gate in to the database connection */
// we create a node JS module
module.exports  = function () {

    var models = {
<<<<<<< HEAD
        userModel : require("./user/user.model.server")(),
        courseModel : require ("./user/course.model.server")(),
        semesterModel : require ("./user/semester.model.server")(),
        positionModel: require ("./user/position.model.server")()
=======
        userModel : require("./user/user.model.server")()
>>>>>>> 2773ecc4b8401a6fb8f3fc711720ec3ce41f96d9


    };
    return models;
};
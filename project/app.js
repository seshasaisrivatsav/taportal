/**
 * Created by seshasai on 11/3/2016.
 */
<<<<<<< HEAD
=======
//dhvani
>>>>>>> 2773ecc4b8401a6fb8f3fc711720ec3ce41f96d9

module.exports = function (app) {
    var models = require("./model/models.server.js")();
    // pass the models to services.
    require("./services/user.service.server.js")(app, models);
<<<<<<< HEAD
    require("./services/coursesandsemesters.service.server.js")(app, models);
    require("./services/position.service.server.js")(app,models);
    
};

=======
    
};


>>>>>>> 2773ecc4b8401a6fb8f3fc711720ec3ce41f96d9

/**
 * Created by seshasai on 11/3/2016.
 */

module.exports = function (app) {
    const models = require("./model/models.server.js")();
    // pass the models to services.
    require("./services/user.service.server.js")(app, models);
    require("./services/coursesandsemesters.service.server.js")(app, models);
    require("./services/position.service.server.js")(app,models);
    require("./services/application.service.server.js")(app,models);
};


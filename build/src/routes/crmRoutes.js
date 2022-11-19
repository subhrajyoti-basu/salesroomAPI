"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _crmController = require("../controllers/crmController");

var _userControllers = require("../controllers/userControllers");

var routes = function routes(app) {
    app.route('/contacts').get(function (req, res, next) {
        // middleware
        console.log("Request from: " + req.originalUrl);
        console.log("Request type: " + req.method);
        next();
    }, _userControllers.loginRequired, _userControllers.isAdmin, _crmController.getContacts).post(_userControllers.loginRequired, _crmController.addNewContact);

    app.route('/contact/:contactId')
    // get specific contact
    .get(_userControllers.loginRequired, _crmController.getContactWithID)

    // put request
    .put(_userControllers.loginRequired, _crmController.updateContact)

    // delete request
    .delete(_userControllers.loginRequired, _crmController.deleteContact);

    // registration route
    app.route('/register').post(_userControllers.register);

    // login route
    app.route('/login').post(_userControllers.login);
};

exports.default = routes;
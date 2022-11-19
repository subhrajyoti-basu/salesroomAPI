"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _roomController = require("../controllers/roomController");

var _userControllers = require("../controllers/userControllers");

var routes = function routes(app) {

    // addroom
    app.route('/addroom').post(_userControllers.loginRequired, _roomController.createRoom);

    app.route('/room/:roomId')
    // get specific contact
    .get(_roomController.getRoom)

    // put request
    .put(_userControllers.loginRequired, _roomController.updateRoom);

    // delete request
    // .delete(loginRequired, deleteContact);
    // registration route

    app.route('/allrooms').get(_userControllers.loginRequired, _roomController.getAllRoom);

    app.route('/register').post(_userControllers.register);

    // login route
    app.route('/login').post(_userControllers.login);
};

exports.default = routes;
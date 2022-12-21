"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _roomController = require("../controllers/roomController");

var _roomDataController = require("../controllers/roomDataController");

var _userControllers = require("../controllers/userControllers");

var routes = function routes(app) {

    // addroom
    app.route('/addroom').post(_userControllers.loginRequired, _userControllers.checkRoomLimit, _roomController.createRoom);

    app.route('/room/:roomId')
    // get specific contact
    .get(_roomDataController.getRoomData)

    // put request
    .put(_userControllers.loginRequired, _userControllers.accountStatus, _roomController.updateRoom);

    // delete request

    app.route('/delroom/:roomIds').delete(_userControllers.loginRequired, _roomController.deleteRoom);

    // registration route

    app.route('/allrooms').get(_userControllers.loginRequired, _userControllers.accountStatus, _roomController.getAllRoom);

    app.route('/register').post(_userControllers.userNameExists, _userControllers.register);

    // login route
    app.route('/login').post(_userControllers.login);
};

exports.default = routes;
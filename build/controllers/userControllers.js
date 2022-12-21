'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.login = exports.register = exports.isAdmin = exports.accountStatus = exports.checkRoomLimit = exports.userNameExists = exports.loginRequired = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _userModel = require('../models/userModel');

var _roomModel = require('../models/roomModel');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _mongoose2.default.model('User', _userModel.UserSchema);
var Room = _mongoose2.default.model('room', _roomModel.RoomSchema);

var loginRequired = exports.loginRequired = function loginRequired(req, res, next) {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
};

var userNameExists = exports.userNameExists = function userNameExists(req, res, next) {
    User.findOne({ username: req.body.username }, function (err, user) {
        if (user) {
            return res.status(401).json({ message: 'Username Already Exist' });
        } else {
            next();
        }
    });
};

var checkRoomLimit = exports.checkRoomLimit = function checkRoomLimit(req, res, next) {
    Room.find({ roomCreatedBy: req.user.username }, function (err, room) {
        if (err) {
            return res.send(err);
        } else if (room.length < req.user.number_of_rooms) {
            next();
        } else {
            return res.status(401).json({ message: 'Cannot make more rooms!' });
        }
    });
};

var accountStatus = exports.accountStatus = function accountStatus(req, res, next) {
    User.findOne({ _id: req.user._id }, function (err, user) {
        console.log(user);
        if (err) {
            return res.send(err);
        } else if (user.account_status === 'active') {
            next();
        } else {
            return res.status(401).json({ message: 'inactive user' });
        }
    });
};

var isAdmin = exports.isAdmin = function isAdmin(req, res, next) {
    if (req.user.role == 'admin') {
        console.log(req.user);
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
};

var register = exports.register = function register(req, res) {
    var newUser = new User(req.body);
    newUser.hashPassword = _bcrypt2.default.hashSync(req.body.password, 10);
    newUser.save(function (err, user) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            user.hashPassword = undefined;
            return res.json(user);
        }
    });
};

var login = exports.login = function login(req, res) {
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.status(401).json({ message: 'Authentication failed. No user found' });
        } else if (user) {
            if (!user.comparePassword(req.body.password, user.hashPassword)) {
                res.status(401).json({ message: 'Authentication failed. Wrong password' });
            } else {
                return res.json({ token: _jsonwebtoken2.default.sign({ email: user.email, username: user.username, _id: user.id, number_of_rooms: user.number_of_rooms }, 'RESTFULAPIs') });
            }
        }
    });
};
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.login = exports.register = exports.isAdmin = exports.loginRequired = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _userModel = require('../models/userModel');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _mongoose2.default.model('User', _userModel.UserSchema);

var loginRequired = exports.loginRequired = function loginRequired(req, res, next) {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
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
                return res.json({ token: _jsonwebtoken2.default.sign({ email: user.email, username: user.username, _id: user.id }, 'RESTFULAPIs') });
            }
        }
    });
};
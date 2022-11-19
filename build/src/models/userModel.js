'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var UserSchema = exports.UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hashPassword: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

UserSchema.methods.comparePassword = function (password, hashPassword) {
    return _bcrypt2.default.compareSync(password, hashPassword);
};
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ContactSchema = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ContactSchema = exports.ContactSchema = new _mongoose2.default.Schema({
    firstName: { type: String, require: require },
    lastName: { type: String, require: require },
    email: { type: String, require: require },
    password: { type: String, require: require },
    create_Date: { type: Date, default: Date.now }
});
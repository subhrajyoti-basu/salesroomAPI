"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RoomSchema = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RoomSchema = exports.RoomSchema = new _mongoose2.default.Schema({
    roomName: { type: String, require: require },
    roomStatus: { type: Number, default: '1' },
    roomCreatedBy: { type: String, require: require },
    brandPhoto: { type: String },
    create_Date: { type: Date, default: Date.now }
});
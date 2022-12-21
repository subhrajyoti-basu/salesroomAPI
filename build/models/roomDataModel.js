"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RoomDataSchema = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RoomDataSchema = exports.RoomDataSchema = new _mongoose2.default.Schema({
    roomName: { type: String, require: require },
    roomId: { type: String, require: require },
    roomData: { type: Array }

});
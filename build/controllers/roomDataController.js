"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateRoomData = exports.deleteRoomData = exports.getRoomData = exports.createRoomData = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _roomDataModel = require("../models/roomDataModel");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RoomData = _mongoose2.default.model('roomData', _roomDataModel.RoomDataSchema);

var createRoomData = exports.createRoomData = function createRoomData(req, res) {
    var newRoomData = new RoomData({
        roomId: req._id,
        roomData: req.body.roomData,
        roomName: req.body.roomName
    });
    newRoomData.save(function (err, room) {
        if (err) {
            return res.send(err);
        }
        return res.json(room);
    });
};

var getRoomData = exports.getRoomData = function getRoomData(req, res) {
    RoomData.findOne({ roomId: req.params.roomId }, function (err, room) {
        if (err) {
            return res.send(err);
        }
        return res.json(room);
    });
};

var deleteRoomData = exports.deleteRoomData = function deleteRoomData(req, res) {
    // console.log(req.params.roomIds.split(","))

    RoomData.deleteMany({ roomId: { $in: req.params.roomIds.split(",") } }, function (err, room) {
        if (err) {
            res.send(err);
        }
        res.json(room);
    });
};

var updateRoomData = exports.updateRoomData = function updateRoomData(req, res) {
    RoomData.findOneAndUpdate({ roomId: req.params.roomId }, {
        roomData: req.body.canvasData,
        roomName: req.body.name
    }, { new: true }, function (err, room) {
        if (err) {
            res.send(err);
        }
        res.json(room);
    });
};
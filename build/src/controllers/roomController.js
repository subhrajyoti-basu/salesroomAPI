"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createRoom = exports.updateRoom = exports.getAllRoom = exports.getRoom = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _roomModel = require("../models/roomModel");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Room = _mongoose2.default.model('room', _roomModel.RoomSchema);

var getRoom = exports.getRoom = function getRoom(req, res) {
    Room.findOne({ _id: req.params.roomId }, function (err, room) {
        if (err) {
            return res.send(err);
        }
        return res.json(room);
    });
};

var getAllRoom = exports.getAllRoom = function getAllRoom(req, res) {
    Room.find({ roomCreatedBy: req.user._id }, function (err, room) {
        if (err) {
            return res.send(err);
        }
        return res.json(room);
    });
};

var updateRoom = exports.updateRoom = function updateRoom(req, res) {
    Room.findOneAndUpdate({ _id: req.params.roomId }, {
        roomData: req.body.canvasData,
        roomName: req.body.name,
        brandPhoto: req.body.brandPhoto
    }, { new: true }, function (err, room) {
        if (err) {
            res.send(err);
        }
        res.json(room);
    });
};

var createRoom = exports.createRoom = function createRoom(req, res) {
    var newRoom = new Room(req.body);
    newRoom.roomCreatedBy = req.user.username;
    newRoom.save(function (err, room) {
        if (err) {
            return res.send(err);
        }

        return res.json(room);
    });
};
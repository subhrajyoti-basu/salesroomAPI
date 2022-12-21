import mongoose from "mongoose";
import { RoomSchema } from "../models/roomModel";
import { createRoomData, deleteRoomData, updateRoomData } from "./roomDataController";

const Room = mongoose.model('room', RoomSchema);

export const getRoom = (req, res) => {
    Room.findOne({ _id: req.params.roomId }, (err, room) => {
        if (err) {
            return res.send(err);
        }
        return res.json(room);
    });
};

export const getAllRoom = (req, res) => {
    Room.find({ roomCreatedBy: req.user.username }, (err, room) => {
        if (err) {
            return res.send(err);
        }
        return res.json(room);
    });
};


export const updateRoom = (req, res) => {
    Room.findOneAndUpdate(
        { _id: req.params.roomId },
        {
            roomData: req.body.canvasData,
            roomName: req.body.name,
        },
        { new: true },
        (err, room) => {
            if (err) {
                res.send(err);
            }
            updateRoomData(req,res)
        })
}

export const createRoom = (req, res) => {
    let newRoom = new Room(req.body);
    newRoom.roomCreatedBy = req.user.username;
    newRoom.save((err, room) => {
        if (err) {
            return res.send(err);
        }
        req._id = room._id;
        createRoomData(req,res)
        // return res.json(room);
    });
}

export const deleteRoom = (req, res) => {
    // console.log(req.params.roomIds.split(","))

    Room.deleteMany({ _id: { $in: req.params.roomIds.split(",") } },
        (err, room) => {
            if (err) {
                res.send(err);
            }
            deleteRoomData(req,res)
            // res.json(room);
        })
}
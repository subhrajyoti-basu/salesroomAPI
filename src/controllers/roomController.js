import mongoose from "mongoose";
import { RoomSchema } from "../models/roomModel";

const Room = mongoose.model('room', RoomSchema);

export const getRoom = (req, res) => {
    Room.findOne({_id: req.params.roomId}, (err, room) => {
        if (err) {
            return res.send(err);
        }
        return res.json(room);
    });
};

export const getAllRoom = (req, res) => {
    Room.find({roomCreatedBy: req.user._id}, (err, room) => {
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
            roomName: req.body.name
        },
        { new: true},
        (err, room) => {
            if (err) {
                res.send(err);
            }
            res.json(room);
        })
}

export const createRoom = (req, res) => {
    let newRoom = new Room(req.body);
    newRoom.roomCreatedBy = req.user._id;
    newRoom.save((err, room) => {
        if (err) {
            return res.send(err);
        }

        return res.json(room);
    });
}
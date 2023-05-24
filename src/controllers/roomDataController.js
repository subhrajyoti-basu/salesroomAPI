import mongoose from "mongoose";
import { RoomDataSchema } from "../models/roomDataModel.js";

const RoomData = mongoose.model("roomData", RoomDataSchema);

export const createRoomData = (req, res) => {
  let newRoomData = new RoomData({
    roomId: req._id,
    roomData: req.body.roomData,
    roomName: req.body.roomName,
  });
  newRoomData.save((err, room) => {
    if (err) {
      return res.send(err);
    }
    return res.json(room);
  });
};

export const getRoomData = (req, res) => {
  RoomData.findOne({ roomId: req.params.roomId }, (err, room) => {
    if (err) {
      return res.send(err);
    }
    return res.json(room);
  });
};

export const deleteRoomData = (req, res) => {
  // console.log(req.params.roomIds.split(","))

  RoomData.deleteMany(
    { roomId: { $in: req.params.roomIds.split(",") } },
    (err, room) => {
      if (err) {
        res.send(err);
      }
      res.json(room);
    }
  );
};

export const updateRoomData = (req, res) => {
  RoomData.findOneAndUpdate(
    { roomId: req.params.roomId },
    {
      roomData: req.body.canvasData,
      roomName: req.body.name,
    },
    { new: true },
    (err, room) => {
      if (err) {
        res.send(err);
      }
      res.json(room);
    }
  );
};

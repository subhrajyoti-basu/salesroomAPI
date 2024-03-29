import mongoose from "mongoose";

export const RoomSchema = new mongoose.Schema({
  roomName: { type: String, required: true },
  roomStatus: { type: Number, default: "1" },
  roomCreatedBy: { type: String, required: true },
  brandPhoto: { type: String },
  create_Date: { type: Date, default: Date.now },
});

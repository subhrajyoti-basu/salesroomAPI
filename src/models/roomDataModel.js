import mongoose from "mongoose";

export const RoomDataSchema = new mongoose.Schema({
  roomName: { type: String, required: true },
  roomId: { type: String, required: true },
  roomData: { type: Array },
});

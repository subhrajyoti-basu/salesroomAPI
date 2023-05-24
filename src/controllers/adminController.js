import mongoose from "mongoose";
import { UserSchema } from "../models/userModel";

const User = mongoose.model("User", UserSchema);

export const viewUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    //send users
    res.status(200).send({
      success: true,
      users,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const changeAccountStatus = async (req, res, next) => {
  try {
    const changeStatus = await User.findOneAndUpdate(
      { _id: req.params.id },
      { account_status: "active" }
    );
    if (changeStatus)
      res.status(202).send({ success: true, message: "user activated" });
  } catch (error) {
    res.status(400).send(error);
  }
};

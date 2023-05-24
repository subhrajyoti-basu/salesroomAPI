import mongoose from "mongoose";

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

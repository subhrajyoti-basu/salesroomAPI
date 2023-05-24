import express from "express";
import {
  changeAccountStatus,
  viewUsers,
} from "../controllers/adminController.js";
import { isAdmin, loginRequired } from "../controllers/userControllers.js";

const adminRouter = express.Router();

adminRouter.get("/users", loginRequired, isAdmin, viewUsers);
adminRouter.put(
  "/activate-user/:id",
  loginRequired,
  isAdmin,
  changeAccountStatus
);

export default adminRouter;

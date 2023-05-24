import express from "express";
import { viewUsers } from "../controllers/adminController";
import { isAdmin, loginRequired } from "../controllers/userControllers";

const adminRouter = express.Router();

adminRouter.get("/users", loginRequired, isAdmin, viewUsers);

export default adminRouter;

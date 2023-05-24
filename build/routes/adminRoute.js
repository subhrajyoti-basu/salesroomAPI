"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _adminController = require("../controllers/adminController");

var _userControllers = require("../controllers/userControllers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var adminRouter = _express2.default.Router();

adminRouter.get("/users", _userControllers.loginRequired, _userControllers.isAdmin, _adminController.viewUsers);
adminRouter.put("/activate-user/:id", _userControllers.loginRequired, _userControllers.isAdmin, _adminController.changeAccountStatus);

exports.default = adminRouter;
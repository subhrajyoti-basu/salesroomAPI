"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = exports.register = exports.isAdmin = exports.accountStatus = exports.checkRoomLimit = exports.userNameExists = exports.loginRequired = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcrypt = require("bcrypt");

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _userModel = require("../models/userModel");

var _roomModel = require("../models/roomModel");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var User = _mongoose2.default.model("User", _userModel.UserSchema);
var Room = _mongoose2.default.model("room", _roomModel.RoomSchema);

var loginRequired = exports.loginRequired = function loginRequired(req, res, next) {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized user!" });
  }
};

var userNameExists = exports.userNameExists = function userNameExists(req, res, next) {
  User.findOne({ username: req.body.username }, function (err, user) {
    if (user) {
      return res.status(401).json({ message: "Username Already Exist" });
    } else {
      next();
    }
  });
};

var checkRoomLimit = exports.checkRoomLimit = function checkRoomLimit(req, res, next) {
  Room.find({ roomCreatedBy: req.user.username }, function (err, room) {
    if (err) {
      return res.send(err);
    } else if (room.length < req.user.number_of_rooms) {
      next();
    } else {
      return res.status(401).json({ message: "Cannot make more rooms!" });
    }
  });
};

var accountStatus = exports.accountStatus = function accountStatus(req, res, next) {
  User.findOne({ _id: req.user._id }, function (err, user) {
    if (err) {
      return res.send(err);
    } else if (user.account_status === "active") {
      next();
    } else {
      return res.status(401).json({ message: "inactive user" });
    }
  });
};

var isAdmin = exports.isAdmin = function isAdmin(req, res, next) {
  if (req.user.role == "admin") {
    next();
  } else {
    return res.status(401).json({ message: "User is not admin!" });
  }
};

var register = exports.register = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var newUser, existingUser, user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            newUser = new User(req.body);
            // check if email id exists

            _context.next = 4;
            return User.findOne({ email: req.body.email });

          case 4:
            existingUser = _context.sent;

            if (!existingUser) {
              _context.next = 7;
              break;
            }

            throw new Error("account with the email already exists");

          case 7:
            newUser.hashPassword = _bcrypt2.default.hashSync(req.body.password, 10);
            _context.next = 10;
            return newUser.save();

          case 10:
            user = _context.sent;

            res.status(202).send({
              success: true,
              user: user
            });
            _context.next = 17;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](0);

            res.status(400).send({
              message: _context.t0.message
            });

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 14]]);
  }));

  return function register(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var login = exports.login = function login(req, res) {
  User.findOne({
    email: req.body.email
  }, function (err, user) {
    if (err) throw err;
    if (!user) {
      res.status(401).json({ message: "Authentication failed. No user found" });
    } else if (user) {
      if (!user.comparePassword(req.body.password, user.hashPassword)) {
        res.status(401).json({ message: "Authentication failed. Wrong password" });
      } else {
        return res.json({
          token: _jsonwebtoken2.default.sign({
            email: user.email,
            username: user.username,
            _id: user.id,
            number_of_rooms: user.number_of_rooms,
            role: user.role
          }, "RESTFULAPIs")
        });
      }
    }
  });
};
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeAccountStatus = exports.viewUsers = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _userModel = require("../models/userModel");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var User = _mongoose2.default.model("User", _userModel.UserSchema);

var viewUsers = exports.viewUsers = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var users;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return User.find({});

          case 3:
            users = _context.sent;

            //send users
            res.status(200).send({
              success: true,
              users: users
            });
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);

            res.status(400).send(_context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 7]]);
  }));

  return function viewUsers(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var changeAccountStatus = exports.changeAccountStatus = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var changeStatus;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return User.findOneAndUpdate({ _id: req.params.id }, { account_status: "active" });

          case 3:
            changeStatus = _context2.sent;

            if (changeStatus) res.status(202).send({ success: true, message: "user activated" });
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);

            res.status(400).send(_context2.t0);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 7]]);
  }));

  return function changeAccountStatus(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
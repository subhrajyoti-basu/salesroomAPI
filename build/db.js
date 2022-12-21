"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _dotenv = require("dotenv");

var dotenv = _interopRequireWildcard(_dotenv);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

dotenv.config();
var connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

var DB = function DB() {
    try {
        _mongoose2.default.connect(process.env.DB, connectionParams);
        console.log("CONNECTED to base successfully");
    } catch (error) {
        console.log(error);
        console.log('Could not connect to Database');
    }
};

exports.default = DB;
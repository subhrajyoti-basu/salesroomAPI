"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
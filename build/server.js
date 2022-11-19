"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _roomRoutes = require("./src/routes/roomRoutes");

var _roomRoutes2 = _interopRequireDefault(_roomRoutes);

var _dotenv = require("dotenv");

var dotenv = _interopRequireWildcard(_dotenv);

var _db = require("./db");

var _db2 = _interopRequireDefault(_db);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

dotenv.config();

var app = (0, _express2.default)();
var PORT = process.env.PORT || 8080;

app.use((0, _cors2.default)({ origin: process.env.FRONT_URL }));
// bodyparser setup
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());

// JWT setup
app.use(function (req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        _jsonwebtoken2.default.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function (err, decode) {
            if (err) req.user = undefined;
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
});

// routes
(0, _roomRoutes2.default)(app);

// connect DB
(0, _db2.default)();

app.get('/', function (req, res) {
    res.send('sales room api');
});

app.listen(PORT, function () {
    console.log("server is running on PORT " + PORT);
});
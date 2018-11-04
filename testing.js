"use strict";
exports.__esModule = true;
var express = require("express");
var App = /** @class */ (function () {
    function App(port) {
        this.port = port;
        this.express = express();
        this.mountRoutes();
    }
    App.prototype.mountRoutes = function () {
        var router = express.Router();
        router.get("/", function (req, res) {
            res.json({ message: "LOL" });
        });
        this.express.use("/", router);
    };
    App.prototype.start = function () {
        express.listen(this.port, function (err) { if (err) {
            return console.error("xd");
        } return console.log("start"); });
    };
    return App;
}());
var app = new App(3000);
app.start();

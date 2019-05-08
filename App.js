"use strict";
exports.__esModule = true;
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var UserRoute_1 = require("./route/UserRoute");
var FoodieTagListRoute_1 = require("./route/FoodieTagListRoute");
var TagRoute_1 = require("./route/TagRoute");
// creates and configures an ExpressJS web server.
var App = /** @class */ (function () {
    // run configuration methods on the Express instance.
    function App() {
        this.expressApp = express();
        this.middleware();
        this.routes();
    }
    // configure Express middleware.
    App.prototype.middleware = function () {
        this.expressApp.use(logger("dev"));
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    };
    // configure API endpoints.
    App.prototype.routes = function () {
        var router = express.Router();
        // add user routes
        this.addRoutes(router);
        this.expressApp.use("/", router);
        this.expressApp.use("/app/json/", express.static(__dirname + "/app/json"));
        this.expressApp.use("/images", express.static(__dirname + "/img"));
        this.expressApp.use("/", express.static(__dirname + "/pages"));
    };
    App.prototype.addRoutes = function (router) {
        var foodie = new UserRoute_1.FoodieRoute();
        foodie.registerRoutes(router);
        var restaurantOwner = new UserRoute_1.RestaurantOwnerRoute();
        restaurantOwner.registerRoutes(router);
        var admin = new UserRoute_1.AdminRoute();
        admin.registerRoutes(router);
        var foodieTagList = new FoodieTagListRoute_1.FoodieTagListRoute();
        foodieTagList.registerRoutes(router);
        var tag = new TagRoute_1.TagRoute();
        tag.registerRoutes(router);
    };
    return App;
}());
exports.App = App;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var UserModel_1 = require("../model/UserModel");
// creates and configures an ExpressJS web server.
var FoodieRoute = /** @class */ (function () {
    // run configuration methods on the Express instance.
    function FoodieRoute() {
        this.Foodie = new UserModel_1.FoodieModel();
    }
    FoodieRoute.prototype.registerRoutes = function (router) {
        this.routes(router);
    };
    // configure API endpoints.
    FoodieRoute.prototype.routes = function (router) {
        var _this = this;
        // get unauthenticated page before log in
        router.get("/", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                res.status(200).send();
                return [2 /*return*/];
            });
        }); });
        // get login page
        router.get("/login", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userPayload, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userPayload = req;
                        return [4 /*yield*/, this.Foodie.logInByIDAndPassword(userPayload)];
                    case 1:
                        user = _a.sent();
                        console.log("in get route:", user);
                        res.status(200).send(user);
                        return [2 /*return*/];
                }
            });
        }); });
        // create foodie
        router.post("/foodie", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var user, successOrNot;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = req.body;
                        return [4 /*yield*/, this.Foodie.createUser(user)];
                    case 1:
                        successOrNot = _a.sent();
                        console.log("in create route:", successOrNot);
                        res.status(200).send(successOrNot);
                        return [2 /*return*/];
                }
            });
        }); });
        // get foodie by id
        router.get("/foodie/:userID", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.params.userID;
                        return [4 /*yield*/, this.Foodie.getUserByID(userId)];
                    case 1:
                        user = _a.sent();
                        console.log("in get route:", user);
                        res.status(200).send(user);
                        return [2 /*return*/];
                }
            });
        }); });
        // update foodie by id
        router.put("/foodie/:userID", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, userBody, successOrNot;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.params.userID;
                        userBody = req.body;
                        return [4 /*yield*/, this.Foodie.updateUserByID(userId, userBody)];
                    case 1:
                        successOrNot = _a.sent();
                        console.log("in update route:", successOrNot);
                        res.status(200).send(successOrNot);
                        return [2 /*return*/];
                }
            });
        }); });
        // delete foodie by id
        router["delete"]("/foodie/:userID", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.params.userID;
                        return [4 /*yield*/, this.Foodie.deleteUserByID(userId)];
                    case 1:
                        user = _a.sent();
                        console.log("in delete route:", user);
                        res.status(200).send(user);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    return FoodieRoute;
}());
exports.FoodieRoute = FoodieRoute;
var RestaurantOwnerRoute = /** @class */ (function () {
    // run configuration methods on the Express instance.
    function RestaurantOwnerRoute() {
        this.Owner = new UserModel_1.RestaurantOwnerModel();
    }
    RestaurantOwnerRoute.prototype.registerRoutes = function (router) {
        this.routes(router);
    };
    // configure API endpoints.
    RestaurantOwnerRoute.prototype.routes = function (router) {
        var _this = this;
        // get unauthenticated page before log in
        router.get("/", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                res.status(200).send();
                return [2 /*return*/];
            });
        }); });
        // get login page
        router.get("/login", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userPayload, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userPayload = req;
                        return [4 /*yield*/, this.Owner.logInByIDAndPassword(userPayload)];
                    case 1:
                        user = _a.sent();
                        console.log("in get route:", user);
                        res.status(200).send(user);
                        return [2 /*return*/];
                }
            });
        }); });
        // create foodie
        router.post("/restaurantOwner", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var user, successOrNot;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = req.body;
                        return [4 /*yield*/, this.Owner.createUser(user)];
                    case 1:
                        successOrNot = _a.sent();
                        console.log("in create route:", successOrNot);
                        res.status(200).send(successOrNot);
                        return [2 /*return*/];
                }
            });
        }); });
        // get foodie by id
        router.get("/restaurantOwner/:userID", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.params.userID;
                        return [4 /*yield*/, this.Owner.getUserByID(userId)];
                    case 1:
                        user = _a.sent();
                        console.log("in get route:", user);
                        res.status(200).send(user);
                        return [2 /*return*/];
                }
            });
        }); });
        // update foodie by id
        router.put("/restaurantOwner/:userID", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, userBody, successOrNot;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.params.userID;
                        userBody = req.body;
                        return [4 /*yield*/, this.Owner.updateUserByID(userId, userBody)];
                    case 1:
                        successOrNot = _a.sent();
                        console.log("in update route:", successOrNot);
                        res.status(200).send(successOrNot);
                        return [2 /*return*/];
                }
            });
        }); });
        // delete foodie by id
        router["delete"]("/restaurantOwner/:userID", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.params.userID;
                        return [4 /*yield*/, this.Owner.deleteUserByID(userId)];
                    case 1:
                        user = _a.sent();
                        console.log("in delete route:", user);
                        res.status(200).send(user);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    return RestaurantOwnerRoute;
}());
exports.RestaurantOwnerRoute = RestaurantOwnerRoute;
var AdminRoute = /** @class */ (function () {
    // run configuration methods on the Express instance.
    function AdminRoute() {
        this.Admin = new UserModel_1.AdminModel();
    }
    AdminRoute.prototype.registerRoutes = function (router) {
        this.routes(router);
    };
    // configure API endpoints.
    AdminRoute.prototype.routes = function (router) {
        var _this = this;
        // get unauthenticated page before log in
        router.get("/", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                res.status(200).send();
                return [2 /*return*/];
            });
        }); });
        // get login page
        router.get("/login", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userPayload, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userPayload = req;
                        return [4 /*yield*/, this.Admin.logInByIDAndPassword(userPayload)];
                    case 1:
                        user = _a.sent();
                        console.log("in get route:", user);
                        res.status(200).send(user);
                        return [2 /*return*/];
                }
            });
        }); });
        // create admin
        router.post("/admin", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var user, successOrNot;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = req.body;
                        return [4 /*yield*/, this.Admin.createUser(user)];
                    case 1:
                        successOrNot = _a.sent();
                        console.log("in create route:", successOrNot);
                        res.status(200).send(successOrNot);
                        return [2 /*return*/];
                }
            });
        }); });
        // get all users
        router.get("/admin/users", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("get all users");
                        return [4 /*yield*/, this.Admin.getAllUsers()];
                    case 1:
                        users = _a.sent();
                        console.log("get all users finished");
                        res.status(200).send(users);
                        return [2 /*return*/];
                }
            });
        }); });
        // get all foodies
        router.get("/admin/foodies", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var foodieType, foodies;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("get all foodies");
                        foodieType = req.params.userType;
                        return [4 /*yield*/, this.Admin.getAllFoodies(foodieType)];
                    case 1:
                        foodies = _a.sent();
                        console.log("get all foodies finished");
                        res.status(200).send(foodies);
                        return [2 /*return*/];
                }
            });
        }); });
        // get foodie by id
        router.get("/admin/foodies/:userID", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.params.userID;
                        return [4 /*yield*/, this.Admin.getUserByID(userId)];
                    case 1:
                        user = _a.sent();
                        console.log("in get route:", user);
                        res.status(200).send(user);
                        return [2 /*return*/];
                }
            });
        }); });
        // get all restaurantOwners
        router.get("/admin/restaurantOwners", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var ownerType, owners;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("get all restaurantOwners");
                        ownerType = req.params.userType;
                        return [4 /*yield*/, this.Admin.getAllRestaurantOwners(ownerType)];
                    case 1:
                        owners = _a.sent();
                        console.log("get all foodies finished");
                        res.status(200).send(owners);
                        return [2 /*return*/];
                }
            });
        }); });
        // get restaurantOwner by id
        router.get("/admin/restaurantOwners/:userID", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.params.userID;
                        return [4 /*yield*/, this.Admin.getUserByID(userId)];
                    case 1:
                        user = _a.sent();
                        console.log("in get route:", user);
                        res.status(200).send(user);
                        return [2 /*return*/];
                }
            });
        }); });
        // get all admins
        router.get("/admin/admins", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var adminType, admins;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("get all admins");
                        adminType = req.params.userType;
                        return [4 /*yield*/, this.Admin.getAllAdmins(adminType)];
                    case 1:
                        admins = _a.sent();
                        console.log("get all foodies finished");
                        res.status(200).send(admins);
                        return [2 /*return*/];
                }
            });
        }); });
        // get admin by id
        router.get("/admin/:userID", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.params.userID;
                        return [4 /*yield*/, this.Admin.getUserByID(userId)];
                    case 1:
                        user = _a.sent();
                        console.log("in get route:", user);
                        res.status(200).send(user);
                        return [2 /*return*/];
                }
            });
        }); });
        // update admin by id
        router.put("/admin/:userID", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, userBody, successOrNot;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.params.userID;
                        userBody = req.body;
                        return [4 /*yield*/, this.Admin.updateUserByID(userId, userBody)];
                    case 1:
                        successOrNot = _a.sent();
                        console.log("in update route:", successOrNot);
                        res.status(200).send(successOrNot);
                        return [2 /*return*/];
                }
            });
        }); });
        // delete admin by id
        router["delete"]("/admin/:userID", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.params.userID;
                        return [4 /*yield*/, this.Admin.deleteUserByID(userId)];
                    case 1:
                        user = _a.sent();
                        console.log("in delete route:", user);
                        res.status(200).send(user);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    return AdminRoute;
}());
exports.AdminRoute = AdminRoute;

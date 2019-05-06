"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Mongoose = require("mongoose");
var DataAccess_1 = require("../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var Q = require("q");
var UserModel = /** @class */ (function () {
    // the constructor of the model
    function UserModel() {
        this.createSchema();
        this.createModel();
    }
    // create user by user information
    UserModel.prototype.createUser = function (user) {
        var deferred = Q.defer();
        var res = false;
        if (this.model.find(user)) {
            console.error("User already exists");
        }
        else {
            // this part could be implemented in controller because it doesn't need
            // to access DB
            /* if (!this.checkUserProperty(user)) {
                console.error("Some information of the user you want to create is missing");
                return;
               }*/
            this.model(user).save(function (err) {
                if (err) {
                    console.error(err);
                }
                else {
                    res = true;
                }
                deferred.resolve(res);
            });
        }
        return deferred.promise;
    };
    // for each user they need to provide userID and password to LOGIN
    // payload: userID
    //          password
    UserModel.prototype.logInByIDAndPassword = function (payload) {
        var deferred = Q.defer();
        var query = this.model.find(payload.userID);
        if (!query) {
            console.error("User doesn't exist!");
        }
        else {
            if (payload.userID === 1) {
                console.error("Please sign up at first");
            }
            else {
                query.exec(function (err, user) {
                    if (err) {
                        console.error(err);
                    }
                    else {
                        deferred.resolve(user);
                    }
                });
            }
        }
        return deferred.promise;
    };
    // todo: log out*************************************
    // for each user they need to provide their userID to GET themselves
    // for admin he needs to provide user's userID to GET user
    UserModel.prototype.getUserByID = function (userId) {
        var deferred = Q.defer();
        var query = this.model.find({ userID: userId });
        var user = null;
        query.exec(function (err, users) {
            if (err) {
                console.error(err);
            }
            else if (users.length > 1) {
                console.error("Duplicate error in User");
            }
            else if (users.length === 1) {
                for (var _i = 0, users_1 = users; _i < users_1.length; _i++) {
                    var u = users_1[_i];
                    user = u;
                }
            }
            else {
                console.log("no result");
            }
            deferred.resolve(user);
        });
        return deferred.promise;
    };
    // for each user they need to provide their userID and the updated body to UPDATE themselves
    UserModel.prototype.updateUserByID = function (_a) {
        var userID = _a.userID, body = _a.body;
        var deferred = Q.defer();
        var res = false;
        this.model.findOneAndUpdate(userID, body, { "new": true }, function (err, user) {
            if (err) {
                console.error(err);
            }
            else {
                res = true;
            }
            deferred.resolve(res);
        });
        return deferred.promise;
    };
    // for each user they need to provide their userID to DELETE themselves
    // for admin he needs to provide user's userID to DELETE user
    UserModel.prototype.deleteUserByID = function (userId) {
        var deferred = Q.defer();
        var res = false;
        this.model.deleteOne({ userID: userId }, function (err) {
            if (err) {
                console.error(err);
            }
            else {
                res = true;
            }
            deferred.resolve(res);
        });
        return deferred.promise;
    };
    return UserModel;
}());
var FoodieModel = /** @class */ (function (_super) {
    __extends(FoodieModel, _super);
    function FoodieModel() {
        return _super.call(this) || this;
    }
    FoodieModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            userID: Number,
            userName: String,
            password: String,
            emailAddress: String,
            userType: Number,
            reviewList: [{
                    reviewID: Number
                }]
        }, { collection: "user" });
        this.schema.index({ userID: 1 }, { reviewList: null }, { unique: true });
    };
    FoodieModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("user", this.schema);
    };
    return FoodieModel;
}(UserModel));
exports.FoodieModel = FoodieModel;
var RestaurantOwnerModel = /** @class */ (function (_super) {
    __extends(RestaurantOwnerModel, _super);
    function RestaurantOwnerModel() {
        return _super.call(this) || this;
    }
    RestaurantOwnerModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            userID: Number,
            userName: String,
            password: String,
            emailAddress: String,
            userType: Number
        }, { collection: "user" });
    };
    RestaurantOwnerModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("user", this.schema);
    };
    return RestaurantOwnerModel;
}(UserModel));
exports.RestaurantOwnerModel = RestaurantOwnerModel;
var AdminModel = /** @class */ (function (_super) {
    __extends(AdminModel, _super);
    function AdminModel() {
        return _super.call(this) || this;
    }
    AdminModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            userID: Number,
            userName: String,
            password: String,
            emailAddress: String,
            userType: Number
        }, { collection: "user" });
    };
    AdminModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("user", this.schema);
    };
    AdminModel.prototype.getAllUsers = function () {
        var deferred = Q.defer();
        var query = this.model.find({});
        var users;
        query.exec(function (err, res) {
            if (err) {
                console.error(err);
            }
            else if (res.length > 0) {
                users = res;
            }
            else {
                console.log("no result");
            }
            deferred.resolve(users);
        });
        return deferred.promise;
    };
    AdminModel.prototype.getAllFoodies = function (foodieType) {
        var deferred = Q.defer();
        var query;
        var users;
        if (foodieType !== 1) {
            console.error("Wrong user type");
        }
        else {
            query = this.model.find({ userType: foodieType });
            query.exec(function (err, res) {
                if (err) {
                    console.error(err);
                }
                else if (res.length > 0) {
                    users = res;
                }
                else {
                    console.log("no result");
                }
                deferred.resolve(users);
            });
        }
        return deferred.promise;
    };
    AdminModel.prototype.getAllRestaurantOwners = function (ownerType) {
        var deferred = Q.defer();
        var query;
        var users;
        if (ownerType !== 2) {
            console.error("Wrong user type");
        }
        else {
            query = this.model.find({ userType: ownerType });
            query.exec(function (err, res) {
                if (err) {
                    console.error(err);
                }
                else if (res.length > 0) {
                    users = res;
                }
                else {
                    console.log("no result");
                }
                deferred.resolve(users);
            });
        }
        return deferred.promise;
    };
    return AdminModel;
}(UserModel));
exports.AdminModel = AdminModel;

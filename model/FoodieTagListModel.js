"use strict";
exports.__esModule = true;
var Mongoose = require("mongoose");
var DataAccess_1 = require("./../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var FoodieTagListModel = /** @class */ (function () {
    function FoodieTagListModel() {
        this.createSchema();
        this.createModel();
    }
    FoodieTagListModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            tagListID: Number,
            userID: Number,
            tagList: [{
                    tagID: Number
                }]
        }, { collection: "foodieTagList" });
    };
    FoodieTagListModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("foodieTagList", this.schema);
    };
    FoodieTagListModel.prototype.createTagList = function (response, payload) {
        var find = this.model.find(payload.userID);
        if (find) {
            response.send("You have already have a tag list!");
        }
        else {
            this.model.save(payload, function (err, newTagList) {
                if (err) {
                    response.send(err);
                }
                response.json(newTagList);
            });
        }
    };
    FoodieTagListModel.prototype.getTagListByFoodieID = function (response, userId) {
        var query = this.model.findOne(userId);
        query.exec(function (err, list) {
            response.json(list);
        });
    };
    FoodieTagListModel.prototype.updateTagListByFoodieID = function (response, userId, tagList) {
        this.model.findOneAndUpdate(userId, tagList, { "new": true }, function (err, newTagList) {
            if (err) {
                response.send(err);
            }
            response.json(newTagList);
        });
    };
    FoodieTagListModel.prototype.deleteTagListByAdminByFoodieID = function (response, adminId, foodieId) {
        this.model.remove(adminId, foodieId, function (err) {
            if (err) {
                response.send(err);
            }
            response.json({ message: "Successfully deleted " + foodieId + "'s tagList!" });
        });
    };
    return FoodieTagListModel;
}());
exports.FoodieTagListModel = FoodieTagListModel;

"use strict";
exports.__esModule = true;
var Mongoose = require("mongoose");
var DataAccess_1 = require("./../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var TagModel = /** @class */ (function () {
    function TagModel() {
        this.createSchema();
        this.createModel();
    }
    TagModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            tagID: Number,
            tagName: String
        }, { collection: "tag" });
    };
    TagModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("tag", this.schema);
    };
    TagModel.prototype.createTag = function (response, tag) {
        var find = this.model.find(tag);
        if (find) {
            response.send("Tag has already existed!");
        }
        else {
            this.model.save(tag, function (err, newTag) {
                if (err) {
                    response.send(err);
                }
                response.json(newTag);
            });
        }
    };
    TagModel.prototype.getAllTags = function (response) {
        var query = this.model.find({});
        query.exec(function (err, tagList) {
            response.json(tagList);
        });
    };
    TagModel.prototype.getTagByTagID = function (response, tagId) {
        var query = this.model.findOne(tagId);
        query.exec(function (err, tag) {
            response.json(tag);
        });
    };
    TagModel.prototype.updateTagByTagID = function (response, tagId) {
        this.model.findOneAndUpdate(tagId, { "new": true }, function (err, newTag) {
            if (err) {
                response.send(err);
            }
            response.json(newTag);
        });
    };
    TagModel.prototype.deleteTagByAdminByTagID = function (response, adminId, tagId) {
        this.model.remove(adminId, tagId, function (err) {
            if (err) {
                response.send(err);
            }
            response.json({ message: "Successfully deleted " + tagId + "'s tagList!" });
        });
    };
    return TagModel;
}());
exports.TagModel = TagModel;

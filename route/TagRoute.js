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
var TagModel_1 = require("../model/TagModel");
// creates and configures an ExpressJS web server.
var TagRoute = /** @class */ (function () {
    // run configuration methods on the Express instance.
    function TagRoute() {
        this.Tag = new TagModel_1.TagModel();
    }
    TagRoute.prototype.registerRoutes = function (router) {
        this.routes(router);
    };
    // configure API endpoints.
    TagRoute.prototype.routes = function (router) {
        var _this = this;
        // create Tag
        router.post("/tag/createTag", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var tag, successOrNot;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tag = req.body;
                        return [4 /*yield*/, this.Tag.createTag(res, tag)];
                    case 1:
                        successOrNot = _a.sent();
                        console.log("in create route:", successOrNot);
                        res.status(200).send(successOrNot);
                        return [2 /*return*/];
                }
            });
        }); });
        // get all tags
        router.get("/tag", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var tags;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("get all tags");
                        return [4 /*yield*/, this.Tag.getAllTags(res)];
                    case 1:
                        tags = _a.sent();
                        console.log("get all tags finished");
                        res.status(200).send(tags);
                        return [2 /*return*/];
                }
            });
        }); });
        // get tag by id
        router.get("/tag/:tagID", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var tagId, tag;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tagId = req.params.tagID;
                        return [4 /*yield*/, this.Tag.getTagByTagID(res, tagId)];
                    case 1:
                        tag = _a.sent();
                        console.log("in get route:", tag);
                        res.status(200).send(tag);
                        return [2 /*return*/];
                }
            });
        }); });
        // update tag by tagId
        router.put("/tag/:tagID", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var tagId, tagBody, successOrNot;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tagId = req.params.tagID;
                        tagBody = req.body;
                        return [4 /*yield*/, this.Tag.updateTagByTagID(res, tagId, tagBody)];
                    case 1:
                        successOrNot = _a.sent();
                        console.log("in update route:", successOrNot);
                        res.status(200).send(successOrNot);
                        return [2 /*return*/];
                }
            });
        }); });
        // delete tag by tagId
        router["delete"]("/tag/:tagID", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var tagId, adminId, tag;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tagId = req.params.tagID;
                        adminId = req.params.adminID;
                        return [4 /*yield*/, this.Tag.deleteTagByTagIDByAdmin(res, adminId, tagId)];
                    case 1:
                        tag = _a.sent();
                        console.log("in delete route:", tag);
                        res.status(200).send(tag);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    return TagRoute;
}());
exports.TagRoute = TagRoute;

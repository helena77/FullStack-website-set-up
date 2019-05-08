import Mongoose = require("mongoose");
import {DataAccess} from "./../DataAccess";
import { IFoodieTagListModel } from "../interfaces/IFoodieTagListModel";

let mongooseConnection: Mongoose.Connection = DataAccess.mongooseConnection;
let mongooseObj: any = DataAccess.mongooseInstance;
var Q: any = require("q");

class FoodieTagListModel {
    public schema: any;
    public model: any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                tagListID: {
                    type: Number,
                    required: true,
                    unique : true,
                },
                userID: {
                    type: Number,
                    required: true,
                    unique : true,
                },
                tagList: {
                    type: [Number],
                    required: true,
                },
            }, {collection: "foodieTagList"}
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IFoodieTagListModel>("foodieTagList", this.schema);
    }

    public createTagList(tagList: any): any {
        var deferred: any = Q.defer();
        var res: boolean = false;
        this.model(tagList).save(function (err: any): any {
            if(err) {
                console.error(err);
            } else {
                res = true;
            }
            deferred.resolve(res);
        });
        return deferred.promise;

    }

    public getTagListByFoodieID(userId: number): any {
        var deferred: any = Q.defer();
        var query: any = this.model.find({userID: userId});
        var list: any = null;
        query.exec((err: any, lists: any) => {
            if(err) {
                console.error(err);
            } else if (lists.length > 1) {
                console.error("Duplicate error in list");
            } else if (lists.length === 1) {
                for (let l of lists){
                    list = l;
                }
            } else {
                console.log("no result");
            }
            deferred.resolve(list);
        });
        return deferred.promise;
    }

    public updateTagListByFoodieID(userId: number, tagList: any): any {
        var deferred: any = Q.defer();
        var res: any = false;
        this.model.findOneAndUpdate({userID: userId}, tagList, { new: true }, function(err: any): any {
            if(err) {
                console.error(err);
            } else {
                res = true;
            }
            deferred.resolve(res);
        });
        return deferred.promise;
    }

    public deleteTagListByFoodieIDByAdmin(foodieId: number): any {
        var deferred: any = Q.defer();
        var res: any = false;
        this.model.deleteOne({userID: foodieId}, function(err: any): any{
            if(err) {
                console.error(err);
            } else {
                res = true;
            }
            deferred.resolve(res);
        });
        return deferred.promise;
    }
}
export {FoodieTagListModel};
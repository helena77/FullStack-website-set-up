import * as path from "path";
import * as express from "express";
import * as logger from "morgan";
import * as mongodb from "mongodb";
import * as url from "url";
import * as bodyParser from "body-parser";
import { Router } from "express-serve-static-core";
import { FoodieTagListModel } from "../model/FoodieTagListModel";


// creates and configures an ExpressJS web server.
class FoodieTagListRoute {

    public TagList: FoodieTagListModel;

    // run configuration methods on the Express instance.
    constructor() {
        this.TagList = new FoodieTagListModel();
    }

    public registerRoutes(router: express.Router): void {
        this.routes(router);
    }

    // configure API endpoints.
    private routes(router: Router): void {
        // create TagList
        router.post("/foodie/:userID/createTagList", async (req, res) => {
            var list: any = req.body;
            var successOrNot: boolean = await this.TagList.createTagList(res, list);
            console.log("in create route:", successOrNot);
            res.status(200).send(successOrNot);
        });

        // get list by userId
        router.get("/foodie/:userID", async (req, res) => {
            var userId: number = req.params.userID;
            var list: any = await this.TagList.getTagListByFoodieID(res, userId);
            console.log("in get route:", list);
            res.status(200).send(list);
        });

        // update list by userId
        router.put("/foodie/:userID/editTagList", async (req, res) => {
            var userId: number = req.params.userID;
            var listBody: any = req.body;
            var successOrNot: boolean = await this.TagList.updateTagListByFoodieID(res, userId, listBody);
            console.log("in update route:", successOrNot);
            res.status(200).send(successOrNot);
        });

        // delete list by userId
        router.delete("/foodie/:userID",async (req, res) => {
            var adminId: number = req.params.adminId;
            var foodieId: number = req.params.foodieId;
            var user: any = await this.TagList.deleteTagListByFoodieIDByAdmin(res, adminId, foodieId);
            console.log("in delete route:", user);
            res.status(200).send(user);
        });
    }
}
export {FoodieTagListRoute};
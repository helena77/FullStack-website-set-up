import * as express from "express";
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
        router.post("/tagList", (req, res) => {
            var list: any = req.body;
            console.log(list);
            this.TagList.createTagList(res, list);
        });

        // get all list
        router.get("/tagList", (res) => {
            console.log("get all tags");
            this.TagList.getAllTagLists(res);
        });

        // get list by userId
        router.get("/tagList/:userID", (req, res) => {
            var userId: number = req.params.userID;
            console.log("get foodieTagList by userId:", userId);
            this.TagList.getTagListByFoodieID(res, userId);
        });

        // get list by listId
        router.get("/tagList/:listId", (req, res) => {
            var listId: number = req.params.tagListID;
            console.log("get foodieTagList by listId:", listId);
            this.TagList.getTagListByListID(res, listId);
        });

        // update list by userId
        router.put("/tagList/:userID",  (req, res) => {
            var userId: number = req.params.userID;
            var listBody: any = req.body;
            console.log("update taglist by userID:", userId);
            this.TagList.updateTagListByFoodieID(res, userId, listBody);
        });

        // delete list by userId
        router.delete("/tagList/:userID", (req, res) => {
            var userId: number = req.params.userID;
            console.log("delete tagList by userID:", userId);
            this.TagList.deleteTagListByFoodieID(res, userId);
        });
    }
}
export {FoodieTagListRoute};
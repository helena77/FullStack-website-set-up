import * as path from "path";
import * as express from "express";
import * as logger from "morgan";
import * as mongodb from "mongodb";
import * as url from "url";
import * as bodyParser from "body-parser";
import { Router } from "express-serve-static-core";
import { TagModel } from "../model/TagModel";
import { ITagModel } from "../interfaces/ITagModel";


// creates and configures an ExpressJS web server.
class TagRoute {

    public Tag: TagModel;

    // run configuration methods on the Express instance.
    constructor() {
        this.Tag = new TagModel();
    }

    public registerRoutes(router: express.Router): void {
        this.routes(router);
    }

    // configure API endpoints.
    private routes(router: Router): void {
        // create Tag
        router.post("/tag/createTag", async (req, res) => {
            var tag: any = req.body;
            var successOrNot: boolean = await this.Tag.createTag(res, tag);
            console.log("in create route:", successOrNot);
            res.status(200).send(successOrNot);
        });

        // get all tags
        router.get("/tag", async (req, res) => {
            console.log("get all tags");
            var tags: ITagModel[] = await this.Tag.getAllTags(res);
            console.log("get all tags finished");
            res.status(200).send(tags);
        });

        // get tag by id
        router.get("/tag/:tagID", async (req, res) => {
            var tagId: number = req.params.tagID;
            var tag: any = await this.Tag.getTagByTagID(res, tagId);
            console.log("in get route:", tag);
            res.status(200).send(tag);
        });

        // update tag by tagId
        router.put("/tag/:tagID", async (req, res) => {
            var tagId: number = req.params.tagID;
            var tagBody: any = req.body;
            var successOrNot: boolean = await this.Tag.updateTagByTagID(res, tagId, tagBody);
            console.log("in update route:", successOrNot);
            res.status(200).send(successOrNot);
        });

        // delete tag by tagId
        router.delete("/tag/:tagID",async (req, res) => {
            var tagId: number = req.params.tagID;
            var adminId: number = req.params.adminID;
            var tag: any = await this.Tag.deleteTagByTagIDByAdmin(res, adminId, tagId);
            console.log("in delete route:", tag);
            res.status(200).send(tag);
        });
    }
}
export {TagRoute};
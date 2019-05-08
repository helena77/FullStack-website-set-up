import * as path from "path";
import * as express from "express";
import * as logger from "morgan";
import * as bodyParser from "body-parser";
import { Router } from "express-serve-static-core";
import { FoodieRoute, RestaurantOwnerRoute, AdminRoute } from "./route/UserRoute";
import { FoodieTagListRoute } from "./route/FoodieTagListRoute";
import { TagRoute } from "./route/TagRoute";


// creates and configures an ExpressJS web server.
class App {

    // ref to Express instance
    public expressApp: express.Application;

    // run configuration methods on the Express instance.
    constructor() {
        this.expressApp = express();
        this.middleware();
        this.routes();
    }

    // configure Express middleware.
    private middleware(): void {
        this.expressApp.use(logger("dev"));
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    }

    // configure API endpoints.
    private routes(): void {
        let router: Router = express.Router();

        // add user routes
        this.addRoutes(router);

        this.expressApp.use("/", router);
        this.expressApp.use("/app/json/", express.static(__dirname+"/app/json"));
        this.expressApp.use("/images", express.static(__dirname+"/img"));
        this.expressApp.use("/", express.static(__dirname+"/pages"));
    }

    private addRoutes(router: Router): void {
        var foodie: any = new FoodieRoute();
        foodie.registerRoutes(router);
        var restaurantOwner: any = new RestaurantOwnerRoute();
        restaurantOwner.registerRoutes(router);
        var admin: any = new AdminRoute();
        admin.registerRoutes(router);
        var foodieTagList: any = new FoodieTagListRoute();
        foodieTagList.registerRoutes(router);
        var tag: any = new TagRoute();
        tag.registerRoutes(router);
    }

}

export {App};
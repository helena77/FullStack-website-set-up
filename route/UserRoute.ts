import * as path from "path";
import * as express from "express";
import * as logger from "morgan";
import * as mongodb from "mongodb";
import * as url from "url";
import * as bodyParser from "body-parser";
import { FoodieModel, RestaurantOwnerModel, AdminModel } from "../model/UserModel";
import { Router } from "express-serve-static-core";
import { IUserModel } from "../interfaces/IUserModel";
import { IFoodieModel } from "../interfaces/IFoodieModel";


// creates and configures an ExpressJS web server.
class FoodieRoute {

    public Foodie: FoodieModel;

    // run configuration methods on the Express instance.
    constructor() {
        this.Foodie = new FoodieModel();
    }

    public registerRoutes(router: express.Router): void {
        this.routes(router);
    }

    // configure API endpoints.
    private routes(router: Router): void {
        // get unauthenticated page before log in
        router.get("/", async (req, res) => {
            res.status(200).send();
        });

        // get login page
        router.get("/login", async (req, res) => {
            var userPayload: any = req;
            var user: any = await this.Foodie.logInByIDAndPassword(userPayload);
            console.log("in get route:", user);
            res.status(200).send(user);
        });

        // create foodie
        router.post("/foodie", async (req, res) => {
            var user: any = req.body;
            var successOrNot: boolean = await this.Foodie.createUser(user);
            console.log("in create route:", successOrNot);
            res.status(200).send(successOrNot);
        });

        // get foodie by id
        router.get("/foodie/:userID", async (req, res) => {
            var userId: any = req.params.userID;
            var user: any = await this.Foodie.getUserByID(userId);
            console.log("in get route:", user);
            res.status(200).send(user);
        });

        // update foodie by id
        router.put("/foodie/:userID",async (req, res) => {
            var userId: any = req.params.userID;
            var userBody: any = req.body;
            var successOrNot: boolean = await this.Foodie.updateUserByID(userId, userBody);
            console.log("in update route:", successOrNot);
            res.status(200).send(successOrNot);
        });

        // delete foodie by id
        router.delete("/foodie/:userID",async (req, res) => {
            var userId: any = req.params.userID;
            var user: any = await this.Foodie.deleteUserByID(userId);
            console.log("in delete route:", user);
            res.status(200).send(user);
        });
    }
}
export {FoodieRoute};

class RestaurantOwnerRoute {

    public Owner: RestaurantOwnerModel;

    // run configuration methods on the Express instance.
    constructor() {
        this.Owner = new RestaurantOwnerModel();
    }

    public registerRoutes(router: express.Router): void {
        this.routes(router);
    }

    // configure API endpoints.
    private routes(router: Router): void {
        // get unauthenticated page before log in
        router.get("/", async (req, res) => {
            res.status(200).send();
        });

        // get login page
        router.get("/login", async (req, res) => {
            var userPayload: any = req;
            var user: any = await this.Owner.logInByIDAndPassword(userPayload);
            console.log("in get route:", user);
            res.status(200).send(user);
        });

        // create foodie
        router.post("/restaurantOwner", async (req, res) => {
            var user: any = req.body;
            var successOrNot: boolean = await this.Owner.createUser(user);
            console.log("in create route:", successOrNot);
            res.status(200).send(successOrNot);
        });

        // get foodie by id
        router.get("/restaurantOwner/:userID", async (req, res) => {
            var userId: any = req.params.userID;
            var user: any = await this.Owner.getUserByID(userId);
            console.log("in get route:", user);
            res.status(200).send(user);
        });

        // update foodie by id
        router.put("/restaurantOwner/:userID",async (req, res) => {
            var userId: any = req.params.userID;
            var userBody: any = req.body;
            var successOrNot: boolean = await this.Owner.updateUserByID(userId, userBody);
            console.log("in update route:", successOrNot);
            res.status(200).send(successOrNot);
        });

        // delete foodie by id
        router.delete("/restaurantOwner/:userID",async (req, res) => {
            var userId: any = req.params.userID;
            var user: any = await this.Owner.deleteUserByID(userId);
            console.log("in delete route:", user);
            res.status(200).send(user);
        });
    }
}
export {RestaurantOwnerRoute};

class AdminRoute {

    public Admin: AdminModel;

    // run configuration methods on the Express instance.
    constructor() {
        this.Admin = new AdminModel();
    }

    public registerRoutes(router: express.Router): void {
        this.routes(router);
    }

    // configure API endpoints.
    private routes(router: Router): void {
        // get unauthenticated page before log in
        router.get("/", async (req, res) => {
            res.status(200).send();
        });

        // get login page
        router.get("/login", async (req, res) => {
            var userPayload: any = req;
            var user: any = await this.Admin.logInByIDAndPassword(userPayload);
            console.log("in get route:", user);
            res.status(200).send(user);
        });

        // create admin
        router.post("/admin", async (req, res) => {
            var user: any = req.body;
            var successOrNot: boolean = await this.Admin.createUser(user);
            console.log("in create route:", successOrNot);
            res.status(200).send(successOrNot);
        });

        // get all users
        router.get("/admin/users", async (req, res) => {
            console.log("get all users");
            var users: IUserModel[] = await this.Admin.getAllUsers();
            console.log("get all users finished");
            res.status(200).send(users);
        });

        // get all foodies
        router.get("/admin/foodies", async (req, res) => {
            console.log("get all foodies");
            var foodieType: number = req.params.userType;
            var foodies: IFoodieModel[] = await this.Admin.getAllFoodies(foodieType);
            console.log("get all foodies finished");
            res.status(200).send(foodies);
        });

        // get foodie by id
        router.get("/admin/foodies/:userID", async (req, res) => {
            var userId: any = req.params.userID;
            var user: any = await this.Admin.getUserByID(userId);
            console.log("in get route:", user);
            res.status(200).send(user);
        });

        // get all restaurantOwners
        router.get("/admin/restaurantOwners", async (req, res) => {
            console.log("get all restaurantOwners");
            var ownerType: number = req.params.userType;
            var owners: IUserModel[] = await this.Admin.getAllRestaurantOwners(ownerType);
            console.log("get all foodies finished");
            res.status(200).send(owners);
        });

        // get restaurantOwner by id
        router.get("/admin/restaurantOwners/:userID", async (req, res) => {
            var userId: any = req.params.userID;
            var user: any = await this.Admin.getUserByID(userId);
            console.log("in get route:", user);
            res.status(200).send(user);
        });

        // get all admins
        router.get("/admin/admins", async (req, res) => {
            console.log("get all admins");
            var adminType: number = req.params.userType;
            var admins: IUserModel[] = await this.Admin.getAllAdmins(adminType);
            console.log("get all foodies finished");
            res.status(200).send(admins);
        });

        // get admin by id
        router.get("/admin/:userID", async (req, res) => {
            var userId: any = req.params.userID;
            var user: any = await this.Admin.getUserByID(userId);
            console.log("in get route:", user);
            res.status(200).send(user);
        });

        // update admin by id
        router.put("/admin/:userID",async (req, res) => {
            var userId: any = req.params.userID;
            var userBody: any = req.body;
            var successOrNot: boolean = await this.Admin.updateUserByID(userId, userBody);
            console.log("in update route:", successOrNot);
            res.status(200).send(successOrNot);
        });

        // delete admin by id
        router.delete("/admin/:userID",async (req, res) => {
            var userId: any = req.params.userID;
            var user: any = await this.Admin.deleteUserByID(userId);
            console.log("in delete route:", user);
            res.status(200).send(user);
        });
    }
}
export {AdminRoute};
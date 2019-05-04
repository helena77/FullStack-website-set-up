import Mongoose = require("mongoose");
import {DataAccess} from "../DataAccess";
import {IUserModel} from "../interfaces/IUserModel";

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class UserModel {
    public schema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                userID: Number,
                userName: String,
                password: String,
                emailAddress: String,
<<<<<<< HEAD
            }, {collection: "user"}
=======
                userType: Number,
            }, {collection: 'user'}
>>>>>>> 2dda9e54f99bfdf8e9f1de60aa01ab48eba72a7e
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IUserModel>("user", this.schema);
    }

    public retrieveAllUsers(response:any): any {
        var query = this.model.find({});
        query.exec( (err, itemArray) => {
            response.json(itemArray) ;
        });
    }
}
export {UserModel};
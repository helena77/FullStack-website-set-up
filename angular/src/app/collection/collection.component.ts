import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CollectionService } from '../services/collection.service';
import { RestaurantService } from '../services/restaurant.service';
import { Subscription } from 'rxjs';
// import { MessageService } from '../message.service';
import { AuthService } from '../services/auth.service';
import { Router  , ActivatedRoute } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { ProfileComponent } from '../profile/profile.component';
import { IFavoriteListModel } from '../interfaces/IFavoriteListModel';
import { IRestaurantModel } from '../interfaces/IRestaurantModel';
@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})

export class CollectionComponent implements OnInit {
  user: object;
  userID: number;
  favoriateList: IFavoriteListModel;
  restaurantIDList: number[] = [];
  restaurants: IRestaurantModel[] = [];
  // used to update collection
  newrestaurantIDList: number[] = [];

  constructor(private collectionData: CollectionService,
              private restaurantData: RestaurantService,
              private auth: AuthService) { 
                this.auth.getSession().subscribe(data => {
                  this.userID = data.userID;
                  console.log("profile: " + JSON.stringify(data)); 
                })
              }

  ngOnInit() {
    // get the collection by favoriateListID
    this.collectionData.getCollectionByListID(3).subscribe(data => {
      this.favoriateList = data;
      this.restaurantIDList = this.favoriateList[0].restaurantIDList;
      console.log('favoriateList: ', this.favoriateList);

      // get every restaurant in the favoriateList
      for (let each of this.restaurantIDList) {
        // console.log('each: ', each);
        this.restaurantData.getByID(each).subscribe(restaurant => {
          this.restaurants.push(restaurant);
          console.log('restaurant: ', restaurant);
        });
      }
    });
  }

  // add new restaurant to this collection
  addRestaurantToCollection(restaurantId: number) {
    this.restaurantIDList.push(restaurantId);
    console.log('restaurantIDList: ', this.restaurantIDList);
    if (restaurantId !== null ) {
      const body = {
        favoriteListID: this.favoriateList[0].favoriteListID,
        userID: this.favoriateList[0].userID,
        restaurantIDList: this.restaurantIDList
      };
      console.log('favorite list id: ', this.favoriateList[0].favoriteListID);
      console.log('new list object: ', body);
      this.collectionData.updateCollectionByListID(this.favoriateList[0].favoriteListID, body);
    } else {
      console.log('restaurantID is null');
    }
  }

  // delete restaurant from this collection
  deleteRestaurantFromCollection(restaurantId: number) {
    // find the restaurantID in the list and remove it
    this.restaurantIDList.splice(this.restaurantIDList.indexOf(restaurantId), 1);
    if (restaurantId !== null ) {
      const body = {
        favoriteListID: this.favoriateList[0].favoriteListID,
        userID: this.favoriateList[0].userID,
        restaurantIDList: this.restaurantIDList
      };
      console.log('new list: ', body);
      this.collectionData.updateCollectionByListID(this.favoriateList[0].favoriteListID, body);
    } else {
      console.log('restaurantID is null');
    }
  }
}

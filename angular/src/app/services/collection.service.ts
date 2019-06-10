import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { IRestaurantModel } from '../interfaces/IRestaurantModel';
import { IFavoriteListModel } from '../interfaces/IFavoriteListModel';
@Injectable({
	providedIn: 'root'
})
export class CollectionService {
  private favoriateListUrl = '/favoriteList/';
  constructor(private http: HttpClient) { }

	// get collection by favoriteListID
	getCollectionByListID(listID: number): Observable<IFavoriteListModel> {
		console.log(listID);
		return this.http.get<IFavoriteListModel>(this.favoriateListUrl + listID);
	}

	// add restaurant to the collection
	updateCollectionByListID(listID: number, newList: object) {
		const url = this.favoriateListUrl + listID;
		return this.http.put(url, newList).subscribe(res => console.log('updated'));
	// add restaurant to the collection of the user
	addCollection(userID: number, restaurantID: number): Observable<boolean> {
		let successOrNot = new Subject<boolean>();
		const url = this.favoriateListUrl + 'user/' + userID;
		this.http.get<IFavoriteListModel[]>(url)
			.subscribe(favoriteList => {
				let exist = false;
				if (favoriteList.length > 0) {
					let restaurants = favoriteList[0].restaurantIDList;
					for (let i = 0; i < restaurants.length; i++) {
						if (restaurants[i] === restaurantID) {
							exist = true;
							break;
						}
					}
				}
				if (!exist) {
					//no record
					if (favoriteList.length === 0) {
						const body = {
							"userID": userID,
							"restaurantIDList": [restaurantID]
						};
						this.http.post(this.favoriateListUrl, body)
							.subscribe(res => {
								console.log("create result:" + res);
								successOrNot.next(true);
							});
					}
					else {
						favoriteList[0].restaurantIDList.push(restaurantID);
						const body = {
							"userID": userID,
							"restaurantIDList": favoriteList[0].restaurantIDList
						};
						this.http.put(this.favoriateListUrl, body)
							.subscribe(res => {
								console.log("create result:" + res);
								successOrNot.next(true);
							});
					}
				}
				else {
					console.log('already exist');
					successOrNot.next(false);
				}
			})
			;
		return successOrNot.asObservable();
	}

}

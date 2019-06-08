import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IRestaurantModel } from '../interfaces/IRestaurantModel';
import { IFavoriteListModel } from '../interfaces/IFavoriteListModel';
@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  private favoriateListUrl = 'http://localhost:8080/favoriteList/';
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
	}
}

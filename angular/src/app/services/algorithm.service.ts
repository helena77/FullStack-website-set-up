import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRestaurantTagListModel } from '../interfaces/IRestaurantTagListModel';
@Injectable({
  providedIn: 'root'
})
export class AlgorithmService {
  private rtagListUrl = 'http://localhost:8080/rtags/';
  private rtags: IRestaurantTagListModel[];
  private score: any;
  constructor(private http: HttpClient) {
    this.getAllRtag().subscribe(res => {
      this.rtags = res;
      this.score = new Array(this.rtags.length).fill(0);
    });
  }

  getAllRtag(): Observable<IRestaurantTagListModel[]> {
    return this.http.get<IRestaurantTagListModel[]>(this.rtagListUrl);
  }

  // step to get the recommendation
  // 1. get user taglist
  // 2. get each restaurant's score
  // 3. get the top 3 restaurants
  /********************************/
  // step to get the score
  // 1. add the vote of each tag by 1 to avoid 0 (smoothing)
  // 2. get the score for one tag, formula: 1 + log(votenumber)
  // 3. add the score of all tags to get the final score of that restaurant
  // 4. rank the score, get the top 3
  /********************************/
  // weighting to different priorities:
  // 1 ------ * 2.2
  // 2 ------ * 2.0
  // 3 ------ * 1.8
  // 8 ------ * 0.8
  getRecommandationByTaglist(taglist: number[]) {
    // calculate score of restaurant one by one
    console.log('inside the algorithm: ', taglist);
    let totalScore: number;
    let priority: number;
    let weightingRate: number;
    let restaurantNumber: number = 0;
    // console.log('rtags: ', this.rtags);
    // calculate socre of each restaurant
    for (let eachRtagModel of this.rtags) {
      console.log('eachRtagModel: ', eachRtagModel);
      totalScore = 0;
      weightingRate = 2.2;
      // calculate score of each tag
      for (let i = 0; i < taglist.length; i++) {
        priority = taglist.indexOf(i + 1);
        console.log('priority: ', priority);
        // totalScore = totalScore + (1 + Math.log10((eachRtagModel.rtagList[priority] + 1) * weightingRate));
        console.log('totalScore: ', totalScore);
        totalScore = totalScore + (1 + Math.log10(eachRtagModel.rtagList[priority] + 1)) * weightingRate;
        // the weightingRate for each priority decreased by 0.2
        weightingRate = weightingRate - 0.2;
        console.log('weightingRate: ', weightingRate);
      }
      // console.log('outside for loop');
      this.score[restaurantNumber] = totalScore;
      console.log('this score: ', this.score[restaurantNumber]);
      restaurantNumber = restaurantNumber + 1;
      console.log("restaurant: ", eachRtagModel.restaurantID + " score is : " + totalScore);
    }

    return this.score;
  }
}

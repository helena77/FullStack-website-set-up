import { Component, OnInit } from '@angular/core';
import { TagSelectionService } from '../services/tag-selection.service';
import { Router } from '@angular/router';
import { AlgorithmService } from '../services/algorithm.service';
import { RestaurantService } from '../services/restaurant.service';
import { IRestaurantModel } from '../interfaces/IRestaurantModel';
const NUMBER_OF_RESTAURANTS = 3; // return top 3 restaurants
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  //private searchUrl = 'search';
  //private url = 'filter';
  public isCollapse: boolean;
  clickCount: number;
  isSubmit: boolean = false;
  tagList: any;
  public newList = [];
  public score: number[];
  public topThreeRestaurant: IRestaurantModel[] = [];
  private topThreeRestaurantID = [-1, -1, -1];
  constructor(private tagSelectionService: TagSelectionService,
              private router: Router, private algorithmService: AlgorithmService,
              private restaurantService: RestaurantService) {
  }

  ngOnInit() {
      this.tagSelectionService.getAllTags().subscribe(
        res => {
          this.tagList = res;
          this.isCollapse = false;
          this.clickCount = 0;
        });
  }

  onClick() {
    this.clickCount++;
    if (this.clickCount % 2 !== 0) {
      this.isCollapse = true;
    } else {
      this.isCollapse = false;
    }
  }

  onSubmit(f) {
    this.isSubmit = true;
    console.log(f.value);
    // tslint:disable-next-line:forin
    for (const key in f.value) {
      const value = f.value[key];
      const num = +value;
      this.newList.push(num);
    }
    console.log(this.newList);
    this.score = this.algorithmService.getRecommandationByTaglist(this.newList);
    console.log(this.score);
    this.getTopThreeRestaurants();
  }

  getTopThreeRestaurants() {
    let i;
    let first = -1;
    let second = -1;
    let third = -1;
    console.log('inside the top 3: ', this.score);
    // if the current element is greater than first
    for ( i = 0; i < this.score.length; i++) {
      if (this.score[i] > first) {
        third = second;
        second = first;
        first = this.score[i];
      } 
      // if score[i] is in between first and second then update second
      else if (this.score[i] > second) {
        third = second;
        second = this.score[i];
      }
      else if (this.score[i] > third) {
        third = this.score[i];
      }
    }
    this.topThreeRestaurantID[0] = this.score.indexOf(first) + 1;
    this.topThreeRestaurantID[1] = this.score.indexOf(second) + 1;
    this.topThreeRestaurantID[2] = this.score.indexOf(third) + 1;
    console.log('top three restaurant ID: ', this.topThreeRestaurantID);
    console.log('top three restaurant ID: ' + first + " " + second + " " + third);
    // get the information of the top three restaurants
    for (let j = 0; j < NUMBER_OF_RESTAURANTS; j++) {
      this.restaurantService.getByID(this.topThreeRestaurantID[j]).subscribe(
        result => {
          this.topThreeRestaurant.push(result);
        }
      );
    }
    console.log("top three restaurant: ", this.topThreeRestaurant);
  }
}

import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import {UserService} from '../../services/user/user.service';
import {SharedService} from '../../services/shared.service';
import { SearchService } from '../../services/search/search.service';
import { Result } from 'src/app/models/result';
import { Results } from 'src/app/models/results';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {
  
  private searching: boolean = false;

  searchSubcription!: Subscription;
  //get search input field
  @ViewChild('search', {static: true}) search!: ElementRef;

  /**
   * set data for users observable
   *
   * @param UserService
   * @param SearchService
   * @param SharedService
   */
  constructor(private github: SearchService, private user: UserService, private sharedService: SharedService) {}

  /**
   * perform search on after page load
   */
  ngAfterViewInit(): void {
    this.getSearch();
  }

  /**
   * perform search on text field keyup event
   */
  getSearch(): void {
    this.searchSubcription = fromEvent<any>(this.search.nativeElement, 'keyup').pipe(
      debounceTime(1000),
      map(event => event.target.value),
      distinctUntilChanged(),
      switchMap(val => this.github.search(val))).subscribe(data => {
        this.searching = true;
        let users: User[] = [];
        this.sharedService.clearUserData();
        this.sharedService.setSearchStatus(true);
        //set action status on observable for user feedback
        this.sharedService.setSearching('Searching user');
        //set search field value on observable
        this.sharedService.setSearchQuery(this.search.nativeElement.value);
        // check if search query match any data
        if(data.items.length == 0) {
          //if no record, update the searching state observable to change status message in real time
          this.sharedService.clearUserData();
          this.sharedService.setSearching('No record found for your query!');
        }
        //pass search result data to observable
        this.sharedService.setSearchResult(data.items.length);
        //count result and fetch user profile from search result
        data.items.forEach((result: Result) => {
          this.user.profile(result).subscribe((user: User) => {
            users.push(user);
          },(error: any) => {
            console.log('User Error Interceptor ', error)
             //Handle the error here
             //If not handled, then throw it
             throw error; 
          });
        });
        //pass user data to observable
        this.sharedService.setUserData(users);
      },(error: any) => {
        console.log('Search Error Interceptor ', error)
         //Handle the error here
         //If not handled, then throw it
         throw error; 
      }
    );
  }

}

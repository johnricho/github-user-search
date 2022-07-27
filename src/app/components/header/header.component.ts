import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import {UserService} from '../../services/user/user.service';
import {SharedService} from '../../services/shared.service';
import { SearchService } from '../../services/search/search.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  
  public searching = false;

  @ViewChild('search', {static: true}) search!: ElementRef;

  searchSubcription!: Subscription;


  constructor(private github: SearchService, private user: UserService, private sharedService: SharedService) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.getSearch();
  }

  getSearch(): void {
    this.searchSubcription = fromEvent<any>(this.search.nativeElement, 'keyup').pipe(
      debounceTime(1000),
      map(event => event.target.value),
      distinctUntilChanged(),
      switchMap(val => this.github.search(val))).subscribe(data => {
      this.searching = true;
      let users: Array<User> = [];
      this.sharedService.setSearchStatus(true);
      this.sharedService.setSearching('Searching user...');
      this.sharedService.setSearchQuery(this.search.nativeElement.value);

      if(data.items.length == 0) {
        this.sharedService.setSearching('No record found for your query!');
      }

      this.sharedService.setSearchResult(data.items.length);
      data.items.forEach((user: User) => {
        this.user.profile(user).subscribe(profile => {
          users.push(profile);
        });
      });
      
      this.sharedService.setUserData(users);
    });
  }

}

import { NgModule } from '@angular/core';
import {SharedService} from '../../services/shared.service';
import { Component, OnInit } from '@angular/core';
import { AppModule } from 'src/app/app.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class SearchBoxComponent implements OnInit {
  public page: number = 1;
  public users: any[] = [];
  public query: String = '';
  public result: number = 0;
  public current: number = 0;
  public perPage: number = 7;
  public loading: String = '';
  public searching:boolean = false;

  constructor(private sharedService: SharedService) {
    this.sharedService.getUserData().subscribe(data => {
      this.users = data;
    });
   }

  ngOnInit(): void {
    this.sharedService.searching().subscribe(data => {
        this.loading = data;
    });
    this.sharedService.searchStatus().subscribe(data => {
        this.searching = data;
    });
    this.sharedService.searchResult().subscribe(data => {
        this.result = data;
        this.current = (this.perPage < data? this.page * this.perPage: 0);
    });
    this.sharedService.searchQuery().subscribe(data => {
      this.query = data;
    });
  }
  pageChanged(event: number) {
    this.page = event;
    this.current = (this.perPage < this.result? this.page * this.perPage: 0);
  }

}

import { NgModule } from '@angular/core';
import {SharedService} from '../../services/shared.service';
import { Component, OnInit } from '@angular/core';
import { AppModule } from 'src/app/app.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  public page: number = 1;
  public from: number = 0;
  public users: any[] = [];
  public query: string = '';
  public result: number = 0;
  public current: number = 0;
  public perPage: number = 10;
  public loading: string = '';
  public searching:boolean = false;
  
  /**
   * inject needed services into the constructor
   *
   * @param SharedService
   */
  constructor(private sharedService: SharedService) {
    this.sharedService.getUserData().subscribe(data => {
      this.users = data;
    });
   }

  /**
   * inject needed services into the constructor
   *
   * @param SharedService
   */
  ngOnInit(): void {
    this.sharedService.searching().subscribe(data => {
        this.loading = data;
    });

    this.sharedService.searchStatus().subscribe(data => {
        this.searching = data;
    });

    this.sharedService.searchResult().subscribe(data => {
        this.result = data;
        //calculate current page starting point
        this.from = (((this.page * this.perPage) - this.perPage) + 1);
        //calculate current page total
        this.current = (this.perPage < this.result && (this.page * this.perPage) < this.result ? this.page * this.perPage: this.result);
    });

    this.sharedService.searchQuery().subscribe(data => {
      this.query = data;
    });
  }
  
  /**
   * handle pagination page changed event
   *
   * @param event
   */
  pageChanged(event: number) {
    this.page = event;
    //update current page starting point
    this.from = (((this.page * this.perPage) - this.perPage) + 1);
    //calculate current page total
    this.current = (this.perPage < this.result && (this.page * this.perPage) < this.result ? this.page * this.perPage: this.result);
  }

}

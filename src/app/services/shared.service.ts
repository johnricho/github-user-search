import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  
  constructor() { }
  private users = new Subject<any>();
  private result = new Subject<number>();
  private message = new Subject<string>();
  private searchText = new Subject<string>();
  private searchState = new Subject<boolean>();

  setUserData(data: User[]): void {
    this.users.next(data);
  }

  getUserData(): Observable<any> {
    return this.users.asObservable();
  }

  searchStatus(): Observable<boolean> {
    return this.searchState.asObservable();
  }
  
  setSearchStatus(status: boolean): void {
    this.searchState.next(status);
  }

  searchResult(): Observable<number> {
    return this.result.asObservable();
  }
  
  setSearchResult(data: number): void {
    this.result.next(data);
  }

  searchQuery(): Observable<string> {
    return this.searchText.asObservable();
  }
  
  setSearchQuery(query: string): void {
    this.searchText.next(query);
  }

  searching(): Observable<string> {
    return this.message.asObservable();
  }
  
  setSearching(message: string): void {
    this.message.next(message);
  }
}

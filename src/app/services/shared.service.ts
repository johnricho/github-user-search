import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  
  /**
   * observable subject properties
   */
  private users = new Subject<any>();
  private result = new Subject<number>();
  private message = new Subject<string>();
  private searchText = new Subject<string>();
  private searchState = new Subject<boolean>();

  /**
   * set data for users observable
   *
   * @param User
   */
   setUserData(data: User[]): void {
    this.users.next(data);
  }

  /**
   * set data for users observable
   *
   * @param User
   */
  clearUserData(): void {
    this.users.next([]);
  }

  /**
   * get users observable data
   */
  getUserData(): Observable<User[]> {
    return this.users.asObservable();
  }  

  /**
   * get search state observable
   */
  searchStatus(): Observable<boolean> {
    return this.searchState.asObservable();
  }
  
  /**
   * set data for search state observable
   *
   * @param status
   */
  setSearchStatus(status: boolean): void {
    this.searchState.next(status);
  }

  /**
   * get search result length observable
   */
  searchResult(): Observable<number> {
    return this.result.asObservable();
  }

  /**
   * set data for result observable
   *
   * @param result
   */
  setSearchResult(result: number): void {
    this.result.next(result);
  }

  /**
   * get seach query observable data
   */
  searchQuery(): Observable<string> {
    return this.searchText.asObservable();
  }

  /**
   * set data for query text observable
   *
   * @param query
   */
  setSearchQuery(query: string): void {
    this.searchText.next(query);
  }

  /**
   * get search status message observable data
   */
  searching(): Observable<string> {
    return this.message.asObservable();
  }
  
  /**
   * set data for searching status message observable
   *
   * @param message
   */
  setSearching(message: string): void {
    this.message.next(message);
  }

  /**
   * watch error and sync error from service
   */
  error(): Observable<string> {
    return this.message.asObservable();
  }
  
  /**
   * set error message for observable
   *
   * @param message
   */
  setError(message: string): void {
    this.message.next(message);
  }

}

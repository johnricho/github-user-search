import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { merge, Observable, ReplaySubject, throwError, EMPTY} from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user';



@Injectable({
  providedIn: 'root'
})

export class UserService {
  private url = environment.url;
  private _user: ReplaySubject<User> = new ReplaySubject<User>(1);

  /**
   * constructor
   */
  constructor(private http: HttpClient) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * setter & getter for user
   *
   * @param value
   */
  set user(value: User) {
      // Store the value
      this._user.next(value);
  }

  get user$(): Observable<User> {
      return this._user.asObservable();
  }

  /**
   * fetch user profile from github search result
   *
   * @param user User
   */
  profile(user?: User): Observable<User> {
    return this.http.get<User>(user!.url);
  }
}
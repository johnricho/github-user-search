import { User } from '../../models/user';
import { Injectable } from '@angular/core';
import { map, Observable, ReplaySubject, tap} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Result } from 'src/app/models/result';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private _user: ReplaySubject<User> = new ReplaySubject<User>(1);

  /**
   * inject needed services into the constructor
   *
   * @param HttpClient
   */
  constructor(private http: HttpClient) {}

  /**
   * setter & getter for user
   *
   * @param value
   */
  set user(user: User) {
      // store the value
      this._user.next(user);
  }

  get user$(): Observable<User> {
      return this._user.asObservable();
  }

  /**
   * fetch user profile from github search result
   *
   * @param user User
   */
  profile(result: Result): Observable<User> {  
    return this.http.get<User>(result.url).pipe(
      map((data: User) => ({
        id: data.id,
        bio: data.bio,
        url: data.url,
        name: data.name,
        login: data.login,
        location: data.location,
        html_url: data.html_url,
        followers: data.followers,
        following: data.following,
        repos_url: data.repos_url,
        avatar_url: data.avatar_url,
        created_at: data.created_at
    })),(error: any) => {
      throw error; 
   });
  }

}
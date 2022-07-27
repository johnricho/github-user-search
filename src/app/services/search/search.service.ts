import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { merge, Observable, ReplaySubject, throwError, EMPTY} from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SearchService {
  private url = environment.url;

  /**
   * constructor
   */
  constructor(private http: HttpClient) {}

  /**
   * search query on github to find matches
   *
   * @param query
   */
  search(query?:string): Observable<any> {
    if(query=='' || query == null){
      return EMPTY;
    }
    return this.http.get<any>(this.url + query);
  }
}
import { Injectable } from '@angular/core';
import { Observable, EMPTY, shareReplay, map, retry, catchError, throwError, tap} from 'rxjs';
import { Result } from 'src/app/models/result';
import { Results } from 'src/app/models/results';
import { HttpClient } from '@angular/common/http';
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
  search(query?:string, count: number = 100): Observable<Results> {
    if(query=='' || query == null){
      return EMPTY;
    }

    return this.http.get<Results>(this.url + query,{params: {per_page: count}}).pipe(
      map((data: Results) => ({
        items: data.items.map((result: Result)=> ({
        url: result.url
      })),
    })));

  }
  
}
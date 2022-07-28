import {Injectable} from "@angular/core";
import {Observable, throwError} from "rxjs";
import {catchError} from 'rxjs/operators';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
 
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
     
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        return throwError(() => new Error(error.message));
      })
    )
  }
}
 
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; 

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add header to request for github authentication
        const github = request.url.startsWith(environment.url);
        request = request.clone({
            setHeaders: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `token ${environment.key}`
            }
        });
        return next.handle(request);
    }
}
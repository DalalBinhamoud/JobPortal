import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UtilitiesService } from '../utilities/utilities.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  jwToken: any = localStorage.getItem('jwToken');
  constructor(private utilities: UtilitiesService, private router: Router) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.jwToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.jwToken}`,
          'Accept-Language': 'en-US',
        },
      });
      request = request.clone({ url: `${environment.baseUrl}/${request.url}` });
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        var referenceId = error.headers.get('X-Correlation-Id');
        if (error.status == 401 || error.status === 0) {
          this.router.navigate(['/login']);
          this.jwToken = undefined;

          localStorage.removeItem('jwToken');
        } else if (error.status === 500) {
          if (error?.url?.indexOf('401') != -1) {
            this.router.navigate(['/login']);
            this.jwToken = undefined;
            localStorage.removeItem('jwToken');
          }
          this.showErrorMessage(error, referenceId);
        } else if (
          error.status == 400 ||
          error.status == 404 ||
          error.status == 403
        ) {
          this.showErrorMessage(error, referenceId);
        } else if (error.status === 0 || error.status === 200) {
        }
        return throwError(error);
      })
    );
  }

  showErrorMessage(error: any, refId: any) {
    if (error['error']['error'].validationErrors) {
      console.log(error);
    }
  }
}

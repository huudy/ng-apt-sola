import { AlertService } from './alert.service';
import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	constructor(
		private authenticationService: AuthService,
		private alertSvc: AlertService
	) {}

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			tap(event => {
				console.log('Error inteceptor');
				console.log(event);

				if (event instanceof HttpResponse) {
					console.log(event);

					this.alertSvc.success(event.body.message, true);
				}
			}),
			catchError(err => {
				console.log('catchError');

				console.log(err);

				if (err.status === 401) {
					// auto logout if 401 response returned from api
					this.authenticationService.logout();
					location.reload(true);
				}
				this.alertSvc.error(err.error.message);
				const error = err.error.message || err.statusText;
				return throwError(error);
			})
		);
	}
}

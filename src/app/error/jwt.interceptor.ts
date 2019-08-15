import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
	constructor(private authenticationService: AuthService) {}

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		// add auth header with jwt if user is logged in and request is to api url
		this.authenticationService.user$.subscribe(user => {
			const currentUser = user;
			const isLoggedIn = currentUser && currentUser.token;
			// const isApiUrl = request.url.startsWith(config.apiUrl);
			if (isLoggedIn) {
				request = request.clone({
					setHeaders: {
						Authorization: `Bearer ${currentUser.token}`
					}
				});
			}
		});

		return next.handle(request);
	}
}

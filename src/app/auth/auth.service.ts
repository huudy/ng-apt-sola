import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { BehaviorSubject, ReplaySubject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../models/User';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private loginUrl = environment.loginUrl;
	private signupUrl = environment.signupUrl;
	private readonly User = new ReplaySubject<User>();
	readonly user$ = this.User.asObservable();

	constructor(private httpClient: HttpClient) {}

	login(user) {
		return this.httpClient
			.post(this.loginUrl, user)
			.pipe(map(user => this.User.next(user as User)));
	}

	signup(user) {
		return this.httpClient
			.post(this.signupUrl, user)
			.pipe(catchError(error => throwError(error)));
	}
	logout() {}
}

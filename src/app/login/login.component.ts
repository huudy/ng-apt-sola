import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/User';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	focus;
	focus1;
	loginForm: FormGroup;
	constructor(private authSvc: AuthService, private router: Router) {}

	ngOnInit() {
		this.loginForm = new FormGroup({
			email: new FormControl(null, [
				Validators.required,
				Validators.pattern(
					"[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
				)
			]),
			password: new FormControl(null, [
				Validators.required,
				Validators.minLength(8)
			])
		});
	}

	onSubmit() {
		const user = new User(
			this.loginForm.value.email,
			this.loginForm.value.password
		);
		this.authSvc.login(user).subscribe(
			data => {
				console.log('Login component: ' + JSON.stringify(data));
				// this.tokenSvc.token = data.token;
				// this.tokenSvc.userId = data.userId;
				// this.tokenSvc.expiresAt = JSON.stringify(
				//   data.expiresIn * 1000 + new Date().getTime()
				// );
				this.router.navigateByUrl('/');
			},
			error => console.log('Eror login component ', error)
		);
		this.loginForm.reset();
	}
}

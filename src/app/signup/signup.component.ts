import { AlertService } from './../error/alert.service';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/User';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
	test: Date = new Date();
	focus;
	focus1;
	focus2;
	signupForm: FormGroup;

	constructor(
		private authSvc: AuthService,
		private router: Router,
		private alertSvc: AlertService
	) {}

	ngOnInit() {
		this.signupForm = new FormGroup({
			firstname: new FormControl(null, Validators.required),

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
			this.signupForm.value.email,
			this.signupForm.value.password,
			this.signupForm.value.firstname,
			this.signupForm.value.lastname
		);

		this.authSvc.signup(user).subscribe(
			data => {
				console.log(data);
				this.router.navigate(['/login']);
			},
			error => console.log(error)
		);

		this.signupForm.reset();
	}
}

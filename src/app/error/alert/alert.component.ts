import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '../alert.service';

@Component({
	selector: 'alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
	private subscription: Subscription;
	message;

	constructor(private alertService: AlertService) {}

	ngOnInit() {
		this.subscription = this.alertService.getAlert().subscribe(message => {
			console.log('alert component');
			console.log(message);

			switch (message && message.type) {
				case 'success':
					message.cssClass = 'alert alert-success';
					break;
				case 'error':
					message.cssClass = 'alert alert-danger';
					break;
			}

			this.message = message;
		});
	}

	close() {
		this.alertService.clear();
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}

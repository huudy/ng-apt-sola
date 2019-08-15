import { BehaviorSubject } from 'rxjs';
import { RoomsService } from './rooms.service';
import { Component, OnInit } from '@angular/core';
import { Room } from '../models/Room';

@Component({
	selector: 'app-rooms',
	templateUrl: './rooms.component.html',
	styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
	focus: any;
	focus1: any;
	rooms: any;
	constructor(private roomsSvc: RoomsService) {}

	ngOnInit() {
		this.roomsSvc.rooms$.subscribe(data => {
			console.log(data);

			this.rooms = data as Room[];
			console.log(this.rooms);
		});

		this.roomsSvc.fetchRooms().subscribe(rooms => {
			this.rooms = rooms;
		});
	}
}

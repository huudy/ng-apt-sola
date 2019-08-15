import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Room } from '../models/Room';
import { tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class RoomsService {
	private roomsUrl = environment.roomsUrl;
	private readonly _rooms = new BehaviorSubject<Room[]>([]);

	// Expose the observable$ part of the _todos subject (read only stream)
	readonly rooms$ = this._rooms.asObservable();

	get rooms(): Room[] {
		return this._rooms.getValue();
	}

	// assigning a value to this.todos will push it onto the observable
	// and down to all of its subsribers (ex: this.todos = [])
	set rooms(val: Room[]) {
		this._rooms.next(val);
	}

	constructor(private httpClient: HttpClient) {
		// this.getRooms();
	}

	getRooms() {
		// this.httpClient
		// 	.get(this.roomsUrl)
		// 	.pipe(
		// 		map((res: Response) => {
		// 			return res.json();
		// 		})
		// 	)
		// 	.subscribe(data => {
		// 		this._rooms.next(data as Room[]);
		// 	});
		// console.log(this.rooms$);
	}

	fetchRooms() {
		return this.httpClient.get(this.roomsUrl).pipe(
			map(data => {
				console.log(data);

				const rooms = JSON.parse(JSON.stringify(data));
				console.log(rooms);

				let transformedRooms: Room[] = [];
				for (let room of rooms) {
					console.log(room);

					// transformedRooms.push(
					// 	new Room(
					// 		room._id.$oid,
					// 		room.name,
					// 		room.beds,
					// 		room.schedule,
					// 		room.isTv,
					// 		room.isWifi,
					// 		room.src
					// 	)
					// );
				}
				this.rooms = transformedRooms;
				return transformedRooms;
			})
		);
	}
}

import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'room-card',
	templateUrl: './room-card.component.html',
	styleUrls: ['./room-card.component.css']
})
export class RoomCardComponent implements OnInit {
	constructor() {}
	@Input() room;
	ngOnInit() {}
}

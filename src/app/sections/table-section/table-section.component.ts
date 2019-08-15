import { Component, OnInit } from '@angular/core';
import {
	NgbCalendar,
	NgbDate,
	NgbDateStruct
} from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-table-section',
	templateUrl: './table-section.component.html',
	styleUrls: ['./table-section.component.css']
})
export class TableSectionComponent {
	hoveredDate: NgbDate;

	model: NgbDateStruct;
	fromDate: NgbDate;
	toDate: NgbDate;

	constructor(private calendar: NgbCalendar) {
		this.fromDate = calendar.getToday();
		this.fromDate;
		this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
	}

	isDisabled = (date: NgbDate, current: { month: number }) =>
		date.month !== current.month;
	isWeekend = (date: NgbDate) => this.calendar.getWeekday(date) >= 6;

	onDateSelection(date: NgbDate) {
		console.log(date);

		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
		} else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
			this.toDate = date;
		} else {
			this.toDate = null;
			this.fromDate = date;
		}
	}

	isHovered(date: NgbDate) {
		return (
			this.fromDate &&
			!this.toDate &&
			this.hoveredDate &&
			date.after(this.fromDate) &&
			date.before(this.hoveredDate)
		);
	}

	isInside(date: NgbDate) {
		return date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.fromDate) ||
			date.equals(this.toDate) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}
}

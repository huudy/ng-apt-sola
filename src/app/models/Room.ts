export class Room {
	// _id: string;
	// name: string;
	// beds?: number;
	// schedule?: [];
	// flex?: number;
	// isTv?: boolean;
	// isWifi?: boolean;
	// src?: string;
	/**
	 *
	 */
	constructor(
		public _id: any,
		public name: string,
		public beds: number,
		public schedule: [],
		public isTv: boolean,
		public isWifi: boolean,
		public src: string
	) {
		// this._id = _id;
		// this.name = name;
		// this.beds = beds;
		// this.schedule = schedule;
		// this.isTv = isTv;
		// this.isWifi = isWifi;
		// this.src = src;
	}
}

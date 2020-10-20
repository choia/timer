export interface ITimer {
	id: number;
	title: string;
	text: string;
	date: string;
	repeat: boolean;
}

export class Timer implements ITimer {
	id: number;
	title: string;
	text: string;
	date: string;
	repeat: boolean;

	constructor(timer: Partial<Timer>) {
		this.id = timer.id ? timer.id : new Date().getTime();
		this.title = timer.title ? timer.title : '';
		this.text = timer.text ? timer.text : '';
		this.date = timer.date ? timer.date : '';
		this.repeat = timer.repeat ? timer.repeat : false;
	}
}

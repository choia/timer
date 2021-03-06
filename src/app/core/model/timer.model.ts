export interface ITimer {
	id: number;
	title: string;
	description: string;
	date: string;
	datetime: string;
  dateAndTime: string;
  calculateDate: number;
  repeat: boolean;
}
export class Timer implements ITimer {
	id: number;
	title: string;
	description: string;
	date: string;
	datetime: string;
  dateAndTime: string;
  calculateDate: number;
  repeat: boolean;

  constructor(timer: Partial<Timer>) {
	  this.id = timer.id ? timer.id : new Date().getTime();
	  this.title = timer.title ? timer.title : '';
	  this.description = timer.description ? timer.description : '';
	  this.date = timer.date ? timer.date : '';
	  this.datetime = timer.datetime ? timer.datetime : '';
	  this.dateAndTime = timer.dateAndTime ? timer.dateAndTime : '';
    this.calculateDate = timer.calculateDate ? timer.calculateDate : 0;
	  this.repeat = timer.repeat ? timer.repeat : false;
  }
}

import { Timer } from './../model/timer.model';
import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService extends StorageService {
  tableName = 'timer';
  // timers: Timer[];
  timers: Array<Timer>;

  // create
  async createTimer(timer: Partial<Timer>): Promise<any> {
    const response = await super.create(
      this.tableName,
      ['title', 'description', 'date', 'datetime', 'alert'],
      [timer.title, timer.description, timer.date, timer.datetime, timer.alert]
    );
    const savedTimer = await super.getById(this.tableName, response.id);
    return savedTimer;
  }

  // getAll
  async getAllTimers(): Promise<any> {
    const timers = await super.getAll(this.tableName);
    return timers;
  }

  // setTimers(timers: Array<Timer>) {
  //   this.timers = timers;
  // }


  // setTimer(timer: Timer) {
  //   for (let i=0, len = this.timers.length; i<len; i++) {
  //     if (timer.id === this.timers[i].id) {
  //       this.timers[i] = timer;
  //       break;
  //     }
  //   }
  // }

}

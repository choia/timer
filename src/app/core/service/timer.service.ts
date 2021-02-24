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
      ['title', 'description', 'date', 'datetime'],
      [timer.title, timer.description, timer.date, timer.datetime]
    );
    const savedTimer = await super.getById(this.tableName, response.id);
    return savedTimer;
  }

  // update
  async updateTimer(timer: Timer): Promise<any> {
    const response = await super.update(
      this.tableName,
      timer.id,
      ['title', 'description', 'date', 'datetime'],
      [timer.title, timer.description, timer.date, timer.datetime]

    );
    return response;

  }

  // getAll
  async getAllTimers(): Promise<any> {
    const timers = await super.getAll(this.tableName);
    return timers;
  }

  // setTimers(timers: Array<Timer>) {
  //   this.timers = timers;
  // }

}

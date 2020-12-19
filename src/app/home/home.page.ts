import { TimerModes } from './components/timer/timer.enum';
import { Timer } from './../core/model/timer.model';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { ModalController } from '@ionic/angular';
import { TimerComponent } from './components/timer/timer.component';
import { TimerService } from '../core/service/timer.service';
import { LocalNotificationService } from '../core/service/local-notification.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: [ 'home.page.scss' ],
})
export class HomePage implements OnInit {
  pipe = new DatePipe('en-US')
  timers: Timer[];

  constructor(private notificationService: LocalNotificationService,
              private timerService: TimerService,
              private modalController: ModalController) {}

  ngOnInit(): void {
    this.timers = [];
    this.getAllTimers();
  }

  // setTimers
  setTimers(timers: Timer[]) {
    this.timers = timers;
  }

  // getAllTimers
  async getAllTimers() {
    const timers = await this.timerService.getAllTimers();
    this.setTimers(timers.map((timer) => new Timer(timer)));
  }

  // create
  async createTimer() {
    const timerModal = await this.modalController.create({
      component: TimerComponent,
      componentProps: {
        mode: TimerModes.ADD,
        timer: undefined
      }
    });
    await timerModal.present();
    const response = await timerModal.onDidDismiss();
    const timer = response.data;
    console.log('Create response data date: ' + timer.date);
    console.log('Create response data time: ' + timer.datetime);

    if (timer) {
      const createdTimers = await this.timerService.createTimer(timer);
      this.timers.push(createdTimers);
    }
    // notification service - simpleNotify test
    this.notificationService.simpleNotify(timer);

  }

  // update
  async updateTimer(timerItem: Timer) {
    const timerModal = await this.modalController.create({
      component: TimerComponent,
      componentProps:  {
        mode: TimerModes.EDIT,
        timer: timerItem
      }
    });
    await timerModal.present();
    const response = await timerModal.onDidDismiss();
    const timer = response.data;
    console.log('Update response data date: ' + this.pipe.transform(timer.date, 'shortDate'));
    console.log('Update response data time: ' + this.pipe.transform(timer.datetime, 'shortTime'));

    if (timer) {
      for (let i = 0, len = this.timers.length; i < len; i++) {
        if (timer.id === this.timers[i].id) {
          this.timers[i] = timer;
          break;
        }
      }
    }
  }

}

import { TimerModes } from './components/timer/timer.enum';
import { Timer } from './../core/model/timer.model';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { ModalController, PopoverController } from '@ionic/angular';
import { TimerComponent } from './components/timer/timer.component';
import { TimerService } from '../core/service/timer.service';
import { TimerDeletePopoverComponent } from './components/timer-delete-popover/timer-delete-popover.component';
import { TimerConstants } from './../core/constant/timer.enum';
import { LocalNotificationService } from '../core/service/local-notification.service';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: [ 'home.page.scss' ],
})
export class HomePage implements OnInit {

  timers: Timer[];

  constructor(private notificationService: LocalNotificationService,
              private timerService: TimerService,
              private modalController: ModalController,
              private popOverController: PopoverController) {}

  ngOnInit(): void {
    console.log('home ngOnInit');

    this.timers = [];
    this.getAllTimers();
  }

  // setTimers
  setTimers(timers: Array<Timer>) {
    this.timers = timers;
  }

  // getAllTimers
  async getAllTimers() {
    console.log('#getAllTimers');
    const getTimers = await this.timerService.getAllTimers();
    getTimers.map(timer => {
      this.timers.push(timer);
    });

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
    if (response.data !== undefined) {
      const timer = response.data;

      console.log('Create response date and time: ' + timer.dateAndTime);

      if (timer) {
        const createdTimers = await this.timerService.createTimer(timer);
        this.timers.push(createdTimers);
      }

      this.notificationService.createAndUpdateNotify(timer);

    }
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
    if (response.data !== undefined && response.role !== TimerConstants.DELETE) {

      const timer = response.data;

      if (timer) {
        const updatedTimer = await this.timerService.updateTimer(timer);
        if (updatedTimer) {
          for (let i = 0, len = this.timers.length; i < len; i++) {
            if (updatedTimer.id === this.timers[i].id) {
              this.timers[i] = updatedTimer;
              break;
            }
          }
        }
      }

      this.notificationService.createAndUpdateNotify(timer);

    }
    else if (response.data !== undefined && response.role === TimerConstants.DELETE) {

      const filterItems = response.data;
      const itemIndex = filterItems.length;

      const newTimers = filterItems.filter(item => {
        return this.timers[itemIndex] !== item;
      });

      this.setTimers(newTimers.map(timer => new Timer(timer)));

    }
  }

}

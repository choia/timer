import { TimerModes } from './components/timer/timer.enum';
import { Timer } from './../core/model/timer.model';
import { Component, OnInit } from '@angular/core';
import { ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { ModalController } from '@ionic/angular';
import { TimerComponent } from './components/timer/timer.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: [ 'home.page.scss' ]
})
export class HomePage implements OnInit {
  timers: Timer[]
  constructor(private localNotifications: LocalNotifications, private modalController: ModalController) {}

  ngOnInit(): void {
    this.timers = [];
    
  }

  async addTimer() {
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
    if (timer) {
      this.timers.push(new Timer(timer));
      // this.timers.map(timer);
    }
    console.log(timer);
  }

  async editTimer(timerItem: Timer) {
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

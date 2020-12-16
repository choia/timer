import { Timer } from './../model/timer.model';
import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Injectable({
  providedIn: 'root'
})
export class LocalNotificationService {

  constructor(private localNotifications: LocalNotifications) {}

  simpleNotify(timer: Partial<Timer>) {
    console.log('simpleNotify');
    this.localNotifications.schedule({
      id: timer.id,
      title: timer.title,
      text: timer.description,
      data: {messageData: 'Hello message data'}

    });
  }

  // delayNotify() {
  //   this.localNotifications.schedule({
  //     id: 2,
  //     title: 'This is delay notification',
  //     text: '3:00 - 4:00 PM',
  //     data: { mydata: 'Hello message' },
  //     trigger: {
  //       at: new Date(new Date().getTime() + 5 * 1000)
  //     },
  //     foreground: true
  //   });
  // }

  // delayNotify2() {
  //   this.localNotifications.schedule({
  //     id: 3,
  //     title: 'This is delay notification 2',
  //     text: '5:00 - 6:00 PM',
  //     data: { page: 'Hello message 2' },
  //     trigger: {
  //       in: 5,
  //       unit: ELocalNotificationTriggerUnit.SECOND
  //     }
  //   });
  // }

  // recurringNotify() {
  //   this.localNotifications.schedule({
  //     id: 4,
  //     title: 'Attention - Recurring',
  //     text: 'Recurring Notification',
  //     trigger: {
  //       every: ELocalNotificationTriggerUnit.MINUTE
  //     }
  //   });
  // }

  // repeatingDaily() {
  //   this.localNotifications.schedule({
  //     id: 5,
  //     title: 'Attention - Repeating Daily',
  //     text: 'Repeating Notification',
  //     trigger: {
  //       every: { hour: 1, minute: 25 }
  //     }
  //   });
  // }

}

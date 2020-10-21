import { Timer } from './../core/model/timer.model';
import { Component, OnInit } from '@angular/core';
import { ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: [ 'home.page.scss' ]
})
export class HomePage implements OnInit {
	constructor(private localNotifications: LocalNotifications) {}
	timers: Timer[] = [
		new Timer({
			id: 1,
			title: 'This is first notification from timer',
			text: 'Timer - Simple local notifications',
			date: new Date().toISOString(),
			repeat: false
		}),
		new Timer({
			id: 2,
			title: 'This is second notification',
			text: 'Simple local notifications',
			date: new Date().toISOString(),
			repeat: false
		}),
		new Timer({
			id: 3,
			title: 'This is delay notification',
			text: '1 - 2AM',
			date: new Date().toISOString(),
			repeat: false
		}),
		new Timer({
			id: 4,
			title: 'This is delay notification 2',
			text: '3 - 4PM',
			date: new Date().toISOString(),
			repeat: false
		})
	];

	simpleNotify() {
		this.localNotifications.schedule({
			id: this.timers[0].id,
			title: this.timers[0].title,
			text: this.timers[0].text
		});
		console.log(this.timers);
	}

	delayNotify() {
		this.localNotifications.schedule({
			id: 2,
			title: 'This is delay notification',
			text: '3:00 - 4:00 PM',
			data: { mydata: 'Hello message' },
			trigger: {
				at: new Date(new Date().getTime() + 5 * 1000)
			},
			foreground: true
		});
	}

	delayNotify2() {
		this.localNotifications.schedule({
			id: 3,
			title: 'This is delay notification 2',
			text: '5:00 - 6:00 PM',
			data: { page: 'Hello message 2' },
			trigger: {
				in: 5,
				unit: ELocalNotificationTriggerUnit.SECOND
			}
		});
	}

	recurringNotify() {
		this.localNotifications.schedule({
			id: 4,
			title: 'Attention - Recurring',
			text: 'Recurring Notification',
			trigger: {
				every: ELocalNotificationTriggerUnit.MINUTE
			}
		});
	}

	repeatingDaily() {
		this.localNotifications.schedule({
			id: 5,
			title: 'Attention - Repeating Daily',
			text: 'Repeating Notification',
			trigger: {
				every: { hour: 1, minute: 25 }
			}
		});
	}

	addTimer() {
		console.log('addTimer');
	}

	async ngOnInit() {}
}

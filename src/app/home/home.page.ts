import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: [ 'home.page.scss' ]
})
export class HomePage implements OnInit {
	constructor(private localNotifications: LocalNotifications) {}

	simpleNotify() {
		this.localNotifications.schedule({
			id: 1,
			title: 'This is first notification',
			text: 'Simple local notifications'
		});
	}

	async ngOnInit() {}
}

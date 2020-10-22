import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-timer',
	templateUrl: './timer.component.html',
	styleUrls: [ './timer.component.scss' ]
})
export class TimerComponent implements OnInit {
	constructor(private modalController: ModalController) {}

	ngOnInit() {}

	dismiss() {
		this.modalController.dismiss();
	}
}

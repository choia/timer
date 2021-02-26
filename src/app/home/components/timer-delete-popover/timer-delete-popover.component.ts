import { TimerConstants } from './../../../core/constant/timer.enum';
import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-timer-delete-popover',
  templateUrl: './timer-delete-popover.component.html',
  styleUrls: ['./timer-delete-popover.component.scss'],
})
export class TimerDeletePopoverComponent implements OnInit {

  constructor(private popOverController: PopoverController) {}

  ngOnInit() {}

  deleteTimer() {
    this.popOverController.dismiss(TimerConstants.DELETE);
  }

}

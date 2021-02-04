import { TimerModes } from './timer.enum';
import { Timer } from './../../../core/model/timer.model';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: [ './timer.component.scss' ]
})
export class TimerComponent implements OnInit {
  timerForm: FormGroup;
  timer: Timer;
  mode: TimerModes;
  minDate: string;
  test1: string;
  test2: string;
  test3: string;

  constructor(private modalController: ModalController, private fb: FormBuilder) {}

  ngOnInit() {
    console.log('ngOnInit');
    // this.minDate = new Date().toISOString();
    this.test1 = new Date().getMonth().toString();
    this.test2 = new Date().getDate().toString();
    this.test3 = new Date().getFullYear().toString();
    // this.minDate = this.test3 + '-' + this.test1 + '-' + this.test2;
    console.log('Test: ' + this.test3 + '-' + this.test1 + '-' + this.test2);

	  this.timerForm = this.fb.group({
	    title: ['', []],
	    description: ['', []],
	    date: ['', []],
      datetime: ['', []],
    });

    if (this.timer && this.mode === TimerModes.EDIT) {
      console.log('If TimerModes is in Edit Mode');

      this.timerForm.get('title').setValue(this.timer.title);
      this.timerForm.get('description').setValue(this.timer.description);
      this.timerForm.get('date').setValue(this.timer.date);
      this.timerForm.get('datetime').setValue(this.timer.datetime);
    }
  }

  formSubmit() {


    console.log(this.timerForm);
    console.log('Date' + this.timer.date);
    let formData;
    if (this.mode === TimerModes.ADD) {
      formData = this.timerForm.value;
    }
    else {
      formData = {
        ...this.timer,
        ...this.timerForm.value
      };
    }
    this.modalController.dismiss(formData);
  }

  dismiss() {
	  this.modalController.dismiss();
  }
}

import { TimerModes } from './timer.enum';
import { Timer } from './../../../core/model/timer.model';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
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
  maxDate: string;
  defaultDate: string;

  constructor(private modalController: ModalController, private fb: FormBuilder) {}

  ngOnInit() {
    console.log('ngOnInit');

    this.minDate = moment().format();
    const addedDate = moment(this.minDate);
    this.maxDate = addedDate.clone().add(2, 'year').format();
    console.log('moment min date' + this.minDate);
    console.log('moment max date' + this.maxDate);

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

  getDate(e) {
    console.log('getDate ' + e.target.value);
  }

  formSubmit() {

    console.log(this.timerForm);
    console.log('Date' + this.timerForm.value);
    let formData;
    if (this.mode === TimerModes.ADD) {

      if (this.timerForm.get('title').value === '') {
        this.timerForm.get('title').setValue('(No title)');
      }

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

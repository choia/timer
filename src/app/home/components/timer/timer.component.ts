import { TimerModes } from './timer.enum';
import { Timer } from './../../../core/model/timer.model';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateTime } from 'luxon';
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
  dateAndTime: string;

  constructor(private modalController: ModalController, private fb: FormBuilder, private datePipe: DatePipe) {}

  /* ngOnInit */
  ngOnInit() {
    console.log('ngOnInit');

    this.minDate = DateTime.now().toString();
    this.maxDate = DateTime.now().plus({years: 1, month: 11, days: 1}).toString();

    console.log('min: ' + this.minDate);
    console.log('max: ' + this.maxDate);

	  this.timerForm = this.fb.group({
      title: ['', []],
	    description: ['', []],
	    date: ['', []],
      datetime: ['', []],
    });

    if (this.timer && this.mode === TimerModes.EDIT) {
      console.log('TimerModes is in Edit');
      console.log(this.timerForm.get('date'));

      this.timerForm.get('title').setValue(this.timer.title);
      this.timerForm.get('description').setValue(this.timer.description);
      this.timerForm.get('date').setValue(this.timer.date);
      this.timerForm.get('datetime').setValue(this.timer.datetime);
    }
    else {
      console.log('TimerModes is in Create');

      this.timerForm.get('date').setValue(this.minDate);
    }
  }

  /* formSubmit */
  formSubmit() {
    console.log('FormSubmit');

    let formData;

    if (this.mode === TimerModes.ADD) {
      this.checkTitle();

      const formDate = this.timerForm.get('date').value;
      const formDateTime = this.timerForm.get('datetime').value;

      const concatDateTime = this.concatenateDateAndTime(formDate, formDateTime);

      formData = {
        ...this.timer,
        ...this.timerForm.value,
        dateAndTime: concatDateTime
      };

    }
    else {
      // If TimerMode is Update
      this.checkTitle();

      console.log('date get: ' + this.timerForm.get('date').value);
      console.log('datetime get: ' + this.timerForm.get('datetime').value);

      const formDate = this.timerForm.get('date').value;
      const formDateTime = this.timerForm.get('datetime').value;

      this.timer.dateAndTime = this.concatenateDateAndTime(formDate, formDateTime);

      console.log('Date Time: ' + this.timer.dateAndTime);

      formData = {
        ...this.timer,
        ...this.timerForm.value,

      };
    }

    this.modalController.dismiss(formData);
  }

  /* Concat Date and Time */
  concatenateDateAndTime(formDate: string, formTime: string): string {
    const transformDate = this.datePipe.transform(formDate, 'yyyy-MM-ddT');
    let transformDateTime = '';

    if (formTime) {
      transformDateTime = this.datePipe.transform(formTime, 'HH:mm:ss.000ZZZZZ');

    }

    return transformDate + transformDateTime;
  }

  /* Check title if its empty */
  checkTitle() {
    if (this.timerForm.get('title').value === '') {
      this.timerForm.get('title').setValue('(No title)');
    }
  }

  /* Dismiss */
  dismiss() {
	  this.modalController.dismiss();
  }
}

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

  /* ngOnInit */
  ngOnInit() {
    console.log('ngOnInit');

    this.minDate = moment().format();
    const addedDate = moment(this.minDate);
    this.maxDate = addedDate.clone().add(2, 'year').format();

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
    else {
      this.defaultDate =new Date().toISOString();
      this.timerForm.get('date').setValue(this.defaultDate);
    }
  }

  /* formSubmit */
  formSubmit() {

    console.log(this.timerForm);
    console.log('Date' + this.timerForm.value);
    let formData;
    if (this.mode === TimerModes.ADD) {

      this.checkTitle();
      formData = this.timerForm.value;
    }
    else {
      this.checkTitle();

      formData = {
        ...this.timer,
        ...this.timerForm.value
      };
    }
    this.modalController.dismiss(formData);
  }

  /* checkTitle */
  checkTitle() {
    if (this.timerForm.get('title').value === '') {
      this.timerForm.get('title').setValue('(No title)');
    }
  }

  /* dismiss */
  dismiss() {
	  this.modalController.dismiss();
  }
}

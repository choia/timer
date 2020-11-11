import { TimerModes } from './timer.enum';
import { Timer } from './../../../core/model/timer.model';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: [ './timer.component.scss' ]
})
export class TimerComponent implements OnInit {
  timerForm: FormGroup;
  timer: Timer;
  mode: TimerModes;

  constructor(private modalController: ModalController, private fb: FormBuilder) {}

  ngOnInit() {
	  this.timerForm = this.fb.group({
	    title: ['', [ Validators.required ]],
	    description: ['', []],
	    date: ['', []]
    });
    
    if (this.timer && this.mode === TimerModes.EDIT) {
      this.timerForm.get('title').setValue(this.timer.title);
      this.timerForm.get('description').setValue(this.timer.text);
      this.timerForm.get('date').setValue(this.timer.date);
    }
  }

  formSubmit() {
    console.log(this.timerForm);
    let formData;
    if (this.mode === TimerModes.ADD) {      
      formData = this.timerForm.value;
    } else {
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

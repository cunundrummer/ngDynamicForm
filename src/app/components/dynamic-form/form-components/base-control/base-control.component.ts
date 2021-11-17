import {ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { IFormControlConfigurations } from '../../interfaces/form.interfaces';
import { config } from 'rxjs';

@Component({
  selector: 'control-base',
  templateUrl: './base-control.component.html',
  styleUrls: ['./base-control.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseControlComponent implements OnInit {
  @Input() group!: FormGroup;
  @Input() config!: IFormControlConfigurations;
  control!: AbstractControl;
  err: string | null = '' ;

  constructor() {}

  ngOnInit(): void {
    // atm, all control components have this. not DRY.
    // Problem with f-c-error directive.
    const isInstanceOfInterface = typeof config;
    console.log(isInstanceOfInterface);
    this.control = this.group.controls[this.config.name];
  }

  /**
   * @description Builds the error message for when control has an error.  Gets the messages from the config object.
   * @param {string | null} error
   */
  buildErrorMessage(error: string | null): void {
    if (this.config.errorMessages) {
      for (const msg of this.config.errorMessages) {
        if (msg.errName.toLowerCase() === error?.toLowerCase()) {
          this.err = msg.errMsg;
          return;
        }
      }
    }
    this.err = error;
  }
}

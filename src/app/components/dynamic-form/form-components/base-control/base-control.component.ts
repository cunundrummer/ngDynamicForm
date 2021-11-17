import {ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { IFormControlConfigurations } from '../../interfaces/form.interfaces';
import { IPriceCustomFormControlConfiguration } from '../../models/controlConfigurations/customPriceControlConfiguration';

@Component({
  selector: 'control-base',
  templateUrl: './base-control.component.html',
  styleUrls: ['./base-control.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseControlComponent implements OnInit {
  @Input() group!: FormGroup;
  @Input() config!: any;
  control!: AbstractControl;
  err: string | null = '' ;

  constructor() {}

  ngOnInit(): void {
    let configurationInterfaceToUse;

    switch (this.config.interfaceId) {
      case 'IPriceCustomFormControlConfiguration':
        configurationInterfaceToUse = this.config as IPriceCustomFormControlConfiguration;
        break;
      default:
        configurationInterfaceToUse = this.config as IFormControlConfigurations;
    }
    this.control = this.group.controls[configurationInterfaceToUse.name];

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

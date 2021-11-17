import {ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { IFormControlConfigurations } from '../../interfaces/form.interfaces';
import { IPriceCustomFormControlConfiguration } from '../../models/controlConfigurations/customPriceControlConfiguration';


type IConfigurationTypes = IFormControlConfigurations | IPriceCustomFormControlConfiguration
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
    this.control = this.group.controls[this.getConfigWithProperInterface().name];
  }

  /**
   * @description returns the config casted with the appropriate interface.
   */
  getConfigWithProperInterface() {
    switch (this.config.interfaceId) {
      case 'IPriceCustomFormControlConfiguration':
        return this.config as IPriceCustomFormControlConfiguration;
      default:
        return this.config as IFormControlConfigurations;
    }
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

import { Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControlComponent } from '../base-control/base-control.component';
import { MatRadioChange } from '@angular/material/radio';
import { BehaviorSubject } from 'rxjs';


enum RadioValues {
  askingPrice,
  free,
  contact
}

@Component({
  selector: 'app-custom-price',
  templateUrl: './custom-price.component.html',
  styleUrls: ['./custom-price.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: CustomPriceComponent
    }
  ]
})
export class CustomPriceComponent extends BaseControlComponent implements ControlValueAccessor {
  /**Don't forget to implement custom validators if necessary**/
  readonly errorClass = 'mat-error';
  readonly noErrorsClass = 'non-material-fieldset';
  radioOptions = new BehaviorSubject<any>(null);
  fieldError = false;

  constructor() {
    super();
  }

  update() {
    this.radioOptions.next(this.config.radioGroupOptions);
    console.log(this.radioOptions.getValue());
  }

  /**
   * Will enable/disable the price input whether the selected radio button value is 0 or not.
   *
   */
  handleChange(ev: MatRadioChange) {}

  writeValue(obj: any) {
  }

  registerOnChange(fn: any) {
  }

  registerOnTouched(fn: any) {
  }

  setDisabledState(isDisabled: boolean) {
  }

  setFieldError(ev: boolean) {
    this.fieldError = ev;
  }
}

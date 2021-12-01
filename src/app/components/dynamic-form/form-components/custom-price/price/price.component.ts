import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { BaseControlComponent } from '../../base-control/base-control.component';
import { IPriceCustomFormControlConfiguration } from '../../../models/controlConfigurations/customPriceControlConfiguration';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent extends BaseControlComponent {
  @Input() group!: FormGroup;
  @Input() config!: IPriceCustomFormControlConfiguration;
  control!: AbstractControl;
  err: string | null = '' ;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    super();
    iconRegistry.addSvgIcon(
      'dollar-sign',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/dollar-sign.svg')
    );
  }

  update() {
    // console.log(this.config.constraints);
    this.control.setValue(0);
  }

  handlePriceChange() {
    console.log('Received input: ', this.control.value);
    if (+this.control.value < 0 || this.control.value == '') {
      this.control.patchValue(0);
    }
  }

  /**
   * @description aside from preventing letters, this method prevents '-' and excess periods. If all is good, the
   * fieldset errors (if any) are removed.
   */
  handleInputChange(ev: KeyboardEvent) {
    // default value 0. Also prevents error (null value).
    const txtValue = this.group.controls.price.value  || '0';
    if (ev.code.toLowerCase() === 'minus') {
      ev.preventDefault();
      ev.stopPropagation();
    }
    if (ev.code.toLowerCase() === 'period') {
      const str = txtValue.toString();
      const DECIMAL = '.';
      if (str.indexOf(DECIMAL) > -1) {
        ev.preventDefault();
        ev.stopPropagation();
      }
    }
  }
}

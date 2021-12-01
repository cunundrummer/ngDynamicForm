import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-price-input',
  templateUrl: './price-input.component.html',
  styleUrls: ['./price-input.component.css']
})
export class PriceInputComponent implements OnInit {
  @Output('fieldError') fieldError = new EventEmitter<boolean>();
  @Output('price') price = new EventEmitter<string>();
  @ViewChild('txtPrice') txtPrice!: ElementRef<HTMLInputElement>; // for focusing element
  priceControlGroup!: FormGroup;
  readonly MIN_PRICE_VALUE = 0; // should never be negative value

  constructor(private fb: FormBuilder, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'dollar-sign',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/dollar-sign.svg')
    );
  }

  ngOnInit(): void {
    this.buildInputForm();
  }

  private buildInputForm() {
    this.priceControlGroup = this.fb.group({
      priceValue: [{value: this.MIN_PRICE_VALUE, disabled: true}, Validators.min(this.MIN_PRICE_VALUE)]
    });
  }

  handlePriceClick() {
    const priceValueCtrl = this.priceControlGroup.controls.priceValue;
    priceValueCtrl?.enable();
    this.txtPrice.nativeElement.focus();
  }

  /**
   * @description aside from preventing letters, this method prevents '-' and excess periods. If all is good, the
   * fieldset errors (if any) are removed.
   */
  handleInputChange(ev: KeyboardEvent) {
  //   // default value 0. Also prevents error (null value).
  //   const txtValue = this.priceControlGroup.controls.priceValue.value  || this.MIN_PRICE_VALUE;
  //   if (ev.code.toLowerCase() === 'minus') {
  //     ev.preventDefault();
  //     ev.stopPropagation();
  //   }
  //   if (ev.code.toLowerCase() === 'period') {
  //     const str = txtValue.toString();
  //     const DECIMAL = '.';
  //     if (str.indexOf(DECIMAL) > -1) {
  //       ev.preventDefault();
  //       ev.stopPropagation();
  //     }
  //   }
  //   this.fieldError.emit(false);
  }
}

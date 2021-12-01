import { IFormControlConfigurations, IFormControlConstraintsBase } from '../../interfaces/form.interfaces';
import { Component } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';
import { PriceComponent } from '../../form-components/custom-price/price/price.component';

const PRICE_MIN = 0;
const PRICE_MAX = 1000000;
const priceRequiredErrorMessage = () => 'The price is required.';
const priceHintMessage = () => `Enter a price between ${PRICE_MIN} and ${PRICE_MAX}`;
const priceMinErrorMessage = () => `Minimum allowable price is ${PRICE_MIN}`;
const priceMaxErrorMessage = () => `Maximum price allowable is ${PRICE_MAX}`;

export interface IFormControlConstraintsPrice extends IFormControlConstraintsBase {
  min: number;
  max: number;
}

export const PriceControlConfiguration = (constraints: IFormControlConstraintsPrice): IFormControlConfigurations => {
  console.log('Config with constraints...', constraints);
  const {required, min, max} = {...constraints};
  const validators: ValidatorFn[] = [Validators.min(min), Validators.max(max)];
  if (required) validators.push(Validators.required);

  return {
    interfaceId: 'IFormControlConfigurations',
    associatedComponent: <Component>PriceComponent, // <Component>PriceInputComponent,
    name: 'price', // to be used along with formControlName directive
    usesMatFormField: true,
    label: 'Price',
    type: 'number',
    validators: validators,
    hints: {
      alignment: 'end',
      message: priceHintMessage()
    },
    constraints: constraints as IFormControlConstraintsPrice | null,
    errorMessages: [
      {
        errName: 'required',
        errMsg: priceRequiredErrorMessage()
      },
      {
        errName: 'min',
        errMsg: priceMinErrorMessage()
      },
      {
        errName: 'max',
        errMsg: priceMaxErrorMessage()
      }
    ]
  }
}

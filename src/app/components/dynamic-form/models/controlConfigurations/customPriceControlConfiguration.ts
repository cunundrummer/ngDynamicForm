import { Component } from "@angular/core";
import { IFormControlConfigurations, IFormControlConstraints } from "../../interfaces/form.interfaces";
import { CustomPriceComponent } from "../../form-components/custom-price/custom-price.component";
import { ValidatorFn, Validators } from "@angular/forms";


enum PriceRadioValues {
  ASKING_PRICE,
  FREE,
  CONTACT
}

export interface IPriceCustomFormControlConfiguration extends IFormControlConfigurations {
  radioGroupOptions: {
    text: string;
    value: PriceRadioValues;
    checked: boolean;
  }[];
}

const buySellPriceOptions = [
  {text: '$', value: PriceRadioValues.ASKING_PRICE/**.toString()**/, checked: true},
  {text: 'Free', value: PriceRadioValues.FREE/**.toString()**/, checked: false},
  {text: 'Contact me!', value: PriceRadioValues.CONTACT/**.toString()**/, checked: false}
];

export const customPriceControlConfiguration = (constraints: Partial<IFormControlConstraints>): IPriceCustomFormControlConfiguration => {
  const {required} = {...constraints};
  const validators: ValidatorFn[] = [];
  if (required) validators.push(Validators.required);

  return {
    interfaceId: 'IPriceCustomFormControlConfiguration',
    associatedComponent: <Component>CustomPriceComponent,
    name: 'customPrice', // to be used along with formControlName directive
    usesMatFormField: true,
    label: 'Price',
    type: 'price',
    radioGroupOptions: buySellPriceOptions,
    validators: validators,
    hints: {
      alignment: 'end',
      message: 'Hint message'
    },
    constraints: constraints as IFormControlConstraints | null,
    errorMessages: [
      {
        errName: 'required',
        errMsg: 'RequiredErrorMessage()'
      }
    ]
  }
}

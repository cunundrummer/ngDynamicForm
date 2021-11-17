import { Component } from "@angular/core";
import { IFormControlConfigurations, IFormControlConstraints } from "../../interfaces/form.interfaces";
import { CustomPriceComponent } from "../../form-components/custom-price/custom-price.component";
import { ValidatorFn, Validators } from "@angular/forms";


export const customPriceControlConfiguration = (constraints: Partial<IFormControlConstraints>): IFormControlConfigurations => {
  const {required} = {...constraints};
  const validators: ValidatorFn[] = [];
  if (required) validators.push(Validators.required);

  return {
    associatedComponent: <Component>CustomPriceComponent,
    name: 'customPrice', // to be used along with formControlName directive
    usesMatFormField: true,
    label: 'Price',
    type: '',
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

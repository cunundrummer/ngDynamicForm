import { IFormControlConfigurations, IFormControlConstraintsBase } from '../../interfaces/form.interfaces';
import { Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { DescriptionComponent } from '../../form-components/description/description.component';

export interface IFormControlConstraintsDescription extends IFormControlConstraintsBase {
  minLength: number;
  maxLength: number;
}

const descriptionRequiredErrorMessage = () => 'Please enter a description.';
const descriptionHintMessage = () => 'More details means better rate of views.';
const minLengthErrorMessage = (num: number) => `Please enter a minimum of ${num} characters`;
const maxLengthErrorMessage = (num: number) => `Please enter a maximum of ${num} characters`;


export const descriptionControlConfiguration = (constraints: IFormControlConstraintsDescription): IFormControlConfigurations => {
  const {required, minLength, maxLength} = {...constraints};
  const validators = [Validators.minLength(minLength), Validators.maxLength(maxLength)];
  if (required) validators.push(Validators.required);

  return {
    interfaceId: 'IFormControlConfigurations',
    associatedComponent: <Component>DescriptionComponent,
    name: 'description', // to be used along with formControlName directive
    usesMatFormField: true,
    label: 'Description',
    type: 'textarea',
    validators: validators,
    hints: {
      alignment: 'end',
      message: descriptionHintMessage()
    },
    constraints: constraints as IFormControlConstraintsBase | null,
    errorMessages: [
      {
        errName: 'required',
        errMsg: descriptionRequiredErrorMessage()
      },
      {
        errName: 'minLength',
        errMsg: minLengthErrorMessage(minLength)
      },
      {
        errName: 'maxLength',
        errMsg: maxLengthErrorMessage(maxLength)
      }
    ]
  }
}

import { IFormControlConfigurations, IFormControlConstraints } from '../../interfaces/form.interfaces';
import { Component } from '@angular/core';
import { TitleComponent } from '../../components/forms/form-components/title/title.component';
import { Validators } from '@angular/forms';


/*************
 * CONSTANTS *
 *************/
const titleRequiredErrorMessage = () => 'The title is required.';
const titleHintMessage = () => 'Enter a descriptive title'
const minLengthErrorMessage = (num: number) => `Please enter a minimum of ${num} characters`;
const maxLengthErrorMessage = (num: number) => `Please enter a maximum of ${num} characters`;

export const titleControlConfiguration = (constraints: IFormControlConstraints): IFormControlConfigurations => {
  const {required, minLength, maxLength} = {...constraints};
  const validators = [Validators.minLength(minLength), Validators.maxLength(maxLength)];
  if (required) validators.push(Validators.required);

  return {
    associatedComponent: <Component>TitleComponent,
    name: 'title', // to be used along with formControlName directive
    usesMatFormField: true,
    label: 'Title',
    type: 'text',
    validators: validators,
    hints: {
      alignment: 'end',
      message: titleHintMessage()
    },
    constraints: constraints as IFormControlConstraints | null,
    errorMessages: [
      {
        errName: 'required',
        errMsg: titleRequiredErrorMessage()
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

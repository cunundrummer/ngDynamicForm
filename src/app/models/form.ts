import { ValidatorFn, Validators } from '@angular/forms';
import { TitleComponent } from '../components/form-components/title/title.component';
import { Component } from '@angular/core';

const titleRequiredErrorMessage = () => 'The title is required.';
const descriptionRequiredErrorMessage = () => 'Please enter a description.';
const minLengthErrorMessage = (num: number) => `Please enter a minimum of ${num} characters`;
const maxLengthErrorMessage = (num: number) => `Please enter a maximum of ${num} characters`;


export interface IConstraints {
  required: boolean;
  minLength: number;
  maxLength: number;
}

interface IFormControlConfigurationsErrors {
  errName: string;
  errMsg: string;
}

export interface IFormCategoryConfig {
  forPath: string;
  formControls: {[ctrlName: string]: IFormControlConfigurations}[]
}

type hintAlignment = 'start' | 'end';
export interface IFormControlConfigurations {
  associatedComponent?: Component;
  name: string;
  label?: string;
  type: string;
  usesMatFormField: boolean;
  validators: ValidatorFn | ValidatorFn[] | null;
  hints?: {
    alignment: hintAlignment,
    message: string
  };
  constraints?: IConstraints | null;
  errorMessages?: IFormControlConfigurationsErrors[]
}

export const titleControlConfiguration = (constraints: IConstraints): IFormControlConfigurations => {
  const {required, minLength, maxLength} = {...constraints};
  console.log('type of required: ', typeof required);

  return {
    associatedComponent: <Component>TitleComponent,
    name: 'title', // to be used along with formControlName directive
    usesMatFormField: true,
    label: 'Title',
    type: 'text',
    validators: [Validators.required, Validators.minLength(minLength), Validators.maxLength(maxLength)],
    hints: {
      alignment: 'end',
      message: 'Hint'
    },
    constraints: constraints as IConstraints | null,
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

export const descriptionControlConfiguration: IFormControlConfigurations = {
  name: 'description',
  usesMatFormField: false,
  label: 'Description',
  type: 'textarea',
  validators: [Validators.required, Validators.maxLength(1000)]
};


import { ValidatorFn, Validators } from '@angular/forms';
import { TitleComponent } from '../components/form-components/title/title.component';
import { Component } from '@angular/core';

const titleRequiredErrorMessage = () => 'The title is required.';
const descriptionRequiredErrorMessage = () => 'Please enter a description.';
const minLengthErrorMessage = (num: number) => `Please enter a minimum of ${num} characters`;


interface IErrorLengthValues {
  minLength: number;
  maxLength: number;
}

interface IFormControlConfigurationsErrors {
  errName: string;
  errMsg: string;
}

export interface IFormControlConfigurations {
  associatedComponent?: Component;
  name: string;
  label?: string;
  type: string;
  usesMatFormField: boolean;
  validators: ValidatorFn | ValidatorFn[] | null;
  hints?: unknown;
  errorConfigs?: any;
  errorMessages?: IFormControlConfigurationsErrors[]
}

export const titleControlConfiguration = (configVals: IErrorLengthValues): IFormControlConfigurations => {
  const {minLength, maxLength} = {...configVals};

  return {
    associatedComponent: <Component>TitleComponent,
    name: 'title',
    usesMatFormField: true,
    label: 'Title',
    type: 'text',
    validators: [Validators.required, Validators.minLength(minLength), Validators.maxLength(maxLength)],
    errorConfigs: {
      minLength: minLength,
      maxLength: maxLength
    },
    errorMessages: [
      {
        errName: 'required',
        errMsg: titleRequiredErrorMessage()
      },
      {
        errName: 'minLength',
        errMsg: minLengthErrorMessage(minLength)
      }
    ]
  }
}

const errorMessages = {
  title: {
    required: 'A title is required.',
    minLength: `The title should be at least characters long.`
  }
}

export const descriptionControlConfiguration: IFormControlConfigurations = {
  name: 'description',
  usesMatFormField: false,
  label: 'Description',
  type: 'textarea',
  validators: [Validators.required, Validators.maxLength(1000)]
};

export interface IFormCategoryConfig {
  forPath: string;
  formControls: {[ctrlName: string]: IFormControlConfigurations}[]
}

export const formConfig: IFormCategoryConfig[] = [
  {
    forPath: 'buysell',
    formControls: [
      {'title': titleControlConfiguration({minLength: 5, maxLength: 20})},
      {'description': descriptionControlConfiguration}
    ]
  }
];

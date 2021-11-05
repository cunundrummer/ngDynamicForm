import { Component } from '@angular/core';
import { ValidatorFn } from '@angular/forms';

/**
 * @warning Might change the name later on.  Possibly to attributes, properties, or a combination.
 */
export interface IFormControlConstraints {
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
  formControls: { [ctrlName: string]: IFormControlConfigurations }[]
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
  constraints?: IFormControlConstraints | null;
  errorMessages?: IFormControlConfigurationsErrors[]
}

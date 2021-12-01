import { Component } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
import { IFormControlConstraintsPrice } from '../models/controlConfigurations/priceControlConfiguration';
import { IFormControlConstraintsTitle } from '../models/controlConfigurations/titleControlConfiguration';
import { IFormControlConstraintsDescription } from '../models/controlConfigurations/descriptionControlConfiguration';

/**
 * @warning Might change the name later on.  Possibly to attributes, properties, or a combination.
 */
export interface IFormControlConstraintsBase {
  required: boolean;
}

interface IFormControlConfigurationsErrors {
  errName: string;
  errMsg: string;
}

export type formControlConfigurationsType = { [ctrlName: string]: IFormControlConfigurations };
export interface IFormCategoryConfig {
  forPath: string;
  formControlsConfig: { [ctrlName: string]: IFormControlConfigurations }[]
}

type hintAlignment = 'start' | 'end';
type anyFormControlControlConstraints =
  IFormControlConstraintsBase | IFormControlConstraintsPrice |
  IFormControlConstraintsTitle | IFormControlConstraintsDescription |
  null

/**
 *  id to be used as discriminator. Since there might be custom controls too.
 *  ex. IPriceCustomFormControlConfiguration
 *  @link https://stackoverflow.com/questions/14425568/interface-type-check-with-typescript
 */

export interface IFormControlConfigurations {
  interfaceId: string;  // default = IFormControlConfigurations
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
  constraints?: IFormControlConstraintsBase | null;
  errorMessages?: IFormControlConfigurationsErrors[]
}

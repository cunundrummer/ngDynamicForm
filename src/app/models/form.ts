import { ValidatorFn, Validators } from '@angular/forms';

export interface IFormControlConfigurations {
  name: string;
  label?: string;
  type: string;
  usesMatFormField: boolean;
  validators: ValidatorFn | ValidatorFn[] | null;
}

export const titleControlConfiguration: IFormControlConfigurations = {
  name: 'title',
  usesMatFormField: true,
  label: 'Title',
  type: 'text',
  validators: [Validators.required, Validators.minLength(5), Validators.maxLength(20)]
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
      {'title': titleControlConfiguration},
      {'description': descriptionControlConfiguration}
    ]
  }
];

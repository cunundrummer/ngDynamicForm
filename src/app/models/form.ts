import { ValidatorFn, Validators } from '@angular/forms';

export interface IFormControlConfigurations {
  name: string;
  label?: string;
  usesMatFormField: boolean;
  validators: ValidatorFn | ValidatorFn[] | null;
}

export const titleControlConfiguration = {
  name: 'title',
  usesMatFormField: true,
  label: 'Title',
  validators: [Validators.required, Validators.min(5), Validators.max(20)]
}

export const descriptionControlConfiguration = {
  name: 'description',
  usesMatFormField: false,
  label: 'Description',
  validators: [Validators.required, Validators.max(1000)]
};

export const formConfig = [
  {
    forPath: 'buysell',
    formControls: [
      {title: titleControlConfiguration},
      {description: descriptionControlConfiguration}
    ]
  }
];

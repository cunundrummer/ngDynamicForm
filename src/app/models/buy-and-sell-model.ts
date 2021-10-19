import { descriptionControlConfiguration, IFormCategoryConfig, titleControlConfiguration } from './form';

export const formConfig: IFormCategoryConfig[] = [
  {
    forPath: 'buysell',
    formControls: [
      {'title': titleControlConfiguration({required: true, minLength: 5, maxLength: 20})},
      {'description': descriptionControlConfiguration}
    ]
  }
];

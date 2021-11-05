import { IFormCategoryConfig } from '../interfaces/form.interfaces';
import { titleControlConfiguration } from './controlConfigurations/titleControlConfiguration';
import { descriptionControlConfiguration } from './controlConfigurations/descriptionControlConfiguration';

const JOBS_MIN_LENGTH = 5;
const JOBS_MAX_LENGTH = 20;
const DESCRIPTION_MIN_LENGTH = 5;
const DESCRIPTION_MAX_LENGTH = 2000;


export const jobsConfig: IFormCategoryConfig[] = [
  {
    forPath: 'jobs',
    formControls: [
      {'title': titleControlConfiguration({
          required: true,
          minLength: JOBS_MIN_LENGTH,
          maxLength: JOBS_MAX_LENGTH})
      },
      {'description': descriptionControlConfiguration({
          required: true,
          minLength: DESCRIPTION_MIN_LENGTH,
          maxLength: DESCRIPTION_MAX_LENGTH})
      }
    ]
  }
];

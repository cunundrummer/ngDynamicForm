import { IFormCategoryConfig } from '../interfaces/form.interfaces';
import { jobsConfig } from './jobs.model';
import { buySellFormConfig } from './buysell.model';

export const formConfig: IFormCategoryConfig[] = [
  ...buySellFormConfig,
  ...jobsConfig
];

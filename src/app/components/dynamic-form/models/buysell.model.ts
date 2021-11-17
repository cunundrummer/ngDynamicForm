import {IFormCategoryConfig } from '../interfaces/form.interfaces';
import { titleControlConfiguration } from './controlConfigurations/titleControlConfiguration';
import { descriptionControlConfiguration } from './controlConfigurations/descriptionControlConfiguration';
import { customPriceControlConfiguration } from "./controlConfigurations/customPriceControlConfiguration";

const TITLE_MIN_LENGTH = 5;
const TITLE_MAX_LENGTH = 20;
const DESCRIPTION_MIN_LENGTH = 5;
const DESCRIPTION_MAX_LENGTH = 2000;

export const buySellFormConfig: IFormCategoryConfig[] = [
  {
    forPath: 'buysell',
    formControlsConfig: [
      {'title': titleControlConfiguration({
          required: true,
          minLength: TITLE_MIN_LENGTH,
          maxLength: TITLE_MAX_LENGTH})
      },
      {'description': descriptionControlConfiguration({
          required: true,
          minLength: DESCRIPTION_MIN_LENGTH,
          maxLength: DESCRIPTION_MAX_LENGTH})
      },
      {
        'price': customPriceControlConfiguration({
          required: true
        })
      }
    ]
  }
];

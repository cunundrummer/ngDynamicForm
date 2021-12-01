import {IFormCategoryConfig } from '../interfaces/form.interfaces';
import { titleControlConfiguration } from './controlConfigurations/titleControlConfiguration';
import { descriptionControlConfiguration } from './controlConfigurations/descriptionControlConfiguration';
import { customPriceControlConfiguration } from "./controlConfigurations/customPriceControlConfiguration";
import { PriceControlConfiguration } from './controlConfigurations/priceControlConfiguration';

const TITLE_MIN_LENGTH = 5;
const TITLE_MAX_LENGTH = 20;
const DESCRIPTION_MIN_LENGTH = 5;
const DESCRIPTION_MAX_LENGTH = 2000;
const PRICE_MIN = 0;
const PRICE_MAX = 1000000;

/**
 * !IMPORTANT!  in formControlsConfig, REMEMBER that the key is also the
 * name of the control in the FormGroup.
 */
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
      // {
      //   'customPrice': customPriceControlConfiguration({
      //     required: true
      //   })
      // }
      {
        'price': PriceControlConfiguration({
          required: true,
          min: PRICE_MIN,
          max: PRICE_MAX
        })
      }
    ]
  }
];

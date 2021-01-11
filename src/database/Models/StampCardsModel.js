import {Platform} from 'react-native';
import Queryable from 'vasern/vasern/src/core/vasern-queryable';
import {StampCards} from '..';
import {strings} from '../../i18n';

import {StampCardsSchema} from '../Schemas/StampCardsSchema';

export class StampCardsModel {
  get props() {
    var props = new StampCardsSchema().props;
    return props;
  }
  // get viewElements() {
  //     return [
  //         {title: strings('fixedCosts'), type: 'switch', optional: true},
  //         {
  //             title: strings('description'),
  //             type: 'input',
  //             returnKeyType: 'next',
  //             optional: false
  //         },
  //         {
  //             title: strings('amount'),
  //             type: 'input',
  //             optional: false,
  //             keyboardType:
  //                 Platform.OS == 'ios' ? 'decimal-pad' : 'decimal-pad',
  //             returnKeyType: 'done'
  //         },
  //         {
  //             title: strings('categorie'),
  //             optional: false,
  //             type: 'nav',
  //             nav: 'Categories'
  //         },
  //         {title: strings('interval'), type: 'actionSheet', optional: false},
  //         {title: strings('periodFrom'), type: 'datepicker', optional: false},
  //         {title: strings('periodTill'), type: 'datepicker', optional: true},
  //         {title: strings('badge'), type: 'icons', optional: true}
  //     ];
  // }

  getStampCardById = (id) => {
    let stampCardsQueryObj = new Queryable(StampCards.data());
    return stampCardsQueryObj.get({
      id: id,
    });
  };
}

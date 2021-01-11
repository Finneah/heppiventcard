import Queryable from 'vasern/vasern/src/core/vasern-queryable';
import {Stamps} from '..';
import {StampsSchema} from '../Schemas/StampsSchema';

import {StampCardsSchema} from '../Schemas/StampCardsSchema';

export class StampsModel {
  get props() {
    var props = new StampsSchema().props;
    props.StampCard = new StampCardsSchema().props;
    return props;
  }

  filterStampsBy = (filterObject) => {
    let stampsQueryObj = new Queryable(Stamps.data());
    return stampsQueryObj.filter(filterObject).data();
  };
}

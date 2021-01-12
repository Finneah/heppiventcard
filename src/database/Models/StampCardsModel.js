import Queryable from 'vasern/vasern/src/core/vasern-queryable';
import {StampCards} from '..';

import {StampCardsSchema} from '../Schemas/StampCardsSchema';

export class StampCardsModel {
  get props() {
    var props = new StampCardsSchema().props;
    return props;
  }

  getStampCardById = (id) => {
    let stampCardsQueryObj = new Queryable(StampCards.data());
    return stampCardsQueryObj.get({
      id: id,
    });
  };
}

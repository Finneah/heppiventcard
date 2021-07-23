import Queryable from 'vasern/vasern/src/core/vasern-queryable';
import {StampCards} from '..';

import {StampCardsSchema} from '../Schemas/StampCardsSchema';
/**
 * @category Database
 * @class StampCardsModel
 * @classdesc DB Model for StampCards
 */

export class StampCardsModel {
  get props() {
    var props = new StampCardsSchema().props;
    return props;
  }
  /**
   * @memberof StampCardsModel
   * @description get filtered Stamps by id
   * @param {int} id
   * @returns queryResult
   */
  getStampCardById = (id: number) => {
    let stampCardsQueryObj = new Queryable(StampCards.data());
    return stampCardsQueryObj.get({
      id: id,
    });
  };
}

import Queryable from 'vasern/vasern/src/core/vasern-queryable';
import {Stamps} from '..';
import {StampsSchema} from '../Schemas/StampsSchema';

import {StampCardsSchema} from '../Schemas/StampCardsSchema';
/**
 * @category Database
 * @class StampsModel
 * @classdesc DB Model for Stamps
 */
export class StampsModel {
  get props() {
    var props = new StampsSchema().props;
    props.StampCard = new StampCardsSchema().props;
    return props;
  }
  /**
   * @memberof StampsModel
   * @description get filtered Stamps by FilterObject
   * @param {Object} filterObject
   * @returns queryResult
   */
  filterStampsBy = (filterObject) => {
    let stampsQueryObj = new Queryable(Stamps.data());

    return stampsQueryObj.filter(filterObject).data();
  };
}

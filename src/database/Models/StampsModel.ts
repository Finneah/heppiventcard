import Queryable from 'vasern/vasern/src/core/vasern-queryable';

import {Stamps} from '..';

/**
 * @category Database
 * @class StampsModel
 * @classdesc DB Model for Stamps
 */
export class StampsModel {
  /**
   * @memberof StampsModel
   * @description get filtered Stamps by FilterObject
   * @param {Object} filterObject
   * @returns queryResult
   */
  filterStampsBy = (filterObject: object): any[] => {
    let stampsQueryObj = new Queryable(Stamps.data());

    let data = stampsQueryObj.filter(filterObject).data();

    return data;
  };

  _getStampsLength = (): number | void => {
    try {
      var stamps = this.filterStampsBy({
        done: true,
      });

      if (stamps?.length === 0) {
        stamps = this.filterStampsBy({
          done: 1,
        });
      }

      return stamps.length;
    } catch (error) {
      console.warn('Member Card _getStampsLength', error);
    }
  };
}

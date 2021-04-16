import {UserSchema} from '../Schemas/UserSchema';
import Queryable from 'vasern/vasern/src/core/vasern-queryable';
import {User} from '..';
/**
 * @category Database
 * @class UserModel
 * @classdesc DB Model for User
 */
export class UserModel {
  get props() {
    var props = new UserSchema().props;
    return props;
  }
  /**
   * @memberof UserModel
   * @description get Userobject from DB
   * there is only one User
   * @param {Object} user
   */
  getUser = (user) => {
    let userQueryObj = new Queryable(User.data());
    return userQueryObj.filter({user}).data();
  };
}

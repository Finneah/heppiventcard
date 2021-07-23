import {UserType} from '../../Helper/Types';
import Queryable from 'vasern/vasern/src/core/vasern-queryable';
import {User} from '..';
/**
 * @category Database
 * @class UserModel
 * @classdesc DB Model for User
 */
export class UserModel {
  /**
   * @memberof UserModel
   * @description get Userobject from DB
   * there is only one User
   * @param {Object} user
   */
  getUser = (user: object): any => {
    let userQueryObj = new Queryable(User.data());
    return userQueryObj.filter({user}).data();
  };

  createNewUser = (user: UserType): void => {
    User.insert(user);
  };

  updateUser = (user: UserType): void => {
    User.update(user, user, true);
  };
}

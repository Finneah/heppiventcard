import {UserType} from '../src/Helper/Types';

/**
 * @category Database
 * @class UserModel
 * @classdesc DB Model for User
 */
export default class MockUserModel {
  /**
   * @memberof UserModel
   * @description get Userobject from DB
   * there is only one User
   * @param {Object} user
   */
  getUser = (user: object): any => {
    return user;
  };

  createNewUser = (user: UserType): void => {
    console.log(user, 'User.insert(user, true)');
  };

  updateUser = (user: UserType): void => {
    console.log(user, 'User.update(user, user, true)');
  };
}

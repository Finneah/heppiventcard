import {UserSchema} from '../Schemas/UserSchema';
import Queryable from 'vasern/vasern/src/core/vasern-queryable';
import {User} from '..';

export class UserModel {
  get props() {
    var props = new UserSchema().props;
    return props;
  }
  getUser = (user) => {
    let userQueryObj = new Queryable(User.data());
    return userQueryObj.filter({user}).data();
  };
}

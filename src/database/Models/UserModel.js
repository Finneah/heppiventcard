import {UserSchema} from '../Schemas/UserSchema';

export class UserModel {
  get props() {
    var props = new UserSchema().props;
    return props;
  }
}

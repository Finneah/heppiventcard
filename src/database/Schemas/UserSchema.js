/**
 * @category Database
 * @class UserSchema
 * @classdesc DB Schema for User
 */
export class UserSchema {
  name = 'User';
  props = {
    name: '?string',
    rank: 'int',
  };
}

import Vasern from 'vasern';

import {UserSchema} from './Schemas/UserSchema';
import {StampsSchema} from './Schemas/StampsSchema';
import {StampCardsSchema} from './Schemas/StampCardsSchema';
let vasern = new Vasern({
  schemas: [StampCardsSchema, StampsSchema, UserSchema],
  version: 1,
});

export default vasern;

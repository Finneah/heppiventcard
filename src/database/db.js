import {Card} from 'native-base';
import Vasern from 'vasern';

import {CardSchema} from './Schemas/CardSchema';

const vasern = new Vasern({
  schemas: [CardSchema],
  version: 1,
});

export default vasern;

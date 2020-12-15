import Vasern from 'vasern';

import {IntervalSchema} from './Schemas/IntervalSchema';

const vasern = new Vasern({
  schemas: [IntervalSchema],
  version: 1,
});

export default vasern;

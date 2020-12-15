import Queryable from 'vasern/vasern/src/core/vasern-queryable';
import {Card} from '..';

import {CardSchema} from '../Schemas/CardSchema';

export class CardModel {
  get props() {
    var props = new CardSchema().props;
    return props;
  }

  getCategorieById = (id) => {
    let cardQueryObj = new Queryable(Card.data());
    return cardQueryObj.get({
      id: id,
    });
  };

  getCategorieByName = (name) => {
    let cardQueryObj = new Queryable(Card.data());
    return cardQueryObj.get({
      name: name,
    });
  };
  getCategorieByNameAndTyp = (name, typ) => {
    let cardQueryObj = new Queryable(Card.data());
    return cardQueryObj.get({
      name: name,
      typ: typ,
    });
  };
}

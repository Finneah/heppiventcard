/**
 * @category Database
 * @class StampCardsSchema
 * @classdesc DB Schema for StampCards
 */

export class StampCardsSchema {
  name = 'StampCards';
  props = {
    title: 'string',
    complete: 'boolean',
    date_of_creation: 'datetime',
    date_of_completed: '?datetime',
    completed_image: '?string',
  };
}

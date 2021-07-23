/**
 * @category Database
 * @class StampsSchema
 * @classdesc DB Schema for Stamps
 */
export class StampsSchema {
  name = 'Stamps';
  props = {
    number: 'int',
    name: '?string',
    image: '?string',
    done: 'boolean',
    date: '?datetime',
    description: '?string',
    stampCard: '#StampCards',
    picture: '?string',
  };
}

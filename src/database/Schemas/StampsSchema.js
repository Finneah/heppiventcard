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
  };
}

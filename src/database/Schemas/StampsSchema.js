export class StampsSchema {
  name = 'Stamps';
  props = {
    number: 'int',
    name: '?string',
    image: '?string',
    done: 'int',
    date: '?datetime',
    description: '?string',
    stampCard: '#StampCards',
  };
}

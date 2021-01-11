export class StampsSchema {
  name = 'Stamps';
  props = {
    number: 'int',
    image: '?string',
    done: 'int',
    stampCard: '#StampCards',
  };
}

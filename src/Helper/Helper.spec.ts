import 'react-native';
import {UserRank} from './Enums';
import {
  isValidUser,
  _checkDoneItems,
  _getImageNameForRank,
  _getRank,
} from './Helper';
import {StampCardType} from './Types';

describe('Helper', () => {
  test('isValidUser Function works correctly', () => {
    var isValidTest = isValidUser({name: 'XY', rank: 0});
    var isInvalidTest = isValidUser({name: '', rank: -1});
    expect(isValidTest).toBeTruthy();
    expect(isInvalidTest).toBeFalsy();
  });
  test('_getRank Function works correctly', () => {
    for (let i = 0; i <= 30; i++) {
      var user = {name: 'XY', rank: i};
      var test = _getRank(user);
      if (user?.rank) {
        if (user.rank >= UserRank.RANK_30) {
          expect(test).toMatch('RANK_30');
        } else if (user.rank >= UserRank.RANK_20) {
          expect(test).toMatch('RANK_20');
        } else if (user.rank >= UserRank.RANK_15) {
          expect(test).toMatch('RANK_15');
        } else if (user.rank >= UserRank.RANK_10) {
          expect(test).toMatch('RANK_10');
        } else if (user.rank >= UserRank.RANK_03) {
          expect(test).toMatch('RANK_03');
        } else {
          expect(test).toMatch('RANK_00');
        }
      }
    }
  });

  test('_getImageNameForRank Function works correctly', () => {
    for (let i = 0; i <= 30; i++) {
      var user = {name: 'XY', rank: i};
      var test = _getImageNameForRank(user);
      if (user?.rank >= 30) {
        expect(test).toMatch('Gold');
      } else if (user.rank >= 20) {
        expect(test).toMatch('Platin');
      } else {
        expect(test).toMatch('Standard');
      }
    }
  });
  test('_checkDoneItems Function works correctly', () => {
    for (let i = 0; i <= 30; i++) {
      let sCard: StampCardType = {
        title: 'string',
        complete: false,
        date_of_creation: new Date(),
        date_of_completed: undefined,
        completed_image: undefined,
      };

      var doneIsZero = _checkDoneItems({
        id: 'string',
        title: 'string',
        complete: false,
        date_of_creation: new Date(),
        date_of_completed: undefined,
        completed_image: 'string',
        content: [
          {
            number: 1,
            name: undefined,
            image: undefined,
            done: false,
            picture: undefined,
            date: new Date(),
            description: 'string',
            stampCard: sCard,
          },
        ],
      });

      expect(doneIsZero).toBe(0);

      var doneIsOne = _checkDoneItems({
        id: 'string',
        title: 'string',
        complete: false,
        date_of_creation: new Date(),
        date_of_completed: undefined,
        completed_image: 'string',
        content: [
          {
            number: 1,
            name: undefined,
            image: undefined,
            done: true,
            picture: undefined,
            date: new Date(),
            description: 'string',
            stampCard: sCard,
          },
        ],
      });

      expect(doneIsOne).toBe(1);

      var doneIsError = _checkDoneItems({
        id: 'string',
        title: 'string',
        complete: false,
        date_of_creation: new Date(),
        date_of_completed: undefined,
        completed_image: 'string',
        content: undefined,
      });

      expect(doneIsError).toMatch('Error on _checkDoneItems');
    }
  });
});

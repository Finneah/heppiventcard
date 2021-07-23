import 'react-native';
import {UserRank} from './Enums';
import {isValidUser, _getRank} from './Helper';

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
});

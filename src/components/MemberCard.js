import {Accordion, Body, Card, CardItem, Input, Item, Label} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import GlobalColors from '../styles/GlobalColors';
import {strings} from '../i18n';

import {Stamps, User} from '../database';
import {StampsModel} from '../database/Models/StampsModel';

let stampsModel = new StampsModel();
/**
 * @category Component
 * @namespace MemberCard
 * @description MemberCard Element
 */
const MemberCard = ({}) => {
  const defaultMemberName = strings('NAME_PLACEHOLDER');
  const [user, setUser] = useState({name: '', rank: 0});
  React.useLayoutEffect(() => {
    // User.perform(function (db) {
    //   User.data().forEach(function (item) {
    //     db.remove(item);
    //   });
    // });
    /**
     * @memberof MemberCard
     */
    User.onLoaded(async () => {
      try {
        if (User.data().length === 0) {
          var newUser = {name: '', rank: 0};
          User.insert(newUser);
          setUser(newUser);
        } else {
          console.log('onLoaded _setUser', User.data()[0]);
          _setUser(User.data()[0]);
        }
      } catch (error) {
        console.info(error);
      }
    });
    /**
     * @memberof MemberCard
     */
    User.onChange(() => {
      try {
        console.log('onChange _setUser', User.data()[0]);
        _setUser(User.data()[0]);
      } catch (error) {
        console.info(error);
      }
    });
    /**
     * @memberof MemberCard
     */
    Stamps.onChange(() => {
      try {
        console.log('Stamps onChange');
        _checkStampCount();
      } catch (error) {
        console.info(error);
      }
    });
  }, []);

  /**
   * @memberof MemberCard
   */
  function _checkStampCount() {
    try {
      var stamps = stampsModel.filterStampsBy({
        done: 1,
      });

      if (stamps.length === 0) {
        stamps = stampsModel.filterStampsBy({
          done: true,
        });
      }

      var user = User.data()[0];
      console.log(user);
      if (user) {
        console.log(
          User.data(),
          User.data()[0],
          user.rank,
          stamps.length,
          'test',
        );
        // user.rank = stamps.length;
        // User.update(user.id, user, true);
      }
    } catch (error) {
      console.info(error);
    }
  }
  /**
   * @memberof MemberCard
   */
  function _setUser(this_user) {
    try {
      setUser({
        name: this_user.name ? this_user.name : '',
        rank: this_user.rank,
      });
    } catch (error) {
      console.info(error);
    }
  }
  /**
   * @memberof MemberCard
   */
  function _getRank() {
    /**
     * "RANK_0": "Gast",
     * "RANK_3": "Stammgast",
     * "RANK_10": "Mitglied",
     * "RANK_15": "Stammmitglied",
     * "RANK_20": "Familienmitglied",
     */
    var rank = user.rank;
    console.log('rank', rank);
    if (rank) {
      if (rank >= 20) {
        return strings('RANK_20');
      } else if (rank >= 15) {
        return strings('RANK_15');
      } else if (rank >= 10) {
        return strings('RANK_10');
      } else if (rank >= 3) {
        return strings('RANK_03');
      } else {
        return strings('RANK_00');
      }
    }
  }
  /**
   * @memberof MemberCard
   */
  function _renderContent() {
    return (
      <CardItem>
        <Body>
          <Item
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              borderColor:
                user && user.name === ''
                  ? GlobalColors.brandPrimary
                  : 'transparent',
            }}
            inlineLabel>
            <Label style={{color: GlobalColors.brandPrimary}}>
              {strings('NAME')}
            </Label>
            <Input
              style={styles.nameInput}
              placeholder={defaultMemberName}
              placeholderTextColor={GlobalColors.brown}
              value={user ? user.name : ''}
              onChangeText={(text) => {
                /**
                 * @todo update User
                 *
                 */

                User.update(user.id, {...user, name: text}, true);
                setUser({...user, name: text});
              }}
            />
          </Item>
          <Item style={[styles.transparentBorder]} inlineLabel>
            <Label style={{color: GlobalColors.brandPrimary}}>
              {strings('RANK')}
            </Label>
            <Input
              disabled
              style={styles.rankInput}
              placeholder={strings('RANK_00')}
              value={_getRank()}
            />
          </Item>
        </Body>
      </CardItem>
    );
  }

  return (
    <Card>
      <CardItem first last>
        <Accordion
          style={styles.transparentBorder}
          dataArray={[{title: strings('MEMBERCARD')}]}
          animation={true}
          expanded={0}
          headerStyle={[styles.transparentBG]}
          icon="chevron-forward"
          expandedIcon="chevron-down"
          iconStyle={{color: GlobalColors.brandPrimary}}
          expandedIconStyle={{color: GlobalColors.brandSecondary}}
          renderContent={_renderContent}
        />
      </CardItem>
    </Card>
  );
};
const styles = StyleSheet.create({
  nameInput: {
    fontSize: 18,
    fontWeight: 'bold',
    color: GlobalColors.brandPrimary,
  },
  rankInput: {
    fontSize: 18,
    fontWeight: 'bold',
    color: GlobalColors.brandSecondary,
  },
  transparentBorder: {
    borderColor: 'transparent',
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    justifyContent: 'center',
    opacity: 0.5,
  },
});
export default MemberCard;

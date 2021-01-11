import {Accordion, Body, Card, CardItem, Input, Item, Label} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import GlobalColors from '../styles/GlobalColors';
import {strings} from '../i18n';
import {getData, storeData} from '../storage/AsyncStorage';
const MemberCard = ({}) => {
  const defaultMemberName = strings('NAME_PLACEHOLDER');
  const [memberName, setMemberName] = useState();
  const [memberRank, setMemberRank] = useState();

  React.useLayoutEffect(() => {
    _getName();
    _getRank();
  }, []);

  async function _getName() {
    var name = await getData('NAME');

    setMemberName(name);
  }

  async function _getRank() {
    var rank = await getData('RANK');

    if (rank == null) {
      rank = strings('RANK_0');
      storeData('RANK', strings('RANK_0'));
    }

    setMemberRank(rank);
    // var qrcode = {
    //   url:
    //     'https://previews.123rf.com/images/chrisdorney/chrisdorney1607/chrisdorney160700029/61360474-abgeschlossen-stempel-%C3%BCber-einen-wei%C3%9Fen-hintergrund-.jpg',
    //   date: '2020-12-10',
    //   description: 'Text blabla',
    // };
  }
  function _renderContent() {
    return (
      <CardItem style={styles.cardItemStyle}>
        <Body>
          <Item
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              borderColor:
                memberName === '' ? GlobalColors.brandPrimary : 'transparent',
            }}
            inlineLabel>
            <Label style={{color: GlobalColors.brandPrimary}}>
              {strings('NAME')}
            </Label>
            <Input
              style={styles.nameInput}
              placeholder={defaultMemberName}
              placeholderTextColor={GlobalColors.brown}
              value={memberName}
              onChangeText={(text) => {
                storeData('NAME', text);
                setMemberName(text);
              }}
            />
          </Item>
          <Item style={styles.transparentBorder} inlineLabel>
            <Label style={{color: GlobalColors.brandPrimary}}>
              {strings('RANK')}
            </Label>
            <Input
              disabled
              style={styles.rankInput}
              placeholder={memberRank}
              value={memberRank}
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
  cardItemStyle: {
    alignContent: 'center',
    justifyContent: 'center',
    // backgroundColor: GlobalColors.brown,
  },
  nameInput: {
    fontSize: 20,
    fontWeight: 'bold',
    color: GlobalColors.brandPrimary,
  },
  rankInput: {
    fontSize: 20,
    fontWeight: 'bold',
    color: GlobalColors.brandSecondary,
  },
  transparentBorder: {
    borderColor: 'transparent',
  },
});
export default MemberCard;

import {Accordion, Body, Card, CardItem, Input, Item, Label} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import GlobalColors from '../styles/GlobalColors';
import {strings} from '../i18n';
import {getData, storeData} from '../storage/AsyncStorage';
const MemberCard = ({}) => {
  const defaultMemberName = 'Your Name goes here';
  const [memberName, setMemberName] = useState();

  // _setName();
  React.useLayoutEffect(() => {
    _setName();
  }, []);

  async function _setName() {
    var name = await getData('NAME');

    setMemberName(name);
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
              placeholder={'Gast'}
              value={'Gast'}
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

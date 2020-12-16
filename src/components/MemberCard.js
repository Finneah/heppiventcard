import {Body, Card, CardItem, Text, Title} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import GlobalColors from '../styles/GlobalColors';
import {strings} from '../i18n';
const MemberCard = ({}) => {
  return (
    <Card>
      <CardItem header first style={styles.cardItemStyle}>
        <Title style={{color: GlobalColors.dark}}>
          {strings('MEMBERCARD')}
        </Title>
      </CardItem>
      <CardItem last style={styles.cardItemStyle}>
        <Body>
          <Title style={{color: GlobalColors.dark}}>{'Jennifer'}</Title>
          <Text style={{color: GlobalColors.dark}}>
            {strings('RANK') + ' Gast'}
          </Text>
        </Body>
      </CardItem>
    </Card>
  );
};
const styles = StyleSheet.create({
  cardItemStyle: {
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: GlobalColors.brown,
  },
});
export default MemberCard;

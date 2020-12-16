import {Header, Left, Right, Title} from 'native-base';
import React from 'react';
import {Image, Pressable, StyleSheet} from 'react-native';
import {strings} from '../i18n';
import logo from '../image/logo.gif';
import GlobalColors from '../styles/GlobalColors';
const HomeScreenHeader = ({}) => {
  return (
    <Header>
      <Left>
        <Pressable>
          <Image source={logo} style={styles.logoImage} />
        </Pressable>
      </Left>
      <Right>
        <Title style={{color: GlobalColors.dark}}>{strings('APPTITLE')}</Title>
      </Right>
    </Header>
  );
};
const styles = StyleSheet.create({
  logoImage: {
    backgroundColor: GlobalColors.lightGrey,
    width: 120,
    height: 50,
    resizeMode: 'stretch',
    justifyContent: 'center',
  },
});
export default HomeScreenHeader;

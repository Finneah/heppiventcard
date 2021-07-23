import * as React from 'react';
import {Linking, StyleSheet} from 'react-native';
import {strings} from '../../locale/i18n';

import {
  HStack,
  Pressable,
  Image,
  StatusBar,
  Heading,
  Icon,
  useColorModeValue,
  useColorMode,
} from 'native-base';

import Ionicons from 'react-native-vector-icons/Ionicons';

/**
 * @category Component
 * @namespace HomeScreenHeader
 * @description Header for HomeScreen
 */
const HomeScreenHeader: React.FC = () => {
  const {colorMode} = useColorMode();
  let onPressLogo = async (link: string): Promise<void | false> => {
    try {
      if (link && Linking.canOpenURL(link)) {
        await new Promise<void>((resolve) => resolve(Linking.openURL(link)));
      } else {
        throw new Error('Cant open Link');
      }
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };
  util.onPressLogo = onPressLogo;

  return (
    <>
      <StatusBar
        backgroundColor="white"
        barStyle={colorMode === 'light' ? 'dark-content' : 'light-content'}
      />

      <HStack
        safeAreaTop
        bg={useColorModeValue('white', 'primary.800')}
        px={1}
        marginBottom={10}
        justifyContent="space-between"
        alignItems="flex-end">
        <Icon
          as={<Ionicons name="menu" />}
          color={useColorModeValue('primary.600', 'secondary.400')}
        />
        <Heading size="md">{strings('APPTITLE')}</Heading>
        <Pressable
          testID="pressableLogo"
          onPress={() => onPressLogo('http://heppivents.de/')}>
          <Image
            alt="heppiventlogo, click to open the website"
            source={require('../../image/logo.jpg')}
            style={styles.logoImage}
          />
        </Pressable>
      </HStack>
    </>
  );
};

const styles = StyleSheet.create({
  logoImage: {
    width: 120,
    height: 50,
    resizeMode: 'stretch',
    justifyContent: 'center',
  },
});
export default HomeScreenHeader;
export const util: any = {onPressLogo: null};

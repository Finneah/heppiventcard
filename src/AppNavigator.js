import 'react-native-gesture-handler';
import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import {strings} from './i18n';

const {Screen, Navigator} = createStackNavigator();

export default function Navigation() {
  const options = {};

  return (
    <Navigator>
      <Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: strings('APPTITLE'),
        }}
      />
    </Navigator>
  );
}

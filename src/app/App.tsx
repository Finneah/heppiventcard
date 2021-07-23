import {extendTheme, NativeBaseProvider} from 'native-base';
import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../components/HomeScreen/HomeScreen';

import {createStackNavigator} from '@react-navigation/stack';
import {strings} from '../locale/i18n';
import {TourGuideProvider} from 'rn-tourguide';

const Stack = createStackNavigator();

const App: React.FC = () => {
  const theme = extendTheme({
    colors: {
      // Add new color

      primary: {
        50: '#e2f7ff',
        100: '#c3e2ed',
        200: '#a1cddd',
        300: '#7eb9cd',
        400: '#5ca5be',
        500: '#438ca5',
        600: '#326d81',
        700: '#204e5d',
        800: '#0d3039',
        900: '#001217',
      },
      secondary: {
        50: '#ffeedd',
        100: '#ffd1b1',
        200: '#fbb383',
        300: '#f89554',
        400: '#f57724',
        500: '#db5e0a',
        600: '#ab4906',
        700: '#7b3303',
        800: '#4b1e00',
        900: '#1f0700',
      },
    },
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: 'light',
    },
  });
  return (
    <TourGuideProvider {...{borderRadius: 16}}>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator headerMode="none">
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                headerTitle: strings('APPTITLE'),
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </TourGuideProvider>
  );
};

export default App;

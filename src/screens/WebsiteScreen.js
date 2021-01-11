import NetInfo from '@react-native-community/netinfo';
import {
  Body,
  Card,
  CardItem,
  Container,
  Header,
  Icon,
  Left,
  Right,
  Spinner,
  Title,
} from 'native-base';
import React from 'react';
import {useState} from 'react';
import {WebView} from 'react-native-webview';
import {Text} from 'react-native';
import GlobalColors from '../styles/GlobalColors';
import {strings} from '../i18n';

let pos = 'WebsiteScreen';
const WebsiteScreen = ({navigation}) => {
  const [loadingSpinner, setLoadingSpinner] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const uri = 'http://heppivents.de/';

  React.useEffect(() => {
    console.log('useEffect');
    _setNetInfoEvent();
  }, []);

  function _setNetInfoEvent() {
    try {
      NetInfo.addEventListener((state) => {
        setIsConnected(state.isConnected);
        setLoadingSpinner(state.isConnected);
      });
      NetInfo.fetch().then((state) => {
        setIsConnected(state.isConnected);
        setLoadingSpinner(state.isConnected);
      });
    } catch (error) {
      console.info(pos + ' _setNetInfoEvent', error);
    }
  }

  return (
    <Container>
      <Header>
        <Left>
          <Icon
            onPress={() => {
              navigation.goBack();
            }}
            name="arrow-back"
          />
        </Left>

        <Right>
          <Title style={{color: GlobalColors.dark}}>
            {strings('WEBSITENAME')}
          </Title>
        </Right>
      </Header>

      {isConnected ? (
        <WebView source={{uri: uri}} />
      ) : (
        <>
          {loadingSpinner ? <Spinner /> : null}
          <Card>
            <CardItem>
              <Body>
                <Text>{'INTERNET_INFO_TEXT'}</Text>
              </Body>
            </CardItem>
          </Card>
        </>
      )}
    </Container>
  );
};

export default WebsiteScreen;

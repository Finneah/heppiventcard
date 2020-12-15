import React, {useState} from 'react';
import {
  Accordion,
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Header,
  Icon,
  Left,
  Right,
  Text,
  Title,
} from 'native-base';
import {
  Dimensions,
  View,
  Image,
  StyleSheet,
  Pressable,
  ImageBackground,
} from 'react-native';
import bg from '../image/Download.jpeg';
import logo from '../image/logo.gif';
import GlobalColors from '../styles/GlobalColors';
const image = bg;
const numCol = 3;
const HomeScreen = ({}) => {
  const [cards, setCards] = useState([]);

  React.useEffect(() => {
    _getStampCards();
  }, []);

  function _getStampCards() {
    /**
     * DB LOAD STAMPCARD
     */

    var stampCard1 = {
      title: 'Aktuelle Stempelkarte',
      finished: false,
      finishedIcon: undefined,
      content: [
        {
          name: '1',
          image: 'test',
          done: new Date(),
        },
        {
          name: '2',
          image: 'test',
          done: false,
        },
        {
          name: '3',
          image: 'test',
          done: false,
        },
        {
          name: '4',
          image: 'test',
          done: false,
        },
        {
          name: '5',
          image: 'test',
          done: false,
        },
        {
          name: '6',
          image: 'test',
          done: false,
        },
        {
          name: '7',
          image: 'test',
          done: false,
        },
        {
          name: '8',
          image: 'test',
          done: false,
        },
        {
          name: '9',
          image: 'test',
          done: false,
        },
        {
          name: '10',
          image: 'test',
          done: false,
        },
      ],
    };
    var stampCard2 = {
      title: 'Alte Stempelkarte',
      finished: true,
      finishedIcon: bg,
      content: [
        {
          name: '1',
          image: 'test',
          done: new Date(),
        },
        {
          name: '2',
          image: 'test',
          done: false,
        },
        {
          name: '3',
          image: 'test',
          done: false,
        },
        {
          name: '4',
          image: 'test',
          done: false,
        },
        {
          name: '5',
          image: 'test',
          done: false,
        },
        {
          name: '6',
          image: 'test',
          done: false,
        },
        {
          name: '7',
          image: 'test',
          done: false,
        },
        {
          name: '8',
          image: 'test',
          done: false,
        },
        {
          name: '9',
          image: 'test',
          done: false,
        },
        {
          name: '10',
          image: 'test',
          done: false,
        },
      ],
    };

    setCards([stampCard1, stampCard2]);
  }

  function _renderContent(item) {
    var doneItems = 0;
    item.content.forEach((content) => {
      if (content.done !== false) {
        doneItems++;
      }
    });

    return (
      <View style={styles.content}>
        {item.content.map((i, index) => (
          <View style={[styles.item]}>
            {i.done !== false ? (
              <Image source={image} style={styles.image} />
            ) : (
              <View style={[styles.image, styles.stampItem]}>
                {doneItems === index ? (
                  <Icon style={{color: GlobalColors.brandPrimary}} name="add" />
                ) : (
                  <Title style={{color: GlobalColors.brandPrimary}}>
                    {i.name}
                  </Title>
                )}
              </View>
            )}
          </View>
        ))}
        {item.finished ? (
          <View style={[styles.item, styles.lastItem]}>
            <Image source={item.finishedIcon} style={styles.image} />
          </View>
        ) : (
          <View style={[styles.item, styles.lastItem]}>
            <Text>{'Lorem Ipsum'}</Text>
          </View>
        )}
      </View>
    );
  }

  return (
    <Container style={{padding: 5}}>
      <Content>
        <Header>
          <Left>
            <Image
              source={logo}
              style={{
                backgroundColor: 'silver',
                width: 120,
                height: 50,
                resizeMode: 'stretch',
                justifyContent: 'center',
              }}
            />
          </Left>
          <Right>
            <Title style={{color: GlobalColors.dark}}>{'Heppiventcard'}</Title>
          </Right>
        </Header>
        <Card>
          <CardItem
            header
            style={{alignItems: 'center', justifyContent: 'center'}}>
            <Title style={{color: '#000'}}>{'Jennifer'}</Title>
          </CardItem>
          <CardItem>
            <Text>{'Rang: Gast'}</Text>
          </CardItem>
        </Card>
        <Card>
          <CardItem>
            <Accordion
              style={styles.transparentBorder}
              dataArray={cards}
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
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'column',
    backgroundColor: 'transparent',
    margin: 5,
    padding: 0,
    borderRadius: 20,

    width: Dimensions.get('screen').width * ((100 / numCol - 10) / 100),
    height: Dimensions.get('screen').width * ((100 / numCol - 10) / 100),
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'space-between',
    justifyContent: 'space-evenly',
  },
  lastItem: {
    backgroundColor: 'silver',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('screen').width * ((100 / numCol - 10) / 100) * 2.2,
  },
  image: {
    backgroundColor: 'silver',
    borderRadius: 20,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  stampItem: {
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transparentBorder: {borderColor: 'transparent'},
  transparentBG: {backgroundColor: 'transparent'},
});
export default HomeScreen;

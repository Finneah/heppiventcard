import React, {useState} from 'react';
import {
  Accordion,
  Card,
  CardItem,
  Container,
  Content,
  Icon,
  Text,
  Title,
} from 'native-base';
import {Dimensions, View, Image, StyleSheet} from 'react-native';
import bg from '../image/Download.jpeg';
import GlobalColors from '../styles/GlobalColors';
import HomeScreenHeader from '../components/HomeScreenHeader';
import MemberCard from '../components/MemberCard';
import StampCard from '../components/StampCard';

import RNFetchBlob from 'rn-fetch-blob';

let imgUrl =
  'https://images.template.net/wp-content/uploads/2015/09/16233908/Dark-Wallpapers.jpg';
const numCol = 3;

const HomeScreen = ({navigation}) => {
  console.log(navigation);
  const [cards, setCards] = useState([]);
  const [defaultImage, setDefaultImage] = useState(undefined);
  React.useLayoutEffect(() => {
    console.log('useLayoutEffect');
    RNFetchBlob.fetch('GET', imgUrl, {})
      .then((res) => {
        // console.log(res);
        setDefaultImage(res.data);
      })
      // Something went wrong:
      .catch((errorMessage, statusCode) => {
        // error handling
        console.log(errorMessage, statusCode);
      });
  }, []);
  React.useEffect(() => {
    console.log('useEffect');
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
          image: defaultImage,
          done: new Date(),
          stamp: 'star-outline',
        },
        {
          name: '2',
          image: defaultImage,
          done: false,
        },
        {
          name: '3',
          image: defaultImage,
          done: false,
        },
        {
          name: '4',
          image: defaultImage,
          done: false,
        },
        {
          name: '5',
          image: defaultImage,
          done: false,
        },
        {
          name: '6',
          image: defaultImage,
          done: false,
        },
        {
          name: '7',
          image: defaultImage,
          done: false,
        },
        {
          name: '8',
          image: defaultImage,
          done: false,
        },
        {
          name: '9',
          image: defaultImage,
          done: false,
        },
        {
          name: '10',
          image: defaultImage,
          done: false,
        },
      ],
    };
    var stampCard2 = {
      title: 'Stempelkarte 2',
      finished: true,
      finishedIcon: bg,
      content: [
        {
          name: '1',
          image: defaultImage,
          done: new Date(),
          stamp: 'star-outline',
        },
        {
          name: '2',
          image: defaultImage,
          done: new Date(),
          stamp: 'star-outline',
        },
        {
          name: '3',
          image: defaultImage,
          done: new Date(),
          stamp: 'star-outline',
        },
        {
          name: '4',
          image: defaultImage,
          done: new Date(),
          stamp: 'star-outline',
        },
        {
          name: '5',
          image: defaultImage,
          done: new Date(),
          stamp: 'star-outline',
        },
        {
          name: '6',
          image: defaultImage,
          done: new Date(),
          stamp: 'star-outline',
        },
        {
          name: '7',
          image: defaultImage,
          done: new Date(),
          stamp: 'star-outline',
        },
        {
          name: '8',
          image: defaultImage,
          done: new Date(),
          stamp: 'star-outline',
        },
        {
          name: '9',
          image: defaultImage,
          done: new Date(),
          stamp: 'star-outline',
        },
        {
          name: '10',
          image: defaultImage,
          done: new Date(),
          stamp: 'star-outline',
        },
      ],
    };

    setCards([stampCard1, stampCard2]);
  }

  function _renderContent(item) {
    return <StampCard item={item} />;
  }

  return (
    <Container style={{padding: 5}}>
      <HomeScreenHeader
        onPress={() => {
          navigation.navigate('Website');
        }}
      />
      <Content>
        <MemberCard />
        <Card>
          <CardItem first last>
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
    backgroundColor: GlobalColors.lightGrey,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('screen').width * ((100 / numCol - 10) / 100) * 2.2,
  },
  image: {
    backgroundColor: GlobalColors.lightGrey,
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

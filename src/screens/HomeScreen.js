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
import {getData, storeData, removeItem} from '../storage/AsyncStorage';
import RNFetchBlob from 'rn-fetch-blob';
import {StampCards, Stamps, User} from '../database';
import {StampCardsModel} from '../database/Models/StampCardsModel';
import {StampsModel} from '../database/Models/StampsModel';
import {UserModel} from '../database/Models/UserModel';
import {strings} from '../i18n';
let stampCardsModel = new StampCardsModel();
let stampsModel = new StampsModel();
let userModel = new UserModel();
const numCol = 3;

const HomeScreen = ({navigation}) => {
  const [cards, setCards] = useState([]);

  React.useLayoutEffect(() => {
    console.log('useLayoutEffect');
  }, []);
  React.useEffect(() => {
    // Stamps.perform(function (db) {
    //   Stamps.data().forEach(function (item) {
    //     db.remove(item);
    //   });
    // });

    // StampCards.perform(function (db) {
    //   StampCards.data().forEach(function (item) {
    //     db.remove(item);
    //   });
    // });
    User.onLoaded(async () => {
      console.info('User loaded');
      if (User.data().length === 0) {
        User.insert({name: '', rank: strings('RANK_0')});
      }
    });
    console.log('useEffect');
    StampCards.onLoaded(() => {
      console.info('StampCards loaded');
    });
    Stamps.onLoaded(async () => {
      console.info('Stamps loaded');
      if (StampCards.data().length === 0) {
        await createFirstStampCard();
      }

      _getStampCards();
    });
  }, []);

  React.useEffect(() => {
    Stamps.onChange(() => {
      console.info('Stamps changed');
      _getStampCards();
    });
  }, [cards]);

  async function _getStampCards() {
    var sections = [];

    StampCards.data().forEach(async (stampCard) => {
      var sectionPart = stampCard;
      var stamps = stampsModel.filterStampsBy({
        stampCard_id: stampCard.id,
      });

      sectionPart.content = stamps;

      sections.push(sectionPart);
    });

    setCards(sections);
    _checkStampCount();
  }

  function _checkStampCount() {
    var stamps = stampsModel.filterStampsBy({
      done: 1,
    });
    console.log('count = ' + stamps.length);
    var user = User.data()[0];
    switch (stamps.length) {
      case 0:
        user.rank = 'RANK_0';
        User.update(user, true);
        break;
      case 2:
        user.rank = 'RANK_2';
        User.update(user, true);
        break;
      case 5:
        user.rank = 'RANK_5';
        User.update(user, true);
        break;
      case 10:
        user.rank = 'RANK_10';
        User.update(user, true);
        break;
      case 15:
        user.rank = 'RANK_15';
        User.update(user, true);
        break;

      case 20:
        user.rank = 'RANK_20';
        User.update(user, true);
        break;

      default:
        break;
    }
  }

  function createFirstStampCard(params) {
    var stampcard = {
      date_of_creation: new Date(),
      title: 'Aktuelle Stempelkarte',
      complete: false,
    };
    var card = StampCards.insert(stampcard, true)[0];

    var stamps = [];
    for (let i = 1; i <= 10; i++) {
      stamps.push({
        number: i,
        done: 0,
        stampCard: card,
      });
    }

    Stamps.insert(stamps, true);
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

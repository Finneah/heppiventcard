import React, {useState} from 'react';
import {
  Accordion,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Text,
} from 'native-base';
import {Dimensions, StyleSheet} from 'react-native';

import GlobalColors from '../styles/GlobalColors';
import HomeScreenHeader from '../components/HomeScreenHeader';
import MemberCard from '../components/MemberCard';
import StampCard from '../components/StampCard';

import {StampCards, Stamps} from '../database';

import {StampsModel} from '../database/Models/StampsModel';

let stampsModel = new StampsModel();

const numCol = 3;
const TEST = false;
const HomeScreen = ({navigation}) => {
  const [cards, setCards] = useState([]);

  React.useLayoutEffect(() => {
    StampCards.onLoaded(async () => {
      if (TEST) {
        console.info('StampCards loaded', StampCards.data());
      }
      if (StampCards.data().length === 0) {
        await createFirstStampCard();
      }
    });

    StampCards.onChange(async () => {
      if (TEST) {
        console.info('StampCards changed', StampCards.data());
      }
    });

    Stamps.onLoaded(async () => {
      if (TEST) {
        console.info('Stamps loaded', Stamps.data());
      }

      _getStampCards(StampCards.data());
    });

    Stamps.onChange(async () => {
      if (TEST) {
        console.info('Stamps loaded', Stamps.data());
      }

      _getStampCards(StampCards.data());
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function deleteAll() {
    await StampCards.perform(function (db) {
      StampCards.data().forEach(function (item) {
        db.remove(item);
      });
    });
    await Stamps.perform(function (db) {
      Stamps.data().forEach(function (item) {
        db.remove(item);
      });
    });

    await createFirstStampCard();
  }

  async function _getStampCards(sectionStampCards) {
    var sections = [];
    if (TEST) {
      console.info('_getStampCards', sectionStampCards, Stamps.data());
    }
    sectionStampCards.forEach(async (stampCard) => {
      var sectionPart = stampCard;
      sectionPart.title =
        stampCard.title === '' ? 'Aktuelle Stempelkarte' : stampCard.title;
      var content = stampsModel.filterStampsBy({
        stampCard_id: stampCard.id,
      });
      if (content.length === 0) {
        content = stampsModel.filterStampsBy({
          stampCard: stampCard.id,
        });
      }

      sectionPart.content = content;
      sections.push(sectionPart);
    });

    setCards(sections);
  }

  async function createFirstStampCard() {
    var newStampCard = {
      date_of_creation: new Date(),
      title: '',
      complete: false,
    };
    var card = await StampCards.insert(newStampCard, true)[0];

    var newStamps = [];
    for (let i = 1; i <= 10; i++) {
      newStamps.push({
        number: i,
        done: 0,
        stampCard: card,
      });
    }

    await Stamps.insert(newStamps, true);
  }

  return (
    <Container style={{padding: 5}}>
      <HomeScreenHeader
        onPress={() => {
          navigation.navigate('Website');
        }}
      />
      <Content>
        {/* <Button onPress={() => deleteAll()}>
          <Text>{'DELETE'}</Text>
        </Button> */}
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
              renderContent={(item) => {
                if (TEST) {
                  console.log('renderContent', item);
                }

                return <StampCard item={item} />;
              }}
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

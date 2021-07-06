import React, {useRef, useState} from 'react';
import {Accordion, Card, CardItem, Container, Content} from 'native-base';
import {Dimensions, Linking, StyleSheet} from 'react-native';
import {
  TourGuideZone, // Main wrapper of highlight component
  useTourGuideController, // hook to start, etc.
} from 'rn-tourguide';
import GlobalColors from '../styles/GlobalColors';
import HomeScreenHeader from '../components/HomeScreenHeader';
import MemberCard from '../components/MemberCard';
import StampCard from '../components/StampCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StampCards, Stamps} from '../database';

import {StampsModel} from '../database/Models/StampsModel';
import {StampCardsSchema} from '../database/Schemas/StampCardsSchema';
import {strings} from '../i18n';
let stampCardsSchema = new StampCardsSchema();
let stampsModel = new StampsModel();

const numCol = 3;
const TEST = false;

/**
 * @category View
 * @namespace HomeScreen
 * @description Startpage of the app.
 */
const HomeScreen = ({navigation}) => {
  let _accordion = useRef(null);

  const {
    canStart, // a boolean indicate if you can start tour guide
    start, // a function to start the tourguide
    stop, // a function  to stopping it
    eventEmitter, // an object for listening some events
  } = useTourGuideController();
  const [cards, setCards] = useState([]);

  const handleOnStop = () => {
    _setTutorialIsDone();
  };

  React.useLayoutEffect(() => {
    StampCards.onLoaded(async () => {
      if (TEST) {
        console.info('StampCards loaded', StampCards.data());
      }
      if (StampCards.data().length === 0) {
        await _createFirstStampCard();
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
  React.useEffect(() => {
    _startIfPossible();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canStart]); // 👈 don't miss it!

  React.useEffect(() => {
    eventEmitter.on('stop', handleOnStop);

    return () => {
      eventEmitter.off('stop', handleOnStop);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function _startIfPossible() {
    var tutorialDone = await _getTutorialIsDone();

    if (canStart && !tutorialDone) {
      // 👈 test if you can start otherwise nothing will happen
      start();
    }
  }
  async function _setTutorialIsDone() {
    try {
      await AsyncStorage.setItem('@tutorialDone', 'true');
    } catch (e) {
      console.warn(e);
    }
  }

  async function _getTutorialIsDone() {
    try {
      const value = await AsyncStorage.getItem('@tutorialDone');
      if (value !== null) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.warn(e);
    }
  }

  async function _getAccordionExpandedId() {
    try {
      const value = await AsyncStorage.getItem('@accordionExpandedId');
      if (value !== null) {
        return value;
      }
    } catch (e) {
      console.warn(e);
    }
  }
  /**
   * @memberof HomeScreen
   * @param {Object} sectionStampCards
   */
  async function _getStampCards(sectionStampCards) {
    var sections = [];
    var expandedId = await _getAccordionExpandedId();

    if (TEST) {
      console.info('_getStampCards', sectionStampCards, Stamps.data());
    }
    sectionStampCards.forEach(async (stampCard) => {
      var sectionPart = _setSectionPart(stampCard);
      sections.push(sectionPart);
    });
    sections = sections.reverse();
    setCards(sections);

    _setSelectedAccordionItem(sections, expandedId);
  }

  function _setSectionPart(stampCard) {
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
    return sectionPart;
  }

  function _setSelectedAccordionItem(sections, expandedId) {
    for (let i = 0; i < sections.length; i++) {
      const element = sections[i];
      if (expandedId === element.id) {
        _accordion.current.setSelected(i);
      }
    }
  }
  /**
   * @memberof HomeScreen
   */
  async function _createFirstStampCard() {
    var props = stampCardsSchema.props;

    var newStampCard = {};
    for (const key in props) {
      if (Object.hasOwnProperty.call(props, key)) {
        newStampCard[key] = undefined;
      }
    }

    newStampCard.date_of_creation = new Date();
    newStampCard.title = '';
    newStampCard.complete = false;

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
      <TourGuideZone
        zone={1}
        shape="circle"
        text={strings('TOURGUIDE_HEADER_TEXT')}
        borderRadius={25}>
        <HomeScreenHeader
          onPress={() => {
            Linking.openURL('http://heppivents.de/').catch((err) =>
              console.error('An error occured', err),
            );
          }}
        />
      </TourGuideZone>

      <Content>
        <TourGuideZone
          zone={2}
          shape={'circle'}
          text={strings('TOURGUIDE_MEMBERCARD_TEXT')}
          borderRadius={25}>
          <MemberCard />
        </TourGuideZone>
        <Card>
          <CardItem first last>
            <TourGuideZone
              zone={3}
              shape={'circle'}
              text={strings('TOURGUIDE_STAMPCARD_TEXT')}
              borderRadius={25}>
              <Accordion
                ref={_accordion}
                style={styles.transparentBorder}
                dataArray={cards}
                animation={true}
                expanded={0}
                onAccordionOpen={async (item, index) => {
                  var expandedId = await _getAccordionExpandedId();
                  if (item.id !== expandedId) {
                    await AsyncStorage.removeItem('@accordionExpandedId');
                  }
                }}
                headerStyle={[styles.transparentBG]}
                icon="chevron-forward"
                expandedIcon="chevron-down"
                iconStyle={{color: GlobalColors.brandPrimary}}
                expandedIconStyle={{color: GlobalColors.brandSecondary}}
                renderContent={(item) => {
                  if (TEST) {
                    console.info('renderContent', item);
                  }

                  return <StampCard item={item} />;
                }}
              />
            </TourGuideZone>
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

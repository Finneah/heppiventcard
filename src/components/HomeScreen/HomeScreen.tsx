import * as React from 'react';

import {
  TourGuideZone, // Main wrapper of highlight component
  useTourGuideController, // hook to start, etc.
} from 'rn-tourguide';

import HomeScreenHeader from '../HomeScreenHeader/HomeScreenHeader';
import MemberCard from '../MemberCard/MemberCard';

import {StampCards, Stamps} from '../../database';

import {StampsModel} from '../../database/Models/StampsModel';

import {strings} from '../../locale/i18n';
import {
  Accordion,
  ScrollView,
  Stack,
  View,
  useColorModeValue,
  Box,
} from 'native-base';
import StampCard from '../StampCard/StampCard';
import {getData, storeData} from '../../storage/AsyncStorage';
import {SectionPart, StampCardType, StampType} from '../../Helper/Types';
import {DEBUGLEVEL} from '../../Helper/Enums';

let stampsModel = new StampsModel();

// type Props = {
//   navigation: any;
// };

/**
 * @category View
 * @namespace HomeScreen
 * @description Startpage of the app.
 */
const HomeScreen: React.FC = (/**{navigation}*/) => {
  let baseCard: SectionPart[] = [];
  let debugLevel: DEBUGLEVEL = DEBUGLEVEL.OFF;

  const [cards, setCards] = React.useState(baseCard);
  const [defaultIndex, setDefaultIndex] = React.useState(0);
  // const {colorMode, toggleColorMode} = useColorMode();
  const mainBgColor = useColorModeValue('white', 'primary.800');
  const accordionTextColorMode = useColorModeValue(
    'primary.600',
    'secondary.400',
  );
  const {
    canStart, // a boolean indicate if you can start tour guide
    start, // a function to start the tourguide
    // stop, // a function  to stopping it
    eventEmitter, // an object for listening some events
  } = useTourGuideController();

  const handleOnStop = (): void => {
    storeData('@tutorialDone', 'true');
  };

  React.useLayoutEffect(() => {
    StampCards.onLoaded(async () => {
      if (debugLevel !== DEBUGLEVEL.OFF) {
        console.info('StampCards loaded', StampCards.data());
      }

      if (StampCards.data().length === 0) {
        await _createFirstStampCard();
      }
    });

    StampCards.onChange(async () => {
      if (debugLevel !== DEBUGLEVEL.OFF) {
        console.info('StampCards changed', StampCards.data());
      }
    });

    Stamps.onLoaded(async () => {
      if (debugLevel !== DEBUGLEVEL.OFF) {
        console.info('Stamps loaded', Stamps.data());
      }

      _getStampCards(StampCards.data());
    });

    Stamps.onChange(async () => {
      if (debugLevel !== DEBUGLEVEL.OFF) {
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
    eventEmitter?.on('stop', handleOnStop);

    return () => {
      eventEmitter?.off('stop', handleOnStop);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TUTORIAL
  async function _startIfPossible() {
    var tutorialDone = await getData('@tutorialDone');

    if (canStart && !tutorialDone) {
      // 👈 Test if you can start otherwise nothing will happen
      if (start) {
        start();
      }
    }
  }
  // TUTORIAL END

  /**
   * @memberof HomeScreen
   * @param {Object} sectionStampCards
   */
  async function _getStampCards(sectionStampCards: StampCardType[]) {
    var sections: SectionPart[] = [];
    var expandedId = getData('@accordionExpandedId');

    if (debugLevel === DEBUGLEVEL.DATA) {
      console.info('_getStampCards', sectionStampCards, Stamps.data());
    }
    for (const stampCard of sectionStampCards) {
      var sectionPart: SectionPart = _setSectionPart(stampCard);
      sections.push(sectionPart);
    }

    setCards(sections.reverse());

    _setSelectedAccordionItem(
      sections,
      typeof expandedId === 'string' ? expandedId : null,
    );
  }

  /**
   * @memberof HomeScreen
   * @description TDB
   * @param stampCard StampCardType
   * @returns SectionPart
   */
  function _setSectionPart(stampCard: StampCardType): SectionPart {
    var content: StampType[] = [];

    if (content.length === 0) {
      content = stampsModel.filterStampsBy({
        stampCard: stampCard.id,
      });
      if (content.length === 0) {
        content = stampsModel.filterStampsBy({
          stampCard_id: stampCard.id,
        });
      }
    }

    var sectionPart: SectionPart = {
      ...stampCard,
      title: stampCard.title,
      content: content,
    };

    return sectionPart;
  }

  /**
   * @memberof HomeScreen
   * @description TDB
   * @param sections
   * @param expandedId
   */
  function _setSelectedAccordionItem(
    sections: SectionPart[],
    expandedId: string | null,
  ) {
    for (let i = 0; i < sections.length; i++) {
      const element = sections[i];
      if (expandedId === element.id) {
        setDefaultIndex(i);
      }
    }
  }
  /**
   * @memberof HomeScreen
   * @description TDB
   */
  async function _createFirstStampCard() {
    try {
      var newStampCard: StampCardType = {
        title: '',
        complete: false,
        date_of_creation: new Date(),
      };

      var card: StampCardType = await StampCards.insert(newStampCard, true)[0];
      var newStamps: StampType[] = [];

      for (let i = 1; i <= 10; i++) {
        var stamp: StampType = {
          name: undefined,
          image: undefined,
          description: undefined,
          date: undefined,
          picture: undefined,
          number: i,
          done: false,
          stampCard: card,
        };
        newStamps.push(stamp);
      }

      await Stamps.insert(newStamps, true);
    } catch (error) {
      throw new Error('_createFirstStampCard' + ' ' + error.message);
    }
  }

  function RenderAccordionItems() {
    return (
      <Accordion
        key={Math.random()}
        bg={mainBgColor}
        safeAreaX
        index={[0]}
        defaultIndex={[defaultIndex]}
        borderColor="transparent">
        {cards.map((card) => (
          <Accordion.Item key={card.id}>
            <Accordion.Summary
              bg={mainBgColor}
              _text={{
                color: accordionTextColorMode,
              }}
              _expanded={{
                backgroundColor: mainBgColor,
                _text: {
                  color: accordionTextColorMode,
                },
              }}>
              {card.title !== '' ? card.title : 'Aktuelle Stempelkarte'}
              <Accordion.Icon color={accordionTextColorMode} />
            </Accordion.Summary>
            <Accordion.Details>
              <StampCard item={card} />
            </Accordion.Details>
          </Accordion.Item>
        ))}
      </Accordion>
    );
  }

  return (
    <View bg={mainBgColor} justifyContent="center" alignContent="center">
      <TourGuideZone
        zone={1}
        shape="circle"
        text={strings('TOURGUIDE_HEADER_TEXT')}
        borderRadius={25}>
        <HomeScreenHeader />
      </TourGuideZone>

      {/* <Button
        alignSelf="flex-start"
        size="md"
        variant="ghost"
        onPress={() => {
          toggleColorMode();
        }}>
        Change mode
      </Button> */}
      <ScrollView
        // eslint-disable-next-line react-native/no-inline-styles
        _contentContainerStyle={{
          justifyContent: 'center',
          bg: mainBgColor,
        }} // style={{ backgroundColor: 'blue' }}
      >
        <Stack direction={'column'} space={5}>
          <TourGuideZone
            zone={2}
            shape={'circle'}
            text={strings('TOURGUIDE_MEMBERCARD_TEXT')}
            borderRadius={25}>
            <MemberCard />
          </TourGuideZone>

          <TourGuideZone
            zone={3}
            shape={'circle'}
            text={strings('TOURGUIDE_STAMPCARD_TEXT')}
            borderRadius={25}>
            <RenderAccordionItems />
          </TourGuideZone>
        </Stack>
        <Box safeArea h={10} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

import * as React from 'react';
import {Dimensions, View, StyleSheet} from 'react-native';
import {Box, Image, Text} from 'native-base';

import {strings} from '../../locale/i18n';

import {SectionPart, StampType} from '../../Helper/Types';

import GlobalColors from '../../styles/GlobalColors';

import {StampItem} from '../StampItem/StampItem';

import SpinnerOverlay from '../Spinner/SpinnerOverlay';
import {_getStampCardTitle} from '../../Helper/Helper';

const numCol = 3;

type Props = {
  item: SectionPart;
};
/**
 * @category Component
 * @namespace StampCard
 * @description StampCard Element
 */
const StampCard: React.FC<Props> = ({item}) => {
  let stampCard = item;
  let stampCardImage = require('../../image/Standard.png');
  const [showLoadingSpinner, setShowLoadingSpinner] = React.useState(false);
  if (stampCard.completed_image) {
    switch (stampCard.completed_image) {
      case 'Standard':
        stampCardImage = require('../../image/Standard.png');
        break;
      case 'Platin':
        stampCardImage = require('../../image/Platin.png');
        break;
      case 'Gold':
        stampCardImage = require('../../image/Gold.png');
        break;

      default:
        break;
    }
  }

  // React.useEffect(() => {
  //   stampCard.title = _getStampCardTitle(stampCard);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [stampCard]);

  /**
   * @memberof StampCard
   */
  function StampCardItems(params: any) {
    let {sCard} = params;
    var stampCardItems = null;

    if (sCard?.content) {
      stampCardItems = sCard.content.map((stamp: StampType, index: number) => (
        <StampItem stamp={stamp} index={index} stampCard={stampCard} />
      ));
    }

    return stampCardItems;
  }

  return (
    <>
      <View style={styles.content}>
        <StampCardItems sCard={stampCard} />
        {stampCard.complete && stampCardImage ? (
          <Box style={[styles.item, styles.lastItem]}>
            <Image
              alt="test"
              resizeMode="stretch"
              style={[
                styles.image,
                {
                  width:
                    Dimensions.get('screen').width *
                    ((100 / numCol - 10) / 100) *
                    2.2,
                  height:
                    Dimensions.get('screen').width *
                    ((100 / numCol - 10) / 100),
                },
              ]}
              source={stampCardImage}
            />
          </Box>
        ) : (
          <Box p={5} style={[styles.item, styles.lastItem]}>
            <Text italic color="secondary.400" textAlign="center">
              {strings('FINISH_CARD_TEXT')}
            </Text>
          </Box>
        )}
      </View>
      <SpinnerOverlay
        spinnerOverlayIsOpen={showLoadingSpinner}
        setSpinnerOverlayIsOpen={setShowLoadingSpinner}
      />
    </>
  );
};
const styles = StyleSheet.create({
  item: {
    zIndex: 0,
    flexDirection: 'column',
    backgroundColor: GlobalColors.lightGrey,
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
  },
  stampItem: {
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transparentBorder: {borderColor: 'transparent'},
  transparentBG: {backgroundColor: 'transparent'},
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 22,
    backgroundColor: GlobalColors.dark_opacity,
  },
  modalView: {
    minHeight: Dimensions.get('screen').height * 0.4,
    width: Dimensions.get('screen').width,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
export default StampCard;

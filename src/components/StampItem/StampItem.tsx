/* eslint-disable no-shadow */
import {View} from 'native-base';
import * as React from 'react';
import {QRCodeReturnData, SectionPart, StampType} from '../../Helper/Types';

import StampDetailModal from '../StampDetailModal/StampDetailModal';

import QRCodeModal from '../QRCodeModal/QRCodeModal';
import {StampCards, Stamps, User} from '../../database';
import {
  _checkDoneItems,
  _createNewStampCard,
  _getImageNameForRank,
  _getStampCardTitle,
} from '../../Helper/Helper';
import {storeData} from '../../storage/AsyncStorage';
type Props = {
  stamp: StampType;
  index: number;
  stampCard: SectionPart;
};

export const StampItem: React.FC<Props> = ({stamp, index, stampCard}) => {
  async function doOnSuccessReadQRCodeCallback(
    stamp: StampType,
    qrCodeData: QRCodeReturnData,
  ) {
    await Stamps.update(stamp.id, qrCodeData, true);
    console.log('doOnSuccessReadQRCodeCallback', stamp, index);
    if (stamp.number % 10 === 0) {
      _finishCardAndCreateNewCard();
    }
  }
  async function _finishCardAndCreateNewCard() {
    try {
      if (
        _checkDoneItems(stampCard) !== 0 &&
        _checkDoneItems(stampCard) === stampCard?.content?.length &&
        stampCard?.complete === false
      ) {
        stampCard.completed_image = _getImageNameForRank(User.data()[0]);
        stampCard.date_of_completed = new Date();
        stampCard.complete = true;
        stampCard.title = _getStampCardTitle(stampCard);

        if (stampCard.id) {
          await storeData('@accordionExpandedId', stampCard.id);
          console.log('_finishCardAndCreateNewCard', stampCard);
          let updatedItem = await StampCards.update(stampCard, stampCard, true);
          console.log('_finishCardAndCreateNewCard', updatedItem);
          if (updatedItem) {
            await _createNewStampCard();
          }
        }
      } else {
        console.log(
          'DONT DO IT',
          _checkDoneItems(stampCard),
          stampCard?.content?.length,
          _checkDoneItems(stampCard) === stampCard?.content?.length,
        );
      }
    } catch (error) {
      console.info(error);
    }
  }

  return (
    <View key={(stamp.number + index).toString()}>
      {stamp.done ? (
        <StampDetailModal stamp={stamp} index={index} />
      ) : (
        <QRCodeModal
          stampCard={stampCard}
          stamp={stamp}
          index={index}
          _onSuccessReadQRCodeCallback={doOnSuccessReadQRCodeCallback}
        />
      )}
    </View>
  );
};
